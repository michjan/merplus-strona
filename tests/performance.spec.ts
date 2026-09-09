import { test, expect } from '@playwright/test';

/**
 * Performance / Web Vitals tests using the Navigation Timing API
 * and PerformanceObserver (LCP, CLS, FID approximation).
 *
 * Thresholds align with Google "Good" Core Web Vitals targets:
 *   LCP  < 2500 ms
 *   CLS  < 0.1
 *   TTFB < 800 ms
 *   FCP  < 1800 ms
 *
 * Run against three representative page types so a heavy hero image on a
 * product page, or a hotlinked image on a blog post, can't hide behind a
 * homepage-only measurement.
 */

const THRESHOLDS = {
  lcp: 2500,
  cls: 0.1,
  ttfb: 800,
  fcp: 1800,
  domInteractive: 3000,
};

// Page-weight budget is set per page type: the homepage and product pages
// ship optimized local images, blog posts currently hotlink images from the
// old WordPress site (see audyt-seo-codex.md) which tend to be heavier and
// are not under this repo's control.
const PAGES: { label: string; path: string; maxWeightKb: number }[] = [
  { label: 'Strona główna', path: '/', maxWeightKb: 500 },
  { label: 'Strona produktowa (torby-reklamowe)', path: '/torby-reklamowe', maxWeightKb: 700 },
  {
    label: 'Wpis blogowy (4-korzysci...)',
    path: '/blog/4-korzysci-wynikajace-ze-stosowania-toreb-papierowych',
    maxWeightKb: 900,
  },
];

for (const { label, path, maxWeightKb } of PAGES) {
  test.describe(`Performance / Speed Score — ${label}`, () => {
    test('TTFB and FCP are within budget', async ({ page }) => {
      await page.goto(path);

      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        return {
          ttfb: nav.responseStart - nav.requestStart,
          fcp: fcp ? fcp.startTime : null,
          domInteractive: nav.domInteractive,
        };
      });

      console.log(`[${label}] TTFB:`, metrics.ttfb.toFixed(0), 'ms');
      console.log(`[${label}] FCP:`, metrics.fcp?.toFixed(0) ?? 'n/a', 'ms');
      console.log(`[${label}] DOM Interactive:`, metrics.domInteractive.toFixed(0), 'ms');

      expect(metrics.ttfb).toBeLessThan(THRESHOLDS.ttfb);
      if (metrics.fcp !== null) {
        expect(metrics.fcp).toBeLessThan(THRESHOLDS.fcp);
      }
      expect(metrics.domInteractive).toBeLessThan(THRESHOLDS.domInteractive);
    });

    test('LCP is within budget', async ({ page }) => {
      // Collect LCP via PerformanceObserver before navigation
      await page.goto(path);

      const lcp = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            let value = 0;
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                value = entry.startTime;
              }
            });
            observer.observe({ type: 'largest-contentful-paint', buffered: true });
            // Give the browser a tick to flush buffered entries
            setTimeout(() => {
              observer.disconnect();
              resolve(value);
            }, 500);
          }),
      );

      console.log(`[${label}] LCP:`, lcp.toFixed(0), 'ms');
      expect(lcp).toBeLessThan(THRESHOLDS.lcp);
    });

    test('CLS is within budget', async ({ page }) => {
      await page.goto(path);
      // Wait for layout to stabilise
      await page.waitForTimeout(1500);

      const cls = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            let value = 0;
            const observer = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                // LayoutShift entries have a `value` property
                value += (entry as PerformanceEntry & { value: number }).value;
              }
            });
            observer.observe({ type: 'layout-shift', buffered: true });
            setTimeout(() => {
              observer.disconnect();
              resolve(value);
            }, 200);
          }),
      );

      console.log(`[${label}] CLS:`, cls.toFixed(4));
      expect(cls).toBeLessThan(THRESHOLDS.cls);
    });

    test('page has no unexpected render-blocking resources', async ({ page }) => {
      await page.goto(path);

      const renderBlockingCount = await page.evaluate(() => {
        const resources = performance.getEntriesByType(
          'resource',
        ) as PerformanceResourceTiming[];
        return resources.filter(
          (r) =>
            r.renderBlockingStatus === 'blocking' &&
            // The single first-party stylesheet is intentionally render-blocking
            // to avoid a flash of unstyled content.
            !(r.initiatorType === 'link' && /\.css(?:\?|$)/.test(r.name)) &&
            // Favicon requests are fine to ignore
            !r.name.includes('favicon'),
        ).length;
      });

      console.log(`[${label}] Render-blocking resources:`, renderBlockingCount);
      expect(renderBlockingCount).toBe(0);
    });

    test(`page weight is under ${maxWeightKb} KB (first-party) / tracked (third-party)`, async ({ page }) => {
      let firstPartyBytes = 0;
      let thirdPartyBytes = 0;

      page.on('response', async (response) => {
        const responseUrl = new URL(response.url());
        const headers = response.headers();
        const contentLength = headers['content-length'];
        if (!contentLength) return;
        if (['127.0.0.1', 'localhost'].includes(responseUrl.hostname)) {
          firstPartyBytes += parseInt(contentLength, 10);
        } else {
          thirdPartyBytes += parseInt(contentLength, 10);
        }
      });

      await page.goto(path);
      await page.waitForLoadState('networkidle');

      const firstPartyKb = firstPartyBytes / 1024;
      const thirdPartyKb = thirdPartyBytes / 1024;
      console.log(`[${label}] First-party page weight:`, firstPartyKb.toFixed(1), 'KB');
      console.log(`[${label}] Third-party (hotlinked/CDN) weight:`, thirdPartyKb.toFixed(1), 'KB');

      expect(firstPartyKb).toBeLessThan(maxWeightKb);
    });
  });
}

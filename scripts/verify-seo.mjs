import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';

const distDir = new URL('../dist/', import.meta.url);
const siteOrigin = 'https://www.merplus.pl';
const errors = [];

const read = (path) => readFileSync(new URL(path, distDir), 'utf8');
const decodeXml = (value) => value.replaceAll('&amp;', '&');
const getAttribute = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}(?:\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+)))?`, 'i'));
  return match ? (match[1] ?? match[2] ?? match[3] ?? '') : undefined;
};
const getTags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
const pageFile = (pathname) => {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  if (!cleanPath) return new URL('index.html', distDir);
  if (extname(cleanPath)) return new URL(cleanPath, distDir);
  return new URL(`${cleanPath.replace(/\/$/, '')}/index.html`, distDir);
};
const addError = (route, message) => errors.push(`${route}: ${message}`);

for (const requiredFile of ['robots.txt', 'sitemap-index.xml', 'sitemap-0.xml', 'og-image.jpg']) {
  if (!existsSync(new URL(requiredFile, distDir))) addError('dist', `brak ${requiredFile}`);
}

if (errors.length === 0) {
  const robots = read('robots.txt');
  if (!/User-agent:\s*\*/i.test(robots) || !/Allow:\s*\//i.test(robots)) {
    addError('robots.txt', 'brak globalnej reguły Allow');
  }
  if (!robots.includes(`${siteOrigin}/sitemap-index.xml`)) {
    addError('robots.txt', 'brak prawidłowego adresu indeksu sitemap');
  }

  const sitemapIndex = read('sitemap-index.xml');
  if (!sitemapIndex.includes(`${siteOrigin}/sitemap-0.xml`)) {
    addError('sitemap-index.xml', 'brak odwołania do sitemap-0.xml');
  }

  const sitemap = read('sitemap-0.xml');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeXml(match[1]));
  const titles = new Map();
  const descriptions = new Map();

  if (urls.length === 0) addError('sitemap-0.xml', 'sitemap nie zawiera adresów');
  if (urls.some((url) => new URL(url).pathname.replace(/\/$/, '') === '/contact/success')) {
    addError('sitemap-0.xml', 'zawiera stronę /contact/success/');
  }

  for (const absoluteUrl of urls) {
    const url = new URL(absoluteUrl);
    const route = url.pathname;
    const file = pageFile(route);
    if (!existsSync(file)) {
      addError(route, 'brak wygenerowanego pliku HTML');
      continue;
    }

    const html = readFileSync(file, 'utf8');
    const titleMatches = [...html.matchAll(/<title>([\s\S]*?)<\/title>/gi)];
    const descriptionTags = getTags(html, 'meta').filter((tag) => getAttribute(tag, 'name')?.toLowerCase() === 'description');
    const title = titleMatches[0]?.[1].trim() ?? '';
    const description = descriptionTags.length === 1 ? (getAttribute(descriptionTags[0], 'content') ?? '').trim() : '';

    if (titleMatches.length !== 1 || !title) addError(route, `title: znaleziono ${titleMatches.length}, wartość ${title ? 'niepusta' : 'pusta'}`);
    if (descriptionTags.length !== 1 || !description) addError(route, `description: znaleziono ${descriptionTags.length}, wartość ${description ? 'niepusta' : 'pusta'}`);
    if (title) titles.set(title, [...(titles.get(title) ?? []), route]);
    if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), route]);

    const bodyWithoutCode = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
    const headings = [...bodyWithoutCode.matchAll(/<h([1-6])\b[^>]*>/gi)].map((match) => Number(match[1]));
    const h1Count = headings.filter((level) => level === 1).length;
    if (h1Count !== 1) addError(route, `liczba h1 wynosi ${h1Count}`);
    for (let index = 1; index < headings.length; index += 1) {
      if (headings[index] > headings[index - 1] + 1) {
        addError(route, `nielogiczny skok nagłówków h${headings[index - 1]} → h${headings[index]}`);
      }
    }

    for (const imageTag of getTags(html, 'img')) {
      if (getAttribute(imageTag, 'alt') === undefined) addError(route, 'obraz bez atrybutu alt');
      const src = getAttribute(imageTag, 'src');
      if (src) verifyLocalTarget(src, route, 'src obrazu');
    }

    for (const anchorTag of getTags(html, 'a')) {
      const href = getAttribute(anchorTag, 'href');
      if (href) verifyLocalTarget(href, route, 'link');
    }

    for (const property of ['og:image', 'twitter:image']) {
      const attributeName = property.startsWith('og:') ? 'property' : 'name';
      const tag = getTags(html, 'meta').find((item) => getAttribute(item, attributeName)?.toLowerCase() === property);
      const content = tag ? getAttribute(tag, 'content') : undefined;
      if (!content || !/^https?:\/\//i.test(content)) addError(route, `${property} nie jest absolutnym URL`);
    }

    for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(match[1]);
      } catch {
        addError(route, 'niepoprawny składniowo JSON-LD');
      }
    }
  }

  for (const [title, routes] of titles) {
    if (routes.length > 1) addError(routes.join(', '), `zduplikowany title: ${title}`);
  }
  for (const [description, routes] of descriptions) {
    if (routes.length > 1) addError(routes.join(', '), `zduplikowany description: ${description}`);
  }

  const successFile = new URL('contact/success/index.html', distDir);
  if (!existsSync(successFile)) {
    addError('/contact/success/', 'brak wygenerowanej strony');
  } else {
    const successHtml = readFileSync(successFile, 'utf8');
    if (!/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(successHtml)) {
      addError('/contact/success/', 'brak meta robots noindex');
    }
  }

  console.log(`Sprawdzono ${urls.length} adresów z sitemap.`);
}

if (errors.length > 0) {
  console.error(`Audyt SEO nie przeszedł (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('Audyt SEO zakończony bez błędów.');
}

function verifyLocalTarget(rawTarget, route, label) {
  if (/^(?:#|mailto:|tel:|data:|javascript:)/i.test(rawTarget)) return;

  let target;
  try {
    target = new URL(rawTarget, new URL(route, siteOrigin));
  } catch {
    addError(route, `${label} ma niepoprawny URL: ${rawTarget}`);
    return;
  }
  if (target.origin !== siteOrigin) return;

  const pathname = target.pathname;
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, '');
  const candidates = extname(cleanPath)
    ? [new URL(cleanPath, distDir)]
    : [pageFile(pathname), new URL(cleanPath, distDir)];
  if (!candidates.some((candidate) => existsSync(candidate))) {
    addError(route, `${label} wskazuje nieistniejący cel: ${rawTarget}`);
  }
}

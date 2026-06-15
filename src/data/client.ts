/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CLIENT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Business-specific copy: name, phone, email, address, socials.
 * Imported by Header, Footer, Contact page, and Head/SEO components.
 *
 * No component should hardcode a business name or phone number —
 * everything comes from this file or brand.ts.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const client = {
  name: 'MER Plus',
  email: 'joanna.wojciechowska@merplus.pl',
  phoneForTel: '+48601999402',
  phoneFormatted: '+48 601 999 402',
  /** Business / contractor license number. Displayed in the header and footer
   *  as a trust signal. Set to an empty string to hide it. */
  license: 'NIP: PL1130000192',
  address: {
    lineOne: 'ul. Rataja 7B',
    lineTwo: '',
    city: 'Sulejówek',
    state: 'mazowieckie',
    zip: '05-070',
    country: 'PL',
    mapLink: 'https://share.google/ofKkWoELmOHnFypdd',
  },
  socials: {
    facebook: 'https://www.facebook.com/pracownia.merplus/',
    instagram: 'https://www.instagram.com/merplus_pl/',
    google: 'https://www.google.com/maps',
  },
  domain: 'https://www.merplus.pl',
} as const;

export type Client = typeof client;

import type { Locale } from '../i18n';

export const site = {
  name: 'Hugo Velarde',
  fullName: 'Hugo Martínez Velarde',
  url: 'https://portfolio-hugovelarde.netlify.app',
  email: 'hugovela15@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hugo-velarde-5469b6289',
  github: 'https://github.com/Velardee',
  location: { city: 'Durango', region: 'Dgo.', country: 'MX' },
  cvPath: { es: '/pdf/CV.pdf', en: '/pdf/CV.pdf' } satisfies Record<Locale, string>,
  // Set to a Calendly URL to show the "Book a call" button.
  calendly: null as string | null,
  stackShort: 'Next.js · React · TS',
};

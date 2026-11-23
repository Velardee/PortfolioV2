// Generates public/og/og-{es,en}.png (1200x630). Run: npm run og
import { mkdirSync } from 'node:fs';
import sharp from 'sharp';

const copy = {
  es: { tag: '// Ingeniero en Software · Frontend & Fullstack', l1: 'Interfaces que siguen funcionando', l2: 'cuando el usuario hace lo inesperado.' },
  en: { tag: '// Software Engineer · Frontend & Fullstack', l1: 'Web interfaces that hold up', l2: 'when users do the unexpected.' },
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

mkdirSync('public/og', { recursive: true });
for (const [locale, c] of Object.entries(copy)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#0F100D"/>
  ${Array.from({ length: 11 }, (_, i) => `<line x1="${100 + i * 100}" y1="0" x2="${100 + i * 100}" y2="630" stroke="#ECE9E1" stroke-opacity="0.05"/>`).join('')}
  <text x="80" y="110" font-family="Consolas, 'JetBrains Mono', monospace" font-size="24" fill="#8C8A82">${esc(c.tag)}</text>
  <text x="80" y="300" font-family="Georgia, 'Instrument Serif', serif" font-size="64" fill="#ECE9E1">${esc(c.l1)}</text>
  <text x="80" y="380" font-family="Georgia, 'Instrument Serif', serif" font-size="64" font-style="italic" fill="#7B8CFF">${esc(c.l2)}</text>
  <circle cx="92" cy="530" r="7" fill="#7FD18B"/>
  <text x="112" y="539" font-family="Consolas, monospace" font-size="26" fill="#ECE9E1">Hugo Velarde</text>
  <text x="1120" y="539" text-anchor="end" font-family="Consolas, monospace" font-size="22" fill="#8C8A82">Next.js · React · TS</text>
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`public/og/og-${locale}.png`);
  console.log(`public/og/og-${locale}.png`);
}

// PNG icons: WhatsApp, iMessage and Slack previews ignore SVG favicons.
for (const [file, size] of [['apple-touch-icon.png', 180], ['icon-192.png', 192]]) {
  await sharp('public/favicon.svg', { density: 300 }).resize(size, size).flatten({ background: '#0F100D' }).png().toFile(`public/${file}`);
  console.log(`public/${file}`);
}

import { preloaderDone } from './preloader-gate';

let started = false;

/** Adds `.in` once to every `.reveal` element when it enters the viewport. */
export function initReveal(): void {
  if (started) return;
  started = true;
  preloaderDone().then(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          e.target.dispatchEvent(new CustomEvent('reveal:in'));
          io.unobserve(e.target);
        }
      },
      { threshold: 0.3 },
    );
    els.forEach((el) => io.observe(el));
  });
}

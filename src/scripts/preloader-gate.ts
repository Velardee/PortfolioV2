// Shared gate so reveal animations start only after the preloader leaves.
let resolve!: () => void;
const done = new Promise<void>((r) => (resolve = r));

export function preloaderDone(): Promise<void> {
  return document.querySelector('[data-preloader]') ? done : Promise.resolve();
}

export function releasePreloader(): void {
  resolve();
}

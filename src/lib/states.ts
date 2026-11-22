export type UiState = 'idle' | 'loading' | 'error' | 'success';

export const LOADING_MS = 1800;
export const SETTLE_MS = 3200;

export function createStateMachine(onChange: (s: UiState) => void) {
  let timer: ReturnType<typeof setTimeout> | undefined;

  function set(s: UiState): void {
    clearTimeout(timer);
    onChange(s);
    if (s === 'loading') timer = setTimeout(() => set('success'), LOADING_MS);
    else if (s !== 'idle') timer = setTimeout(() => set('idle'), SETTLE_MS);
  }

  return { set, dispose: () => clearTimeout(timer) };
}

import '@testing-library/jest-dom/vitest';

// Mock de window.matchMedia para entorno jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: query.includes('dark'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock de scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: () => {},
});

// jsdom (el simulador de navegador de Vitest) no implementa matchMedia. En navegadores reales
// siempre existe, así que este sustituto solo hace falta para que los componentes que lo usan
// (p. ej. Layout, para detectar escritorio) puedan probarse sin tocar su código de producción.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string): MediaQueryList =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}

declare module 'reveal.js' {
  interface RevealOptions {
    plugins?: any[];
    hash?: boolean;
    transition?: string;
    markdown?: {
      breaks?: boolean;
    };
  }

  class Reveal {
    constructor(options?: RevealOptions);
    initialize(): void;
  }

  export default Reveal;
}

declare module 'reveal.js/plugin/markdown/markdown.esm.js' {
  const Markdown: any;
  export default Markdown;
}

// Vite raw import types
declare module '*.md?raw' {
  const content: string;
  export default content;
} 
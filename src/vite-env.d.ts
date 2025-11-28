/// <reference types="vite/client" />

declare module '*.webp' {
  const content: string;
  export default content;
}

declare module '*.pdf' {
  const content: string;
  export default content;
}

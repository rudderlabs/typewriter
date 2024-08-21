declare module 'ink-link' {
  interface LinkProps {
    url: string;
    children?: React.ReactNode;
  }
  /** https://github.com/sindresorhus/ink-link */
  const Link: React.FC<LinkProps>;

  export default Link;
}

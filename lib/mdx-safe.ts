/**
 * Sanitizes MDX prose content so that bare `<` characters outside code fences
 * and inline code don't trigger MDX's JSX parser.
 *
 * MDX v2 treats any `<` as a potential JSX tag start. Operators like `<=`, `<>`
 * in plain prose cause parse failures. This runs at build time before MDXRemote,
 * so future blog posts never need manual escaping.
 */
export function sanitizeMdxContent(content: string): string {
  const lines = content.split("\n");
  let inFence = false;

  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      // Split on backtick pairs — inside inline code, leave as-is
      const parts = line.split("`");
      const processed = parts.map((part, i) => {
        if (i % 2 === 1) return part; // inside `...`
        // Replace < that is NOT a valid HTML/JSX tag start
        // Valid starts: <Letter, </Letter, <!-- , <!DOCTYPE
        return part.replace(/<(?![a-zA-Z/!])/g, "&lt;");
      });
      return processed.join("`");
    })
    .join("\n");
}

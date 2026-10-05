import MarkdownIt = require('markdown-it');

const md = MarkdownIt({ html: false, linkify: true });

/** Overrides dgeni-packages' `renderMarkdown` so HTML in doc comments (e.g. `<nx-card>`) is shown as text. */
export function renderMarkdown() {
  return (content: string) => md.render(content);
}

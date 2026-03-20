const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../projects/ng-aquila/src');
const OUTPUT = path.resolve(__dirname, '../projects/opensource-documentation/src/llms.txt');
const DOCS_BASE = 'https://allianz.github.io/ng-aquila';

const FRONTMATTER_RE = /^---([\s\S]*?)---/;
const PROP_RE = /^([\w-]+):\s(.*)$/;

function parseFrontmatter(content) {
  const fm = {};
  const match = content.match(FRONTMATTER_RE);
  if (!match) return fm;
  for (const line of match[1].split('\n')) {
    const prop = line.match(PROP_RE);
    if (prop) fm[prop[1].trim()] = prop[2].trim();
  }
  return fm;
}

function findMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMarkdownFiles(fullPath));
    } else if (entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }
  return results;
}

function main() {
  const components = [];
  const general = [];
  const thirdParty = [];

  for (const filePath of findMarkdownFiles(SRC_DIR)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fm = parseFrontmatter(content);
    const category = fm.category?.toLowerCase();

    const slug = path.basename(path.dirname(filePath));
    const description = fm.description ?? '';
    const entry = { slug, description };

    if (category === 'components') {
      components.push(entry);
    } else if (category === 'general') {
      general.push(entry);
    } else if (category === 'third-party') {
      thirdParty.push(entry);
    }
  }

  components.sort((a, b) => a.slug.localeCompare(b.slug));
  general.sort((a, b) => a.slug.localeCompare(b.slug));
  thirdParty.sort((a, b) => a.slug.localeCompare(b.slug));

  const formatLines = (items) =>
    items
      .map(({ slug, description }) => `- ${slug}${description ? ': ' + description : ''}`)
      .join('\n');

  const componentLines = formatLines(components);
  const generalLines = formatLines(general);
  const thirdPartyLines = formatLines(thirdParty);

  const output = [
    `# Aquila (ng-aquila) – Angular Component Library`,
    ``,
    `> Aquila is the open-source version of Angular Brand Kit (formerly Angular NDBX), the Allianz Design System component library for Angular. It provides 60+ accessible, enterprise-grade Angular components with full theming support.`,
    ``,
    `Docs: ${DOCS_BASE}`,
    `Source: https://github.com/allianz/ng-aquila`,
    `Package: \`@allianz/ng-aquila\` (npm)`,
    ``,
    `## URL Structure`,
    ``,
    `Each entry under General, Components, and Third-party sections may have up to three subpages:`,
    `- {base-url}/overview – Main documentation with usage guidance`,
    `- {base-url}/api – API reference (inputs, outputs, properties, methods)`,
    `- {base-url}/examples – Code examples`,
    ``,
    `For example: ${DOCS_BASE}/documentation/accordion/overview`,
    ``,
    `## Guides`,
    ``,
    `- [Getting Started](${DOCS_BASE}/guides/getting-started): Installation, setup, and first steps`,
    `- [Releases and Updating](${DOCS_BASE}/guides/releases): Version history and migration guides`,
    `- [MCP Integration](${DOCS_BASE}/guides/mcp): Model Context Protocol support for AI-assisted development`,
    ``,
    `## General`,
    ``,
    `Each topic's documentation is at: ${DOCS_BASE}/documentation/{topic-name}`,
    ``,
    generalLines,
    ``,
    `## Components`,
    ``,
    `Each component's documentation is at: ${DOCS_BASE}/documentation/{component-name}`,
    ``,
    componentLines,
    ``,
    `## Third-party`,
    ``,
    `Each integration's documentation is at: ${DOCS_BASE}/documentation/{integration-name}`,
    ``,
    thirdPartyLines,
    ``,
    `## Others`,
    ``,
    `- [GitHub Repository](https://github.com/allianz/ng-aquila): Source code`,
    ``,
  ].join('\n');

  fs.writeFileSync(OUTPUT, output, 'utf-8');
  console.log(
    `✅ llms.txt written (${general.length} general, ${components.length} components, ${thirdParty.length} third-party)`,
  );
}

main();

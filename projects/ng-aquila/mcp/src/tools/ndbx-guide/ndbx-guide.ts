#!/usr/bin/env node
import fs from 'fs';
import Fuse from 'fuse.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

import { SectionDoc } from '../models.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputSchema = z.object({
  query: z
    .string()
    .describe(
      `A single keyword or topic to search for in the ngx-brand-kit, NDBX and Aquila general documentation. Example: 'setup', 'version', 'best practices'.`,
    ),
});

export const ndbxGuideToolConfig = {
  name: 'ndbx-guide',
  title: 'NDBX Guide',
  description: `Search for general information about the ngx-brand-kit, NDBX and Aquila library, such as setup instructions, latest version, or best practices. Provide a single keyword or topic per query.`,
  inputSchema,
  annotations: { idempotentHint: true, readOnlyHint: true },
  cb: async (args: z.infer<typeof inputSchema>) => Promise.resolve(getNdbxGuide(args.query)) as any,
};

const sectionPath = path.resolve(__dirname, '../../../generated/sections.json');
const sections: Array<SectionDoc> = JSON.parse(fs.readFileSync(sectionPath, 'utf-8'));
const bestPractices = fs.readFileSync(
  path.resolve(__dirname, '../../../static/best-practices.md'),
  'utf-8',
);

const guides = [
  ...sections
    .filter((s) => s.category !== 'components')
    .map((d) => ({
      name: d.name.replace(/\.md$/, ''),
      // a section's content excludes its heading, and the headings name the topics
      headings: d.sections.map((s) => s.heading),
      content: d.sections.map((s) => s.content).join('\n'),
    })),
  {
    name: 'best-practices',
    headings: [...bestPractices.matchAll(/^## (.+)$/gm)].map((m) => m[1].trim().toLowerCase()),
    content: bestPractices,
  },
];

const guideSearch = new Fuse(guides, {
  includeScore: true,
  keys: [
    { name: 'name', weight: 0.4 },
    { name: 'headings', weight: 0.4 },
    { name: 'content', weight: 0.2 },
  ],
  shouldSort: true,
  // ignoreLocation: a topic can appear anywhere in a long guide, not only in its first characters
  ignoreLocation: true,
  threshold: 0.25,
});

function getNdbxGuide(query: string) {
  const result = guideSearch.search(query);
  if (!result.length) {
    const topics = guides.map((d) => d.name).join(', ');
    return {
      content: [
        {
          type: 'text',
          text: `Documentation for '${query}' not found. Available topics: ${topics}.`,
        },
      ],
    };
  }
  const { name, content } = result[0].item;
  return { content: [{ type: 'text', text: `# ${name}\n\n${content}` }] };
}

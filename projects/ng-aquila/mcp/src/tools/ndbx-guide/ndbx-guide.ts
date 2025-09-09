#!/usr/bin/env node
import fs from 'fs';
import Fuse from 'fuse.js';
import path from 'path';
import { z } from 'zod';

import { SectionDoc } from '../models';

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

function getNdbxGuide(query: string) {
  const selectedDoc = ['getting-started.md', 'releases.md', 'FAQs.md'];
  const filterDocs = sections
    .filter((s) => selectedDoc.includes(s.name))
    .map((d) => ({ name: d.name, content: d.sections.map((s) => s.content).join('\n') }));
  const result = new Fuse(filterDocs, {
    includeScore: true,
    keys: ['name', 'content'],
    shouldSort: true,
    threshold: 0.8,
  }).search(query);
  if (!result || !result.length) {
    return { content: [{ type: 'text', text: `documentation for '${query}' not found` }] };
  }
  return { content: [{ type: 'text', text: filterDocs.length + result[0].item.content }] };
}

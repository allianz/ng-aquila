import fs from 'fs';
import Fuse, { type IFuseOptions } from 'fuse.js';
import path from 'path';
import { fileURLToPath } from 'url';
import z from 'zod/v3';

import { SectionDoc } from '../models.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const inputSchema = z.object({
  componentName: z.string().describe(
    `Name of the Angular UI component from Aquila (ngx-brand-kit, NDBX, Aquila or Allianz Component Library) to search for.
                  Example: 'datefield', 'button', 'dropdown'. Only one component per query.`,
  ),
  usage: z
    .string()
    .optional()
    .describe(
      `Optional. A specific feature to search in the component documentation. Example: 'parsing', 'localization'. Only one usage per query.`,
    ),
});
export const searchNdbxComponentsToolConfig = {
  name: 'search-ndbx-components',
  title: 'Search NDBX Components',
  description: `Search usage examples in an Angular UI component from Aquila (ngx-brand-kit, NDBX, Aquila or Allianz Component Library).
                Provide the component name (e.g., 'datefield', 'button', 'dropdown') and optionally a specific usage (e.g., 'parsing', 'localization').
                In case of no usage provided, returns structured information, API, and code examples for the requested component.`,
  inputSchema,
  annotations: { idempotentHint: true, readOnlyHint: true },
  cb: async (args: z.infer<typeof inputSchema>) =>
    Promise.resolve(handleSearchNdbxComponents(args) as any),
};

const sectionPath = path.resolve(__dirname, '../../../generated/sections.json');
const sections: Array<SectionDoc> = JSON.parse(fs.readFileSync(sectionPath, 'utf-8'));
const tags: { [key: string]: string[] } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../static/tags.json'), 'utf-8'),
);

function handleSearchNdbxComponents(args: { componentName: string; usage?: string }) {
  const { componentName, usage } = args;
  const query = normalizeNxName(componentName?.trim()?.toLowerCase() || '');
  const action = usage?.trim() || '';
  if (!query) {
    return { content: [{ type: 'text', text: 'Error: No component name provided' }] };
  }

  const tagRecommendText = getTagRecommendTextForTopic(query);
  const componentList = sections.filter((item) => item.category === 'components');
  const { definitive: exactComponent, similar } = searchDocs(query, componentList);

  // If no components found, return a message with tag recommendations
  if (!exactComponent && similar.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: `Component documentation for '${query} ${action}' not found.${tagRecommendText}`,
        },
      ],
    };
  }

  // Multiple matches → ask user to clarify
  if (!exactComponent) {
    const additionComponents = getAdditionalComponent(similar);
    return {
      content: [
        {
          type: 'text',
          text: `Component documentation for '${query}' not found. \nDo you mean one of following components? \n${additionComponents}${tagRecommendText}\n`,
        },
      ],
    };
  }

  // If action is provided, check if it exists in the component's sections
  if (action) {
    const usageHeadings = exactComponent.sections.map((s) => s.heading.toLowerCase());
    // If action not found, return a message with available usages
    if (!usageHeadings.some((h) => h.includes(action.toLowerCase()))) {
      return {
        content: [
          {
            type: 'text',
            text: `Usage '${action}' not found for component '${query}'.\nAvailable usages:\n${usageHeadings.map((h) => '- ' + h).join('\n')} \n\n Note: you can leave usage blank to get basic usage.`,
          },
        ],
      };
    }
  }

  // Build response content
  let content = '';

  // For discovery calls (no specific action), include full context
  if (!action) {
    const instruct = getInstructionContext();
    const metaPath = path.resolve(__dirname, '../../../generated/components', exactComponent.name);
    const meta = fs.readFileSync(metaPath, 'utf-8');
    content = instruct + '\n' + meta + '\n\n';
  }

  // Add example
  content += '# Example';
  content += getComponentExampleSection(exactComponent, action);

  // Add usage list only for discovery calls
  if (!action) {
    content += '\n# Additional ' + query + ' usages\n' + getComponentUsageList(exactComponent);
  }

  // Append similar components if any were found in subsequent phases
  if (similar.length > 0) {
    content += '\n\n# Similar name components\n' + getAdditionalComponent(similar);
  }

  return { content: [{ type: 'text', text: content }] };
}

function getTagRecommendTextForTopic(topic: string): string {
  if (!tags || !topic) {
    return '';
  }
  const tagList = Object.keys(tags);
  const tagFuse = new Fuse(tagList, { includeScore: true, threshold: 0.3 });
  const tagResults = tagFuse.search(topic);
  if (tagResults.length) {
    const tagRecommendations = tagResults
      .slice(0, 5)
      .map((r) => ({ tag: r.item, files: tags[r.item] }));
    if (tagRecommendations.length) {
      return getTagRecommendedText(tagRecommendations);
    }
  }
  return '';
}

function getAdditionalComponent(components: SectionDoc[]): string {
  return `${components.map((c) => '- ' + c.name.replace('.md', '')).join('\n')}`;
}

function getInstructionContext(): string {
  const instructionPath = path.resolve(__dirname, '../../../static/instruction-context.md');
  return fs.readFileSync(instructionPath, 'utf-8');
}

function getComponentExampleSection(exactComponent: any, action: string): string {
  const foundSections = new Fuse(exactComponent.sections, {
    includeScore: true,
    keys: ['heading'],
    shouldSort: true,
  }).search(action);

  // If action is provided and found in sections, return the first section content of that action
  if (action && foundSections.length) {
    const first = foundSections[0];
    if (first && first.item && typeof first.item === 'object' && 'content' in first.item) {
      return '\n#' + (first.item as any).content;
    }
    return '';
  }

  // If no action is provided, find a section with 'basic', 'standard', 'example', or 'default' in the heading
  if (exactComponent.sections.length) {
    const lowerSections = exactComponent.sections.map((s: any) => s.heading.toLowerCase());
    let idx = lowerSections.findIndex(
      (h: string, i: number) =>
        h.includes('basic') && exactComponent.sections[i].content.includes('```ts'),
    );
    if (idx === -1) {
      idx = lowerSections.findIndex(
        (h: string, i: number) =>
          h.includes('standard') && exactComponent.sections[i].content.includes('```ts'),
      );
    }
    if (idx === -1) {
      idx = lowerSections.findIndex(
        (h: string, i: number) =>
          h.includes('example') && exactComponent.sections[i].content.includes('```ts'),
      );
    }
    if (idx === -1) {
      idx = lowerSections.findIndex(
        (h: string, i: number) =>
          h.includes('default') && exactComponent.sections[i].content.includes('```ts'),
      );
    }
    if (idx !== -1) {
      return '\n#' + exactComponent.sections[idx].content;
    }
    const fallbackIdx = exactComponent.sections.findIndex((s: any) => s.content.includes('```ts'));
    if (fallbackIdx !== -1) {
      return '\n#' + exactComponent.sections[fallbackIdx].content;
    }
    return '\n#' + exactComponent.sections[0].content;
  }
  return '';
}

function getComponentUsageList(exactComponent: any): string {
  return exactComponent.sections.map((r: any) => `- ${r.heading}`).join('\n');
}

function getTagRecommendedText(tagRecommendations: any): string {
  return (
    '\n\nRecommended components by tags:' +
    tagRecommendations
      .map((t: any) => {
        const files = t.files.map((f: string) => f.replace(/\.md$/, ''));
        return `\ntag: ${t.tag}\n  - ${files.join('\n  - ')}`;
      })
      .join('')
  );
}

function normalizeNxName(name: string) {
  if (!name) {
    return '';
  }

  // Normalize the name for matching:
  // 1. Trim and replace spaces with hyphens
  // 2. Remove 'nx-' prefix
  // 3. Remove 'Module' or 'Component' suffix
  let result = name.trim().replace(/\s+/g, '-');

  if (result.startsWith('nx-')) {
    result = result.slice(3);
  } else if (result.startsWith('nx')) {
    result = result.slice(2);
  }

  if (result.endsWith('Module')) {
    result = result.slice(0, -6);
  }
  if (result.endsWith('Component')) {
    result = result.slice(0, -9);
  }

  return result.toLowerCase();
}

/**
 * Utils functions
 */

export { normalizeNxName, searchDocs };

/**
 * search using Fuse.js search:
 * Run phases in order (strictest → broadest).
 * Stop when 1+ results found in a phase.
 *
 * - Phase 1: exact name or alias match
 * - Phase 2: fuzzy match for typos and wrong-order queries
 */
type DocWithAlias = { name: string; alias?: string[] };
type SearchResult<T> = { definitive: T | null; similar: T[] };

/** Normalize separators to single spaces: 'aa-bb' → 'aa bb', 'aa bb' → 'aa bb' */
function toSpaceCase(s: string): string {
  return s.replace(/-+/g, ' ').replace(/\s+/g, ' ').trim();
}

type DocFlat<T extends DocWithAlias> = Omit<T, 'alias'> & { alias: string };

/** Returns the single definitive match from search result candidates, or null if ambiguous. */
function findDefinitive<T extends DocWithAlias>(results: T[], q: string): T | null {
  const nameMatches = results.filter(
    (doc) => toSpaceCase(doc.name.replace(/\.md$/i, '').toLowerCase()) === q,
  );
  if (nameMatches.length === 1) {
    return nameMatches[0];
  }

  const aliasMatch = results.find((doc) =>
    (doc.alias ?? []).some((a) => toSpaceCase(a.trim().toLowerCase()) === q),
  );
  return aliasMatch ?? null;
}

function fusePhaseSearch<T extends DocWithAlias>(
  pattern: string,
  docs: T[],
  options: IFuseOptions<DocFlat<T>>,
): T[] {
  const flat: DocFlat<T>[] = docs.map((doc) => ({
    ...doc,
    name: doc.name.replace(/\.md$/i, ''),
    alias: (doc.alias ?? []).map((a) => a.trim()).join(', '),
  }));
  const fuse = new Fuse(flat, {
    keys: [
      { name: 'name', weight: 0.5 },
      { name: 'alias', weight: 0.5 },
    ],
    ...options,
  });
  const results = fuse.search(pattern);
  return results.map((r) => docs[flat.indexOf(r.item)]);
}

function searchDocs<T extends DocWithAlias>(query: string, docs: Array<T>): SearchResult<T> {
  // Normalize separators: 'time-picker' → 'time picker'
  const q = toSpaceCase(query);

  const phases = [
    () =>
      // Stricter search for exact matches on name or alias with no typos allowed (threshold: 0)
      fusePhaseSearch(q, docs, {
        useExtendedSearch: true,
        threshold: 0,
        includeScore: true,

        ignoreLocation: true,
        isCaseSensitive: false,
      }),
    () =>
      // Broader search allowing for typos and wrong-order queries
      fusePhaseSearch(q, docs, {
        threshold: 0.6,
        includeScore: true,
        shouldSort: true,
      }),
  ];

  // Check result of phases in order (strictest → broadest).
  // Stop as soon as a phase produces results:
  //   0 results → continue to next phase
  //   1 result  → definitive match
  //   2+ results → try to resolve by exact name/alias; otherwise treat as ambiguous return as suggestions list
  for (const phase of phases) {
    const result = phase();
    if (result.length === 0) continue;
    if (result.length === 1) return { definitive: result[0], similar: [] };

    // Multiple results → check if any has exact name/alias match to resolve to single definitive result
    const definitive = findDefinitive(result, q);
    if (definitive) {
      return { definitive, similar: result.filter((item) => item !== definitive) };
    }

    // No single definitive match, return all as similar results for user to clarify
    return { definitive: null, similar: result };
  }

  // not found in any phase
  return { definitive: null, similar: [] };
}

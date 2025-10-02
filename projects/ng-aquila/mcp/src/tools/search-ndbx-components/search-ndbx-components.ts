import fs from 'fs';
import Fuse from 'fuse.js';
import path from 'path';
import { z } from 'zod';

import { SectionDoc } from '../models';

const inputSchema = z.object({
  componentName: z.string().describe(
    `The name of the Angular UI component from ngx-brand-kit, NDBX, Aquila, or an Allianz Component Library to search for.
                  Example: 'datefield', 'button', 'dropdown'. Only one component per query.`,
  ),
  usage: z
    .string()
    .optional()
    .describe(
      `Optional. A specific usage or feature to search for within the component documentation. Example: 'parsing', 'localization'. Only one usage per query.`,
    ),
});

export const searchNdbxComponentsToolConfig = {
  name: 'search-ndbx-components',
  title: 'Search NDBX Components',
  description: `Search for documentation and usage examples for a single Angular UI component from ngx-brand-kit, NDBX, Aquila, or an Allianz Component Library.
                Provide the component name (e.g., 'datefield', 'button', 'dropdown') and optionally a specific usage (e.g., 'parsing', 'localization').
                Returns structured information, API, and code examples for the requested component.`,
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
  const topic = normalizeNxName(componentName?.trim()?.toLowerCase() || '');
  const action = usage?.trim() || '';
  if (!topic) {
    return { content: [{ type: 'text', text: 'Error: No component name provided' }] };
  }

  const tagRecommendText = getTagRecommendTextForTopic(topic);
  const instruct = getInstructionContext();
  const componentList = sections.filter((item) => item.category === 'components');
  const componentFound = searchDocs(topic, componentList);

  // If no components found, return a message with tag recommendations
  if (!componentFound?.length) {
    return {
      content: [
        {
          type: 'text',
          text: `Component documentation for '${topic} ${action}' not found.${tagRecommendText}`,
        },
      ],
    };
  }

  // If multiple components match, suggest alternatives
  const additionComponents =
    componentFound.length >= 1 ? getAdditionalComponent(componentFound) : '';

  // Find the exact component by name
  const exactComponent = componentFound.find((d) => d.name === topic + '.md');

  // If no exact match, return a message with alternatives
  if (!exactComponent) {
    return {
      content: [
        {
          type: 'text',
          text: `NDBX Component documentation for '${topic}' not found. \nDo you mean one of following components? \n${additionComponents}${tagRecommendText}\n`,
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
            text: `Usage '${action}' not found for component '${topic}'.\nAvailable usages:\n${usageHeadings.map((h) => '- ' + h).join('\n')} \n\n Note: you can leave usage blank to get basic usage.`,
          },
        ],
      };
    }
  }

  // Get the metadata (overview, api, structure) for the exact component
  const metaPath = path.resolve(__dirname, '../../../generated/components', exactComponent.name);
  const meta = fs.readFileSync(metaPath, 'utf-8');
  let content = instruct + '\n' + meta + '\n\n# Example';
  content += getComponentExampleSection(exactComponent, action);
  content += '\n# Additional ' + topic + ' usages\n' + getComponentUsageList(exactComponent);
  if (componentFound.length > 1) {
    content += `\n\n# Other Similar name components\n${componentFound
      .filter((d) => d.name !== topic + '.md')
      .map((c) => '- ' + c.name.replace('.md', ''))
      .join('\n')}`;
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
  return `
## Instruction Context
- You are working with Angular components. You are given documentation in Markdown format with YAML frontmatter that includes API and metadata.
- Only use the information provided in the documentation to answer questions or generate code.
- Always use the components built-in API. Do not invent or guess new APIs.
- Assume you are in a code editor environment.
- Use the provided examples as guidelines. Adapt your output to match the user’s intent, but do not go beyond the documented API.
- Do not use inline CSS styles.

📂 Import Instructions:
- The user is likely editing a file like "app.component.html".
- If you need to add an import (for example, for a component like NxButtonComponent), add it to the matching TypeScript file (for example, "app.component.ts") in the same folder.
- Do not suggest imports from outside the current folder.
- If the documentation provides an "importPath", use it for the import.
- If no importPath is given, use a local relative import.
- Please work reliably with the ng aquila component library, the Allianz library with the latin name for eagle. To generate the import paths, you must follow these steps precisely:
    1. Start with the literal string for the domain: '@allianz'.
    2. Append the path separator '/'.
    3. Append the literal string for the library name: 'ng-aquila'.
    4. Append the path separator '/'.
    5. Append the component name, for example, 'button'.
    6. Combine these to form the final, correct import path.
---
`;
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

/**
 * Search by name/alias with softMatchAny, then fuseMatch
 */
type DocWithAlias = { name: string; alias?: string[] };
function searchDocs<T extends DocWithAlias>(query: string, docs: Array<T>): T[] {
  let result = softMatchAny(query, docs, 'name');
  if (result.length > 0) {
    return result;
  }
  result = softMatchAny(query, docs, 'alias');
  if (result.length > 0) {
    return result;
  }
  result = fuseMatch(query, docs, 'name');
  if (result.length > 0) {
    return result;
  }
  result = fuseMatch(query, docs, 'alias');
  return result;
}

/**
 * Tokenizes a string into lowercase word tokens.
 * @param text Input text
 * @returns Array of tokens
 */
function tokenize(text: string): string[] {
  return text.toLowerCase().match(/\w+/g) || [];
}

/**
 * Performs a soft match (any query token matches) on a list of objects.
 * @param query Search query
 * @param list List of objects
 * @param field Field to match (default 'name')
 * @returns Array of matching objects
 */
export function softMatchAny<T>(query: string, list: T[], field?: keyof T): T[] {
  const key = (field ?? 'name') as keyof T;
  const queryTokens = tokenize(query);
  return list.filter((item) => {
    let value: string;
    if (item && typeof item === 'object' && key in item) {
      const v = item[key];
      value = Array.isArray(v) ? v.join(' ') : String(v);
    } else {
      value = String(item);
    }
    const nameTokens = tokenize(value);
    return queryTokens.some((qToken) => nameTokens.some((nToken) => nToken.includes(qToken)));
  });
}

/**
 * Performs fuzzy matching using Fuse.js.
 * @param query Search query
 * @param list List of objects
 * @param field Field to match (default 'name')
 * @returns Array of matching objects
 */
export function fuseMatch<T>(query: string, list: T[], field?: keyof T): T[] {
  const key = (field ?? 'name') as string;
  const fuse = new Fuse(list, {
    keys: [key],
    threshold: 0.4,
    ignoreLocation: true,
    minMatchCharLength: 3,
    getFn: (obj, keyPath) => {
      if (typeof keyPath === 'string') {
        const value = (obj as { [key: string]: any })[keyPath];
        return Array.isArray(value) ? value.join(' ') : value;
      }
      return undefined;
    },
  });
  return fuse.search(query).map((result) => result.item);
}

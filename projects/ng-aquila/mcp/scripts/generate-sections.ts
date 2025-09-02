import { readFileSync } from 'fs';
import { resolve, sep } from 'path';

import { findMarkdownFilesPaths, writeContentsToFile } from './utils';

/**
 * File's scoped variables
 */

const directoriesPath = {
  generatedExamples: '../generated/examples.json',
  generatedSections: '../generated/sections.json',
  ngAquila: '../..',
};

const excludedResources = {
  folders: ['mcp', 'static'],
  files: ['README.md', 'accessibility.md', 'config.md', 'mcp.md', 'typography.md', 'utils.md'],
};

const regexPatterns = {
  frontmatter: /^---([\s\S]*?)---/,
  frontMatterProperty: /^([\w-]+):\s?(.*)$/,
  heading: /^(#+) (.*)$/,
  examplePlaceholder: /<!--\s*example\(([^)]+)\)\s*-->/g,
};

/***
 * Typescript definitions
 */
interface MarkdownFileMetadata {
  name: string;
  frontmatter: { [key: string]: string };
  content: string;
}

/**
 * Extracts sections from markdown content by heading.
 * @param markdownContent Markdown content
 * @returns Array of section objects
 */
function extractSections(markdownContent: string) {
  // Split the content by lines
  const lines = markdownContent.split('\n');

  const sections: { heading: string; level: number; content: string }[] = [];
  let currentSection: { heading: string; level: number; content: string } | null = null;

  // Loop through the lines
  for (const line of lines) {
    const heading = line.match(regexPatterns.heading);
    // If the line is a heading
    if (heading) {
      if (currentSection) {
        // Push the previous section
        sections.push(currentSection);
      }
      // Initiate a new section
      currentSection = {
        heading: heading[2]?.toLowerCase(),
        level: heading[1].length,
        content: '',
      };
    }
    // If the current line is not a heading but it's inside of a section, concatenate it preserving the new line marker
    else if (currentSection) {
      currentSection.content += (currentSection.content ? '\n' : '') + line;
    }
  }
  // Push the last section if it exists
  if (currentSection) {
    sections.push(currentSection);
  }
  return sections;
}

/**
 * Replaces example placeholders in markdown with code blocks from examples.json.
 * @param content Markdown content
 * @param examplesContent Example data
 * @returns Markdown with injected code blocks
 */
function injectExamples(content: string, examplesContent: any): string {
  return content.replace(regexPatterns.examplePlaceholder, (match, id) => {
    const example = examplesContent.find((exampleContent: any) => exampleContent.id === id);
    if (example) {
      return (
        '\n```ts\n' + example?.content?.ts + '\n```\n```html\n' + example?.content?.html + '\n```\n'
      );
    }
    // If not found, leave it as it is
    return match;
  });
}

/***
 * Gets the metadata of a markdown file (title, frontmatter and content).
 * @param markdownFilePath Path to the markdown file
 * @returns Metadata object containing title, frontmatter and content
 */
function getMarkdownFileMetadata(markdownFilePath: string): MarkdownFileMetadata {
  const fileContent = readFileSync(markdownFilePath, 'utf-8');
  let content = fileContent;

  // Extract frontmatter, if present(e.g. --- ... ---)
  const frontmatter: { [key: string]: string } = {};
  const frontmatterMatch = fileContent.match(regexPatterns.frontmatter);
  if (frontmatterMatch) {
    const frontmatterLines = frontmatterMatch[1].split('\n');
    // Collect all the frontmatter properties (e.g 'expert: true')
    frontmatterLines.forEach((line) => {
      const frontMatterProperty = line.match(regexPatterns.frontMatterProperty);
      if (frontMatterProperty) {
        // Map key and value (e.g frontmatter['expert'] = true)
        frontmatter[frontMatterProperty[1].trim()] = frontMatterProperty[2].trim();
      }
    });
    // The rest of the content after the frontmatter is stored as it is
    content = fileContent.slice(frontmatterMatch[0].length).trimStart();
  }
  return {
    name: markdownFilePath.split(sep).pop() || '',
    content,
    frontmatter,
  };
}

/***
 * Enrich and transform markdown metadata.
 * This function processes the metadata of a markdown file, extracting relevant information
 * and enriching it with additional content from examples.
 * @param markdownFileMetadata Metadata of the markdown file
 * @param exampleContent Content of the examples in a JSON format
 */
function processMarkdownMetadata(markdownFileMetadata: MarkdownFileMetadata, exampleContent: any) {
  const { content, frontmatter, name } = markdownFileMetadata;
  const title = frontmatter.title || markdownFileMetadata.name.split('.')[0];
  const category = frontmatter.category || '';

  // Flat alias array into a string
  let alias: string[] = [];
  if (markdownFileMetadata.frontmatter.alias) {
    alias = markdownFileMetadata.frontmatter.alias
      .split(',')
      .map((a: string) => a.trim())
      .filter(Boolean);
  }

  const sections = extractSections(content).filter((section) => section.content);

  // Replace example placeholders
  sections.forEach((section) => {
    section.content = injectExamples(section.content, exampleContent);
  });

  return {
    name,
    title,
    category,
    alias,
    sections,
  };
}

/***
 * Writes and format the processed markdown contents to a file.
 * @param processedMarkdownContents The processed markdown contents to write
 */
function writeToFile(processedMarkdownContents: any) {
  // Write the file content as a JSON object
  const outPath = resolve(__dirname, directoriesPath.generatedSections);
  writeContentsToFile({
    path: outPath,
    content: JSON.stringify(processedMarkdownContents, null, 2),
  });

  // Output confirmation for CLI use
  // eslint-disable-next-line no-console
  console.log(`✅ Sections written to ${outPath}`);
}

/**
 * Main entry point for the script execution.
 * The script processes markdown files, extracting relevant metadata and replacing example placeholders.
 * The output is a JSON file structured by file (components), intended for LLM consumption.
 */
function main() {
  // eslint-disable-next-line no-console
  console.log('🧪 Generating sections ...');

  // Load markdown files.
  const markdownSearchRoot = resolve(__dirname, directoriesPath.ngAquila);
  const markdownFilesPaths = findMarkdownFilesPaths(markdownSearchRoot, excludedResources);

  // Extract content from markdown files
  const markdownFilesMetadata = markdownFilesPaths.map((markdownFilePath) =>
    getMarkdownFileMetadata(markdownFilePath),
  );

  // Load examples
  const exampleContent = JSON.parse(
    readFileSync(resolve(__dirname, directoriesPath.generatedExamples), 'utf-8'),
  );
  // Enrich and transform markdown metadata
  const processedMarkdownContents = markdownFilesMetadata.map((markdownFileMetadata) =>
    processMarkdownMetadata(markdownFileMetadata, exampleContent),
  );

  // Write the processed markdown contents
  writeToFile(processedMarkdownContents);
}

try {
  main();
} catch (error) {
  console.error('❌ Error occurred while generating sections:', error);
}

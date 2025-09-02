import { execSync } from 'child_process';
import { readdirSync, statSync, writeFileSync } from 'fs';
import { join } from 'path';

/***
 * Writes content to a file and format.
 * @param file The file to write
 * @param file.path The absolute path to the file
 * @param file.content The content to write to the file
 */
export function writeContentsToFile(file: {
  path: string;
  content: string | NodeJS.ArrayBufferView;
}) {
  // Write the file content as a JSON object
  writeFileSync(file.path, file.content, 'utf-8');

  // Format the file
  execSync(`prettier --write ${file.path}`);
}

/**
 * Recursively finds all markdown files in a directory.
 * @param dir Directory to search
 * @param skip Object containing folders and files arrays to skip
 * @param skip.folders Array of folder names to skip
 * @param skip.files Array of file names to skip
 * @returns Array of markdown file paths
 */
export function findMarkdownFilesPaths(
  dir: string,
  skip?: { folders?: string[]; files?: string[] },
): string[] {
  const files = readdirSync(dir);
  let markdownFiles: string[] = [];
  files.forEach((file) => {
    const fullPath = join(dir, file);
    // Skip files inside a specific folder
    if (skip?.folders?.some((folder) => new RegExp(`[/\\\\]${folder}[/\\\\]`).test(fullPath))) {
      return;
    }
    // Skip specific files
    if (skip?.files?.some((fileName) => new RegExp(`[/\\\\]${fileName}`).test(fullPath))) {
      return;
    }
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      // If a directory, search recursively
      markdownFiles = markdownFiles.concat(findMarkdownFilesPaths(fullPath, skip));
    } else if (file.endsWith('.md')) {
      markdownFiles.push(fullPath);
    }
  });
  return markdownFiles;
}

/**
 * Removes frontmatter parameters from a content.
 * @param content string containing frontmatter
 * @param parameters array of parameter names to remove
 * @returns content string with updated frontmatter
 */
export function removeFrontmatterParameters(content: string, parameters: string[]) {
  return content.replace(/---\n([\s\S]*?)\n---/, (_match, frontmatter) => {
    const filteredFrontmatter = frontmatter
      .split('\n')
      .filter(
        (parameterLine: string) => !new RegExp(`^ *(${parameters.join('|')}):`).test(parameterLine),
      )
      .join('\n');
    return `---\n${filteredFrontmatter}\n---`;
  });
}

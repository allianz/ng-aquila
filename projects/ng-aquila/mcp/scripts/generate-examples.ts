import { execSync } from 'child_process';
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { sync as globSync } from 'glob';
import { extname, join, resolve } from 'path';

/**
 * Type definitions
 */

interface Component {
  exampleNames: string[];
  sourcePath: string;
}

interface Example {
  id: string;
  content: {
    title: string;
    ts: string;
    html: string;
    css: string;
  };
}

/**
 * Script general settings
 */

const settings = {
  examplesDirectoryPath: resolve(__dirname, '../../documentation/examples'),
  generatedDirectoryPath: resolve(__dirname, '../../documentation/generated'),
  generatedExamplesFilePath: resolve(__dirname, '../generated/examples.json'),
};

/**
 * Collects a list of components with the examples and source path.
 * @returns A list of components with their examples and source path
 */
function collectComponents(): Component[] {
  // Extract the component names from the examples directory
  const componentNames = getFolders(settings.examplesDirectoryPath);

  // Return the list of components containing the module metadata and the examples
  return componentNames.map((componentName) => {
    // Get the component examples (as folders name)
    const exampleFolders = readdirSync(join(settings.examplesDirectoryPath, componentName), {
      withFileTypes: true,
    })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
    return {
      sourcePath: join(settings.examplesDirectoryPath, componentName),
      exampleNames: exampleFolders,
    };
  });
}

/**
 * Find all the folders located in a given path.
 * @param source Path to the examples directory
 * @returns Array of folder names
 */
function getFolders(source: string): string[] {
  if (!existsSync(source)) {
    return [];
  }
  return readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

/**
 * Extract a list of examples from a list of components
 * @param components list of components
 * @returns A list of objects with className and examples array
 */
function getExamples(components: Component[]) {
  // Store the examples in an array of component examples since each component has multiple examples
  const examples: Example[][] = [];

  // Iterate over each component to extract examples
  components.forEach((component) => {
    const componentExamples: Example[] = [];
    component.exampleNames.forEach((exampleName: string) => {
      const exampleContent: any = {};
      const filePaths = globSync(join(component.sourcePath, exampleName, '*.+(html|css|ts)'));
      filePaths.forEach((filePath) => {
        const content = readFileSync(filePath, 'utf-8');
        const fileExtension = extname(filePath).slice(1);
        if (fileExtension !== 'ts' && fileExtension !== 'html' && fileExtension !== 'css') {
          console.error('     ❌ No matching file extension found for', filePath);
          process.exit(1);
        }
        if (fileExtension === 'ts') {
          const match = content.match(/@title\s+(.*)/);
          const title = match ? match[1].trim() : null;
          exampleContent.title = title;
        }
        exampleContent[fileExtension] = content;
      });
      componentExamples.push({
        id: exampleName,
        content: exampleContent,
      });
    });
    examples.push(componentExamples);
  });

  // Return a flat list of examples
  return examples.flat();
}

/**
 * Main function to aggregate documentation examples, and store them into a json file that can be easily consumed
 */
function main() {
  // eslint-disable-next-line no-console
  console.log('🧪 Generating examples ...');

  // Collect components
  const components = collectComponents();

  // Extract examples from components and flat them
  const exampleContent = getExamples(components);

  // Store the examples into the generated folder
  writeFileSync(
    settings.generatedExamplesFilePath,
    JSON.stringify(exampleContent, null, 2),
    'utf-8',
  );

  // Format the generated file
  execSync(`prettier --write ${settings.generatedExamplesFilePath}`);

  console.log('✅ Examples written to ', settings.generatedExamplesFilePath);
}

try {
  main();
} catch (error) {
  console.error('❌ Error occurred while generating examples:', error);
}

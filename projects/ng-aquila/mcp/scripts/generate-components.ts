import { existsSync, mkdirSync, readFileSync, rmSync } from 'fs';
import { basename, resolve } from 'path';

import { AngularComponentOrDirective, AngularModule } from './generate-angular-metadata';
import { findMarkdownFilesPaths, removeFrontmatterParameters, writeContentsToFile } from './utils';

/**
 * Typescript definitions
 */
interface File {
  name: string;
  content: string;
}

/**
 * File's scoped variables
 */
const settings = {
  ngAquilaPath: '../..',
  generatedComponentsPath: '../generated/components',
  generatedAngularMetadataPath: '../generated/angular-metadata.json',
  excludedResources: {
    folders: ['mcp', 'static'],
    files: [
      'README.md',
      'accessibility.md',
      'config.md',
      'getting-started.md',
      'mcp.md',
      'releases.md',
      'typography.md',
      'utils.md',
    ],
  },
};

const regexPatterns = {
  frontmatter: /^---[\s\S]*?---\s*/,
  docsDeprecationWarningBlock: /<div class="docs-deprecation-warning">[\s\S]*?<\/div>/g,
  aiBlock: /<!--\s*\/\/ai[\s\S]*?-->/g,
  heading: /(^|\n)#+\s/,
  apiTags: /#\{\{(module|component|directive)\(([^)]+)\)\}\}/g,
  doubleQuotes: /"/g,
  newLine: /\n/g,
  specialCharacters: /[$()*+.?[\\\]^{|}]/g,
};

/**
 * Escapes special chars in a string.
 * @param specialCharactersString - The input string with special characters
 * @returns The escaped input string
 */
function escapeSpecialCharacters(specialCharactersString: string) {
  return specialCharactersString.replace(regexPatterns.specialCharacters, '\\$&');
}

/**
 * Extracts api details from angular metadata
 * @param type - The type of the API (module, component, directive)
 * @param param - The name of the API to extract
 * @param angularMetadata - The angular metadata object to search
 */
function getApiDetailsfromAngularMetadata(
  type: string,
  param: string,
  angularMetadata: any,
): string {
  switch (type) {
    case 'module': {
      const angularMetadataModule = angularMetadata.modules?.find(
        (metadataModule: any) => metadataModule.module === param,
      );
      return angularMetadataModule ? formatModule(angularMetadataModule, angularMetadata) : '';
    }
    case 'component': {
      const component = angularMetadata.components?.find(
        (metadataComponent: any) => metadataComponent.component === param,
      );
      return component ? formatComponentOrDirective(component) : '';
    }
    case 'directive': {
      const directive = angularMetadata.directives?.find(
        (metadataDirective: any) => metadataDirective.directive === param,
      );
      return directive ? formatComponentOrDirective(directive) : '';
    }
    default:
      return '';
  }
}

/**
 * Formats the module metadata into a YAML string.
 * @param module - The module metadata to format
 * @param angularMetadata - The angular metadata object
 */
function formatModule(module: AngularModule, angularMetadata: any): string {
  const yaml = [];

  // Add the module name
  if (module.module) {
    yaml.push(`module: ${module.module}`);
  }

  // Add the module import path
  if (module.importPath) {
    yaml.push(`importPath: ${module.importPath}`);
  }

  // If the module metadata contains imports
  if (Array.isArray(module.imports) && module.imports.length > 0) {
    // Add the imports under components
    yaml.push('components:');
    module.imports.forEach((moduleImport) => {
      const componentOrDirective =
        angularMetadata.components?.find((c: any) => c.component === moduleImport) ||
        angularMetadata.directives?.find((d: any) => d.directive === moduleImport);
      if (componentOrDirective) {
        const formatted = formatComponentOrDirective(componentOrDirective);
        if (formatted) {
          yaml.push(
            formatted
              .split('\n')
              .map((line) => '  ' + line)
              .join('\n'),
          );
        }
      }
    });
  }

  // Return the concatenated YAML string
  return yaml.filter(Boolean).join('\n');
}

/**
 * Formats the component or directive metadata into a YAML string.
 * @param componentOrDirective - The component or directive metadata to format
 * @returns The formatted YAML string
 */
function formatComponentOrDirective(componentOrDirective: AngularComponentOrDirective): string {
  const yaml = [];

  // Add the name
  const name = componentOrDirective.component || componentOrDirective.directive || '';
  if (name) {
    yaml.push(`- name: ${name}`);
  }

  // Add the selector
  if (componentOrDirective.selector) {
    yaml.push(`  selector: ${componentOrDirective.selector}`);
  }

  // Add the import path
  if (componentOrDirective.importPath) {
    yaml.push(`  importPath: "${componentOrDirective.importPath}"`);
  }

  // Add the description
  if (componentOrDirective.description) {
    yaml.push(
      `  desc: |\n    ${componentOrDirective.description.replace(regexPatterns.newLine, '\n    ').replace(regexPatterns.doubleQuotes, "'")}`,
    );
  }

  // Input props
  if (Array.isArray(componentOrDirective.props) && componentOrDirective.props.length > 0) {
    // Only include props with @Input decorator (excluding name 'id') or with input type 'InputSignal'
    const filteredInputProps = componentOrDirective.props.filter(
      (input) =>
        (input.decorator && input.decorator.includes('@Input') && input.name !== 'id') ||
        input.type.includes('InputSignal'),
    );

    // If there are eligible input props
    if (filteredInputProps.length > 0) {
      // Add the inputs
      yaml.push('  inputs:');

      // Loop through the filtered input props
      filteredInputProps.forEach((inputProp) => {
        // Ignore input prop if the modifier contains 'private' or 'protected'
        if (
          inputProp.modifier &&
          (inputProp.modifier.includes('private') || inputProp.modifier.includes('protected'))
        ) {
          return;
        }

        // Consider only prop where at least one these fields is present
        if (inputProp.name || inputProp.description || inputProp.value || inputProp.type) {
          const inputPropType = inputProp.type?.replace(regexPatterns.doubleQuotes, "'");
          yaml.push(
            `    - name: ${inputProp.alias || inputProp.name || ''}`,
            inputProp.description
              ? `      desc: "${inputProp.description.replace(regexPatterns.newLine, ' ').replace(regexPatterns.doubleQuotes, "'")}"`
              : '',
            inputProp.value ? `      default: ${inputProp.value}` : '',
            inputProp.type ? `      type: "${inputPropType}"` : '',
          );
        }
      });
    }
  }

  // Output props
  if (Array.isArray(componentOrDirective.props) && componentOrDirective.props.length > 0) {
    // Only include props with @Output decorator, ignore private/protected, and ignore names starting with '_'
    const filteredOutputProps = componentOrDirective.props.filter((output) => {
      const isOutput = output.decorator && output.decorator.includes('@Output');
      const isPrivate =
        output.modifier &&
        (output.modifier.includes('private') || output.modifier.includes('protected'));
      const isUnderscore =
        (typeof output.name === 'string' && output.name.startsWith('_')) ||
        (output.alias && output.alias.startsWith('_'));
      return isOutput && !isPrivate && !isUnderscore;
    });

    // If there are eligible output props
    if (filteredOutputProps.length > 0) {
      // Add the outputs
      yaml.push('  outputs:');

      // Loop through the filtered output props
      filteredOutputProps.forEach((outputProp) => {
        // Consider only output props with at least one of these fields
        if (outputProp.name || outputProp.description || outputProp.type) {
          const outputPropType = outputProp.type?.replace(regexPatterns.doubleQuotes, "'");
          yaml.push(
            `    - name: ${outputProp.alias || outputProp.name || ''}`,
            outputProp.description
              ? `      desc: "${outputProp.description.replace(regexPatterns.newLine, ' ').replace(regexPatterns.doubleQuotes, "'")}"`
              : '',
            outputProp.type ? `      type: "${outputPropType}"` : '',
          );
        }
      });
    }
  }

  // Methods
  if (Array.isArray(componentOrDirective.methods) && componentOrDirective.methods.length > 0) {
    // Only show methods that are not private, not in the excluded list, and do not start with '_'
    const excludedMethodNames = [
      'registerOnChange',
      'registerOnTouched',
      'writeValue',
      'registerOnValidatorChange',
    ];
    const publicMethods = componentOrDirective.methods.filter((method) => {
      const isPrivate = Array.isArray(method.modifier) && method.modifier.includes('private');
      const isExcluded = excludedMethodNames.includes(method.name);
      const isUnderscore = typeof method.name === 'string' && method.name.startsWith('_');
      return !isPrivate && !isExcluded && !isUnderscore;
    });

    // If there are eligible methods
    if (publicMethods.length > 0) {
      // Add the methods
      yaml.push('  methods:');

      // Loop through the methods
      publicMethods.forEach((method) => {
        // Consider only methods with at least one of these fields
        if (method.name || method.params || method.description || method.returnType) {
          yaml.push(`    - name: ${method.name || ''}`);
          // Handle method parameters
          if (Array.isArray(method.params) && method.params.length > 0) {
            yaml.push('      params:');
            method.params.forEach((param) => {
              if (param && (param.name || param.type)) {
                let paramLine = `        - name: ${param.name || ''}`;
                if (param.type) {
                  paramLine += `\n          type: ${param.type}`;
                }
                yaml.push(paramLine);
              }
            });
          } else if (method.params) {
            yaml.push(`      params: ${method.params}`);
          }
          if (method.description) {
            yaml.push(
              `      desc: "${method.description.replace(regexPatterns.newLine, ' ').replace(regexPatterns.doubleQuotes, "'")}"`,
            );
          }
          if (method.returnType) {
            yaml.push(`      returnType: ${method.returnType}`);
          }
        }
      });
    }
  }

  // Return the generated YAML as a single string
  return yaml.filter(Boolean).join('\n');
}

/***
 * Converts a markdown file name to camel case.
 * @param filename The name of the markdown file.
 * @returns The camel case version of the file name.
 */
function convertFileNameToCamelCase(filename: string) {
  // Remove the extension
  const baseName = filename.replace(/\.md$/, '');

  // Convert to camelCase
  return baseName
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

/**
 * Adds a module placeholder to the frontmatter of a markdown file.
 * @param markdownFile The markdown file to modify.
 * @param markdownFile.name The name of the markdown file.
 * @param markdownFile.content The content of the markdown file.
 * @returns The modified frontmatter with the module placeholder, or an empty string if the frontmatter is not found.
 */
function addModulePlaceholder(markdownFile: { name: string; content: string }) {
  const filteredFrontmatter = markdownFile.content.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  const moduleName = `#{{module(Nx${convertFileNameToCamelCase(markdownFile.name)}Module)}}`;
  if (filteredFrontmatter) {
    return `--- \n${filteredFrontmatter[1]}\n\n${moduleName}\n\n---`;
  }

  return '';
}

/**
 * Adds an overview section to the markdown content, the overview section is the content block between the frontmatter and the first heading.
 * @param content The markdown content to modify.
 * @returns The modified content with the overview section added.
 */
function addOverviewSection(content: string) {
  // Overview section container
  let overviewSection = '';

  // Remove frontmatter
  const frontmatterMatch = content.match(regexPatterns.frontmatter);
  let afterFrontmatter = content;
  if (frontmatterMatch) {
    afterFrontmatter = content.slice(frontmatterMatch[0].length);
  }

  // Remove all deprecation warnings blocks
  afterFrontmatter = afterFrontmatter.replace(regexPatterns.docsDeprecationWarningBlock, '');

  // Remove all AI blocks (including multiline)
  afterFrontmatter = afterFrontmatter.replace(regexPatterns.aiBlock, '');

  // Find first heading section
  const headingMatch = afterFrontmatter.match(regexPatterns.heading);
  if (headingMatch) {
    const firstHeadingMatchIndex = afterFrontmatter.indexOf(headingMatch[0]);
    overviewSection = afterFrontmatter.slice(0, firstHeadingMatchIndex).trim();
  } else {
    overviewSection = afterFrontmatter.trim();
  }

  // If overview section is not empty, format it
  if (overviewSection) {
    return `\n# Overview\n${overviewSection}\n`;
  }

  return '';
}

/**
 * Extracts api tags metadata from content.
 * @param content The content to extract api tags from.
 * @returns An array of api tags metadata.
 */
function extractApiTags(content: string): Array<{ type: string; param: string; fullTag: string }> {
  const matches: Array<{ type: string; param: string; fullTag: string }> = [];
  let match;
  while ((match = regexPatterns.apiTags.exec(content)) !== null) {
    matches.push({
      type: match[1],
      param: match[2],
      fullTag: match[0],
    });
  }
  return matches;
}

/**
 * Saves an array of files to disk.
 * @param data Array of file objects
 * @param dataRoot Output directory
 */
function saveFiles(data: File[], dataRoot: string) {
  // Compute the global path
  const rootDir = resolve(__dirname, dataRoot);

  // Remove the root directory if it exists
  if (existsSync(rootDir)) {
    rmSync(rootDir, { recursive: true, force: true });
  }

  // Create the root directory
  mkdirSync(rootDir);

  // Store the files
  data.forEach((item) => {
    const filePath = resolve(rootDir, basename(item.name));
    writeContentsToFile({
      path: filePath,
      content: item.content,
    });
  });

  // Output confirmation for CLI use
  // eslint-disable-next-line no-console
  console.log(`✅ Components written to ${rootDir}`);
}

function main() {
  // eslint-disable-next-line no-console
  console.log('🧪 Generating components ...');

  // Collect markdown file paths
  const ngAquilaGlobalPath = resolve(__dirname, settings.ngAquilaPath);
  const markdownFilePaths = findMarkdownFilesPaths(ngAquilaGlobalPath, settings.excludedResources);

  // Get the files content with cleaned frontmatter
  const filteredMarkdownFiles = markdownFilePaths.map((mdFile) => {
    const fileContent = readFileSync(mdFile, 'utf-8');
    return {
      name: basename(mdFile),
      content: removeFrontmatterParameters(fileContent, ['b2c', 'expert', 'stable', 'a1']),
    };
  });

  // Get generated angular metadata
  const angularMetadataPath = resolve(__dirname, settings.generatedAngularMetadataPath);
  const angularMetadata = JSON.parse(readFileSync(angularMetadataPath, 'utf-8'));

  // Generate the components from the files content
  const components = filteredMarkdownFiles.map((filteredMarkdownFile) => {
    // Add module placeholder
    let content = addModulePlaceholder(filteredMarkdownFile);

    // Add overview section
    content += addOverviewSection(filteredMarkdownFile.content);

    // Add api details
    const apiTags = extractApiTags(content);
    apiTags.forEach((tag) => {
      const apiInfo = getApiDetailsfromAngularMetadata(tag.type, tag.param, angularMetadata);
      content = content.replace(new RegExp(escapeSpecialCharacters(tag.fullTag), 'g'), apiInfo);
    });

    return {
      name: filteredMarkdownFile.name,
      content,
    };
  });

  // Store components
  const outDir = resolve(__dirname, settings.generatedComponentsPath);
  saveFiles(components, outDir);
}

try {
  main();
} catch (error) {
  console.error('❌ Error occurred while generating components:', error);
}

import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { generateExampleModule } from './template';
import * as path from 'path';
import { ExampleMetadata } from './types';

/** Create the examples module template **/
export const generateExampleNgModuleContent = (examplesPath, destination) => pipe(
  map((extractedMetadata: ExampleMetadata[]) => {
    const relativePathExamples = path.relative(destination, path.resolve(examplesPath));
    const moduleContent = generateExampleModule({
      imports: extractedMetadata.map(r => buildImportsTemplate(r, destination)).join('').trim(),
      components: extractedMetadata.map(buildExamplesTemplate).join('').trim(),
      examples: extractedMetadata.map(formatComponentName).join('').trim(),
      routes: extractedMetadata.map(buildExampleRoute).join(',\n').trim(),
      exampleSharedModule: path.posix.join(relativePathExamples, './examples-shared.module').replace('\\', '/')
    });

    return {
      moduleContent, metadata: extractedMetadata
    };
  })
);

/** Build ES module import statements for the examples. */
const buildImportsTemplate = (metadata: ExampleMetadata, examplesPath: string): string => {
  const component = metadata.component;
  // The relative path will be used inside of a TypeScript import statement.
  const relativeSrcPath = path
      .relative(examplesPath, metadata.sourcePath)
      .replace(/\\/g, '/')
      .replace('.ts', '');

  return `import {${component}} from './${relativeSrcPath}';
`;
};

/** Builds the examples metadata including title, component, etc. */
function buildExamplesTemplate(metadata: ExampleMetadata): string {
  const fields = [
    `id: '${metadata.id}'`,
    `title: '${metadata.title.trim()}'`,
    `component: ${metadata.component}`
  ];
  const data = '\n' + fields.map(field => '    ' + field).join(',\n');

  return `'${metadata.id}': {${data}
  },
  `;
}

function buildExampleRoute(metadata: ExampleMetadata): string {
  return `{
    path: '${metadata.id}',
    component: ${metadata.component}
  }`;
}

/** Format the name of the component (comma at the end) */
function formatComponentName(metadata: ExampleMetadata): string {
  return `${metadata.component},
  `;
}

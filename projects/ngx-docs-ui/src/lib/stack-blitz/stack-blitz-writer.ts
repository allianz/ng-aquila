import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';

import { ExampleData } from './example-data';

const currentYear = new Date().getFullYear();
const COPYRIGHT = `Copyright ${currentYear} ALLIANZ`;

/**
 * Path that refers to the docs-content from the "@angular/components-examples" package. The
 * structure is defined in the Material repository, but we include the docs-content as assets in
 * in the CLI configuration.
 */
const DOCS_CONTENT_PATH = 'docs-content/examples-source';

const TEMPLATE_PATH = 'assets/stack-blitz/';
const TEMPLATE_FILES = [
  'src/index.html',
  'src/main.ts',
  'src/styles.scss',
  'angular.json',
  'package.json',
  'tsconfig.json',
  'tsconfig.app.json',
];

const ASSETS_BASE_PATH = 'https://allianz.github.io/ng-aquila/';

/**
 * StackBlitz writer, write example files to StackBlitz using the SDK.
 */
@Injectable()
export class StackBlitzWriter {
  constructor(private readonly _http: HttpClient) {}

  /**
   * Opens a StackBlitz project with the example data using the SDK.
   */
  async openStackBlitzProject(exampleId: string, module: string, data: ExampleData): Promise<void> {
    const baseExamplePath = `${DOCS_CONTENT_PATH}/${module}/${exampleId}/`;
    const files: { [key: string]: string } = {};

    // Load template files. The template's package.json / package-lock.json are read verbatim so
    // that dependencies stay owned by the committed template (and its lockfile) rather than being
    // duplicated here.
    for (const file of TEMPLATE_FILES) {
      const content = await this._fetchFile(file, TEMPLATE_PATH);
      let processedContent = this._replaceExamplePlaceholderNames(data, file, content);
      processedContent = this._appendCopyright(file, processedContent);
      files[file] = processedContent;
    }

    try {
      const packageLockContent = await this._fetchFile('package-lock.json', TEMPLATE_PATH);
      files['package-lock.json'] = packageLockContent;
    } catch (error) {}

    // Load example files
    for (const file of data.exampleFiles) {
      const content = await this._fetchFile(file, baseExamplePath);
      let processedContent = content;
      if (file.indexOf('.html') > 0) {
        processedContent = this._replaceImagePaths(processedContent);
      }
      processedContent = this._appendCopyright(file, processedContent);
      const filePath = `src/app/${file}`;
      files[filePath] = processedContent;
    }

    // Handle special case for icon-registry-example
    if (data.selectorName === 'icon-registry-example') {
      const iconContent = await this._fetchFile('assets/icons/settings.svg', '');
      files['src/assets/icons/settings.svg'] = iconContent;
    }

    // Open StackBlitz project using SDK
    await sdk.openProject(
      {
        title: data.description,
        description: data.description,
        template: 'node',
        files,
      },
      {
        newWindow: true,
        openFile: `src/app/${data.indexFilename}`,
      },
    );
  }

  /**
   * Fetches a file from the given path.
   */
  private async _fetchFile(filename: string, path: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this._http.get(path + filename, { responseType: 'text' }).subscribe({
        next: (response) => resolve(response),
        error: (error) => {
          console.error(`Failed to fetch ${path}${filename}:`, error);
          reject(error);
        },
      });
    });
  }

  _replaceImagePaths(fileContents: string) {
    const regex = /(["'])((?:docs-)?assets\/(?:images|logos)\/.*?)(["'])/g;
    return fileContents.replace(
      regex,
      (_, prefix, url, suffix) => `${prefix}${ASSETS_BASE_PATH}${url}${suffix}`,
    );
  }

  /**
   * The StackBlitz template assets contain placeholder names for the examples:
   * "<aquila-docs-example>" and "AquilaDocsExample".
   * This will replace those placeholders with the names from the example metadata,
   * e.g. "<button-example>" and "ButtonExample".
   */
  _replaceExamplePlaceholderNames(
    data: ExampleData,
    fileName: string,
    fileContent: string,
  ): string {
    if (fileName === 'src/index.html') {
      // Replace the component selector in `index,html`.
      // For example, <aquila-docs-example></aquila-docs-example> will be replaced as
      // <button-example></button-example>
      fileContent = fileContent.replace(/aquila-docs-example/g, data.selectorName);
    } else if (fileName === 'src/main.ts') {
      const exampleComponentName = data.componentNames[0];
      const dotIndex = data.indexFilename.lastIndexOf('.');
      const importFileName = data.indexFilename.slice(0, dotIndex === -1 ? undefined : dotIndex);
      const exampleImportPath = `./app/${importFileName}`;

      fileContent = `
                import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
                import { provideHttpClient, withInterceptorsFromDi, withJsonpSupport } from '@angular/common/http';
                import { importProvidersFrom } from '@angular/core';
                import { RouterModule } from '@angular/router';
                import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
                import { NxMomentDateModule } from '@allianz/ng-aquila/moment-date-adapter';

                import { bootstrapApplication } from '@angular/platform-browser';
                import { ${exampleComponentName} } from '${exampleImportPath}';
                import 'zone.js';

                bootstrapApplication(${exampleComponentName}, {
                providers: [
                  provideAnimationsAsync(),
                  provideHttpClient(withInterceptorsFromDi(), withJsonpSupport()),
                  importProvidersFrom(RouterModule.forRoot([])),
                  importProvidersFrom(NxDocumentationIconModule),
                  importProvidersFrom(NxMomentDateModule)
                ]
                });
            `;
    }
    return fileContent;
  }

  _appendCopyright(filename: string, content: string) {
    if (filename.includes('.ts') || filename.includes('.scss')) {
      content = `${content}\n\n/**  ${COPYRIGHT} */`;
    } else if (filename.includes('.html')) {
      content = `${content}\n\n<!-- ${COPYRIGHT} -->`;
    }
    return content;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import sdk from '@stackblitz/sdk';

import { ExampleData } from './example-data';

const STACKBLITZ_URL = 'https://run.stackblitz.com/api/angular/v1';

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

const TEST_TEMPLATE_PATH = 'assets/stack-blitz-tests/';
const TEST_TEMPLATE_FILES = [
  'src/index.html',
  'src/main.ts',
  'src/styles.scss',
  'src/test.ts',
  'src/test/jasmine-setup.ts',
  'angular.json',
  'package.json',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.spec.json',
];

const TAGS: string[] = ['allianz', 'aquila', 'example'];

const angularVersion = '^21.0.0';
const aquilaVersion = '^21.0.0';

const dependencies = {
  '@angular/animations': angularVersion, // need by @angular/platform-browser
  '@angular/cdk': angularVersion,
  '@angular/common': angularVersion,
  '@angular/compiler': angularVersion,
  '@angular/core': angularVersion,
  '@angular/forms': angularVersion,
  '@angular/platform-browser': angularVersion,
  '@angular/router': angularVersion,
  '@allianz/ng-aquila': aquilaVersion,
  '@standard-schema/spec': '^1.0.0', // need by angular 21 forms-validation
  'ag-grid-angular': '^33.1.1',
  'ag-grid-community': '^33.1.1',
  dayjs: '^1.11.5',
  'decimal.js': '^10.4.2',
  'i18n-iso-countries': '^7.5.0',
  ibantools: '^4.5.1',
  moment: '^2.29.4',
  rxjs: '~6.6.7',
  tslib: '^2.8.1',
  'zone.js': '^0.16.0',
};

const devDependencies = {
  '@angular-devkit/build-angular': angularVersion,
  '@angular/cli': angularVersion,
  '@angular/compiler-cli': angularVersion,
  typescript: '~5.9.3',
};

const testDependencies = {
  '@angular/cdk': angularVersion,
  '@angular/common': angularVersion,
  '@angular/compiler': angularVersion,
  '@angular/core': angularVersion,
  '@angular/forms': angularVersion,
  '@angular/platform-browser': angularVersion,
  '@angular/platform-browser-dynamic': angularVersion,
  '@angular/router': angularVersion,
  '@allianz/ng-aquila': aquilaVersion,
  'i18n-iso-countries': '^7.4.0',
  iban: '^0.0.14',
  jasmine: '^5.1.0',
  'jasmine-core': '^5.1.1',
  'jasmine-spec-reporter': '^7.0.0',
  moment: '^2.29.4',
  rxjs: '~6.6.7',
  tslib: '^2.8.1',
  'zone.js': '^0.15.0',
};

const testDevDependencies = {
  '@angular-devkit/build-angular': angularVersion,
  '@angular/cli': angularVersion,
  '@angular/compiler-cli': angularVersion,
  typescript: '~5.9.3',
};

/**
 * StackBlitz writer, write example files to StackBlitz using the WebContainer SDK.
 */
@Injectable()
export class StackBlitzWriter {
  constructor(private readonly _http: HttpClient) {}

  /**
   * Opens a StackBlitz project with the example data using the WebContainer SDK.
   */
  async openStackBlitzProject(
    exampleId: string,
    module: string,
    data: ExampleData,
    isTest: boolean,
  ): Promise<void> {
    const baseExamplePath = `${DOCS_CONTENT_PATH}/${module}/${exampleId}/`;
    const files: { [key: string]: string } = {};

    // Load template files
    const templateFiles = isTest ? TEST_TEMPLATE_FILES : TEMPLATE_FILES;
    const templatePath = isTest ? TEST_TEMPLATE_PATH : TEMPLATE_PATH;

    for (const file of templateFiles) {
      const content = await this._fetchFile(file, templatePath);
      let processedContent = this._replaceExamplePlaceholderNames(data, file, content, isTest);
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

  /**
   * @deprecated Use openStackBlitzProject instead. This method is kept for backward compatibility.
   * Returns an HTMLFormElement that will open a new StackBlitz template with the example data when
   * called with submit().
   */
  async constructStackBlitzForm(
    exampleId: string,
    module: string,
    data: ExampleData,
    isTest: boolean,
  ): Promise<HTMLFormElement> {
    // Default file to show in StackBlitz
    const indexFile = `src%2Fapp%2F${data.indexFilename}`;
    const form = this._createFormElement(indexFile);
    const baseExamplePath = `${DOCS_CONTENT_PATH}/${module}/${exampleId}/`;

    TAGS.forEach((tag, i) => {
      this._appendFormInput(form, `tags[${i}]`, tag);
    });
    this._appendFormInput(form, 'private', 'true');
    this._appendFormInput(form, 'description', data.description);

    return new Promise((resolve) => {
      const templateContents = (isTest ? TEST_TEMPLATE_FILES : TEMPLATE_FILES).map(async (file) =>
        this._readFile(form, data, file, isTest ? TEST_TEMPLATE_PATH : TEMPLATE_PATH, isTest),
      );

      const exampleContents = data.exampleFiles.map(async (file) =>
        this._readFile(form, data, file, baseExamplePath, isTest),
      );

      const allContents = templateContents.concat(exampleContents);

      if (data.selectorName === 'icon-registry-example') {
        allContents.push(
          this._readFile(form, data, 'assets/icons/settings.svg', '', isTest, false),
        );
      }

      Promise.all(allContents).then(() => {
        resolve(form);
      });
    });
  }

  /** Constructs a new form element that will navigate to the StackBlitz url. */
  _createFormElement(indexFile: string): HTMLFormElement {
    const form = document.createElement('form');
    form.action = `${STACKBLITZ_URL}?file=${indexFile}`;
    form.method = 'post';
    form.target = '_blank';
    return form;
  }

  /** Appends the name and value as an input to the form. */
  _appendFormInput(form: HTMLFormElement, name: string, value: string): void {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }

  /**
   * Reads the file and adds its text to the form
   * @param form the html form you are appending to
   * @param data example metadata about the example
   * @param filename file name of the example
   * @param path path to the src
   * @param isTest whether file is part of a test example
   * @param prependApp whether to prepend the 'app' prefix to the path
   */
  async _readFile(
    form: HTMLFormElement,
    data: ExampleData,
    filename: string,
    path: string,
    isTest: boolean,
    prependApp = true,
  ): Promise<string> {
    return new Promise((resolve) => {
      this._http.get(path + filename, { responseType: 'text' }).subscribe(
        (response) => {
          let fileContents = response;
          if (filename.indexOf('.html') > 0) {
            fileContents = this._replaceImagePaths(fileContents);
          }
          this._addFileToForm(form, data, fileContents, filename, path, isTest, prependApp);
          resolve(path + filename);
        },
        (error) => console.log(error),
      );
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
   * Adds the file text to the form.
   * @param form The html form you are appending to.
   * @param data Example metadata about the example.
   * @param content File contents.
   * @param filename File name of the example.
   * @param path Path to the src.
   * @param isTest Whether file is part of a test example.
   * @param prependApp Whether to prepend the 'app' prefix to the path.
   */
  _addFileToForm(
    form: HTMLFormElement,
    data: ExampleData,
    content: string,
    filename: string,
    path: string,
    isTest: boolean,
    prependApp = true,
  ) {
    if (path === (isTest ? TEST_TEMPLATE_PATH : TEMPLATE_PATH)) {
      content = this._replaceExamplePlaceholderNames(data, filename, content);
    } else if (prependApp) {
      filename = 'src/app/' + filename;
    } else if (filename.startsWith('assets')) {
      filename = 'src/' + filename;
    }
    this._appendFormInput(form, `files[${filename}]`, this._appendCopyright(filename, content));
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
    isTest = false,
  ): string {
    if (fileName === 'src/index.html') {
      // Replace the component selector in `index,html`.
      // For example, <aquila-docs-example></aquila-docs-example> will be replaced as
      // <button-example></button-example>
      fileContent = fileContent.replace(/aquila-docs-example/g, data.selectorName);
      fileContent = fileContent.replace(/\{\{version\}\}/g, aquilaVersion);
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
    } else if (fileName === 'package.json') {
      // Merge runtime dependencies from TypeScript constants into package.json
      try {
        const packageJson = JSON.parse(fileContent);
        packageJson.dependencies = isTest ? testDependencies : dependencies;
        packageJson.devDependencies = isTest ? testDevDependencies : devDependencies;
        fileContent = JSON.stringify(packageJson, null, 2);
      } catch (error) {
        console.error('Failed to parse package.json:', error);
      }
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

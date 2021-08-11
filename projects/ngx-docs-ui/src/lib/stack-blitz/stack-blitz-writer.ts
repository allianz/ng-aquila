import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ExampleData } from './example-data';

const STACKBLITZ_URL = 'https://run.stackblitz.com/api/angular/v1';

const COPYRIGHT = `Copyright APOSIN 2021`;

/**
 * Path that refers to the docs-content from the "@angular/components-examples" package. The
 * structure is defined in the Material repository, but we include the docs-content as assets in
 * in the CLI configuration.
 */
const DOCS_CONTENT_PATH = 'docs-content/examples-source';

const TEMPLATE_PATH = 'assets/stack-blitz/';
const TEMPLATE_FILES = [
  'src/app/aquila-module.ts',
  'src/index.html',
  'src/main.ts',
  'src/polyfills.ts',
  'src/styles.scss',
  // '.browserslistrc', // FIX: Commented these optional files as the ci cannot deploy them
  // '.editorconfig',
  // '.gitignore',
  'angular.json',
  'package.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.spec.json',
  'tslint.json',
];

const ASSETS_BASE_PATH = 'https://aposin.github.io/ng-aquila/';

const TEST_TEMPLATE_PATH = 'assets/stack-blitz-tests/';
const TEST_TEMPLATE_FILES = [
  'src/app/aquila-module.ts',
  'src/index.html',
  'src/main.ts',
  'src/polyfills.ts',
  'src/styles.scss',
  'src/test.ts',
  'src/test/jasmine-setup.ts',
  // '.browserslistrc',
  // '.editorconfig',
  // '.gitignore',
  'angular.json',
  'package.json',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.spec.json',
  'tslint.json',
];

const TAGS: string[] = ['aposin', 'aquila', 'example'];
const angularVersion = '^12.2.0';
const materialVersion = '^12.2.0';
const aquilaVersion = '^11.0.0';

const dependencies = {
  '@angular/animations': angularVersion,
  '@angular/cdk': materialVersion,
  '@angular/common': angularVersion,
  '@angular/compiler': angularVersion,
  '@angular/core': angularVersion,
  '@angular/forms': angularVersion,
  '@angular/platform-browser': angularVersion,
  '@angular/platform-browser-dynamic': angularVersion,
  '@angular/router': angularVersion,
  '@aposin/ng-aquila': aquilaVersion,
  'css-vars-ponyfill': '^2.4.6',
  'dayjs': '^1.10.6',
  'iban': '^0.0.14',
  'moment': '^2.29.1',
  'object-fit-images': '^3.2.4',
  'rxjs': '~6.6.0',
  'tslib': '^2.3.0',
  'zone.js': '~0.10.2',
  'libphonenumber-js': '^1.9.23',
  'i18n-iso-countries': '^6.5.0'
};

const testDependencies = {
  '@angular/cdk': materialVersion,
  '@angular/animations': angularVersion,
  '@angular/common': angularVersion,
  '@angular/compiler': angularVersion,
  '@angular/core': angularVersion,
  '@angular/forms': angularVersion,
  '@angular/platform-browser': angularVersion,
  '@angular/platform-browser-dynamic': angularVersion,
  '@angular/router': angularVersion,
  '@aposin/ng-aquila': aquilaVersion,
  '@types/jasmine': '^3.8.2',
  'jasmine-core': '^3.6.0',
  'css-vars-ponyfill': '^2.4.6',
  'dayjs': '^1.10.6',
  'iban': '^0.0.14',
  'moment': '^2.29.1',
  'object-fit-images': '^3.2.4',
  'rxjs': '~6.6.0',
  'tslib': '^2.3.0',
  'zone.js': '~0.11.4'
};

/**
 * StackBlitz writer, write example files to StackBlitz.
 *
 * StackBlitz API
 * URL: https://run.stackblitz.com/api/aio/v1/
 * data: {
 *   // File name, directory and content of files
 *   files[file-name1]: file-content1,
 *   files[directory-name/file-name2]: file-content2,
 *   // Can add multiple tags
 *   tags[0]: tag-0,
 *   // Description of StackBlitz
 *   description: description,
 *   // Private or not
 *   private: true
 *  // Dependencies
 *  dependencies: dependencies
 * }
 */
@Injectable()
export class StackBlitzWriter {
  constructor(private _http: HttpClient) {}

  /**
   * Returns an HTMLFormElement that will open a new StackBlitz template with the example data when
   * called with submit().
   */
  constructStackBlitzForm(exampleId: string,
                          module: string,
                          data: ExampleData,
                          isTest: boolean): Promise<HTMLFormElement> {

    // Default file to show in StackBlitz
    const indexFile = `src%2Fapp%2F${data.indexFilename}`;
    const form = this._createFormElement(indexFile);
    const baseExamplePath =
      `${DOCS_CONTENT_PATH}/${module}/${exampleId}/`;

    TAGS.forEach((tag, i) => this._appendFormInput(form, `tags[${i}]`, tag));
    this._appendFormInput(form, 'private', 'true');
    this._appendFormInput(form, 'description', data.description);
    this._appendFormInput(form,
      'dependencies',
      JSON.stringify(isTest ? testDependencies : dependencies));

    return new Promise(resolve => {
      const templateContents = (isTest ? TEST_TEMPLATE_FILES : TEMPLATE_FILES)
        .map(file => this._readFile(form,
          data,
          file,
          isTest ? TEST_TEMPLATE_PATH : TEMPLATE_PATH,
          isTest));

      const exampleContents = data.exampleFiles
        .map(file => this._readFile(form, data, file, baseExamplePath, isTest));

      const allContents = templateContents.concat(exampleContents);

      if (data.selectorName === 'icon-registry-example') {
        allContents.push(this._readFile(form, data, 'assets/icons/settings.svg', '', isTest, false));
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
  _readFile(form: HTMLFormElement,
            data: ExampleData,
            filename: string,
            path: string,
            isTest: boolean,
            prependApp = true): Promise<string> {
    return new Promise(resolve => {
      this._http.get(path + filename, {responseType: 'text'}).subscribe(
        response => {
          let fileContents = response;
          if (filename.indexOf('.html') > 0) {
            fileContents = this._replaceImagePaths(fileContents);
          }
          this._addFileToForm(form, data, fileContents, filename, path, isTest, prependApp);
          resolve(path + filename);
        },
        error => console.log(error)
      );
    });
  }

  _replaceImagePaths(fileContents: string) {
    const regex = /(["'])((?:docs-|)assets\/(?:images|logos)\/.*?)(['"])/gm;
    return fileContents.replace(regex, (_, prefix, url, suffix) => `${prefix}${ASSETS_BASE_PATH}${url}${suffix}`);
  }

  /**
   * Adds the file text to the form.
   * @param form the html form you are appending to
   * @param data example metadata about the example
   * @param content file contents
   * @param filename file name of the example
   * @param path path to the src
   * @param isTest whether file is part of a test example
   * @param prependApp whether to prepend the 'app' prefix to the path
   */
  _addFileToForm(form: HTMLFormElement,
                 data: ExampleData,
                 content: string,
                 filename: string,
                 path: string,
                 isTest: boolean,
                 prependApp = true) {
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
   * e.g. "<button-example>" and "ButtonExample"
   */
  _replaceExamplePlaceholderNames(data: ExampleData,
                                  fileName: string,
                                  fileContent: string): string {
    if (fileName === 'src/index.html') {
      // Replace the component selector in `index,html`.
      // For example, <aquila-docs-example></aquila-docs-example> will be replaced as
      // <button-example></button-example>
      fileContent = fileContent.replace(/aquila-docs-example/g, data.selectorName);
      fileContent = fileContent.replace(/{{version}}/g, aquilaVersion);
    } else if (fileName === 'src/main.ts') {
      const joinedComponentNames = data.componentNames.join(', ');
      // Replace the component name in `main.ts`.
      // Replace `import { AquilaDocsExampleComponent } from 'aquila-docs-example'`
      // will be replaced as `import { ButtonExampleComponent } from './button-example'`
      fileContent = fileContent.replace(/{ AquilaDocsExample }/g, `{ ${joinedComponentNames} }`);

      // Replace `declarations: [AquilaDocsExample]`
      // will be replaced as `declarations: [ButtonExampleComponent]`
      fileContent = fileContent.
        replace(/declarations: \[AquilaDocsExample]/g,
          `declarations: [${joinedComponentNames}]`);

      // Replace `entryComponents: [AquilaDocsExample]`
      // will be replaced as `entryComponents: [ButtonExampleComponent]`
      fileContent = fileContent.
        replace(/entryComponents: \[AquilaDocsExample]/g,
          `entryComponents: [${joinedComponentNames}]`);

      // Replace `bootstrap: [AquilaDocsExample]`
      // will be replaced as `bootstrap: [ButtonExampleComponent]`
      // This assumes the first component listed in the main component
      fileContent = fileContent.
        replace(/bootstrap: \[AquilaDocsExample]/g,
          `bootstrap: [${data.componentNames[0]}]`);

      // Replace import ... from `aquila-docs-example`
      // will be replaced as `button-example`
      const dotIndex = data.indexFilename.lastIndexOf('.');
      const importFileName = data.indexFilename.slice(0, dotIndex === -1 ? undefined : dotIndex);
      fileContent = fileContent.replace(/aquila-docs-example/g, importFileName);
    }
    return fileContent;
  }

  _appendCopyright(filename: string, content: string) {
    if (filename.indexOf('.ts') > -1 || filename.indexOf('.scss') > -1) {
      content = `${content}\n\n/**  ${COPYRIGHT} */`;
    } else if (filename.indexOf('.html') > -1) {
      content = `${content}\n\n<!-- ${COPYRIGHT} -->`;
    }
    return content;
  }
}

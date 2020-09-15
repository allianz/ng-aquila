export const generateExampleModule = ({imports = '', components = '', examples = '', exampleSharedModule = null, routes = ''}) => {

return `
/* tslint:disable */
/** DO NOT MANUALLY EDIT THIS FILE, IT IS GENERATED VIA NPM 'build-examples-module' */
// This file should contain all required modules we are consuming in the examples

${exampleSharedModule ? `import { ExamplesSharedModule } from '${exampleSharedModule}'` : ``}

import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NX_EXAMPLES_TOKEN, ExampleFullScreenComponent } from '@aposin/ngx-docs-ui';
import { RouterModule, ROUTES } from '@angular/router';

${imports}

export interface ComponentExample {
  id: string;
  title: string;
  component: any;
}

export const EXAMPLES: {[key: string]: ComponentExample} = {
  ${components}
};

export const EXAMPLE_LIST = [
  ${examples}
];

export const EXAMPLE_ROUTES = [
  {
    path: 'examples',
    component: ExampleFullScreenComponent,
    children: [${routes}]
  }
];

@NgModule({
    declarations: EXAMPLE_LIST,
    entryComponents: EXAMPLE_LIST,
    imports: [
      ExamplesSharedModule,
      CommonModule,
      RouterModule
    ],
    exports: [
      RouterModule,
      ExamplesSharedModule
    ]
})
export class ExampleModule {
  static forRoot(): ModuleWithProviders<ExampleModule> {
    return {
      ngModule: ExampleModule,
      providers: [
        { provide: NX_EXAMPLES_TOKEN, useValue: EXAMPLES },
        { provide: ROUTES, useValue: EXAMPLE_ROUTES, multi: true }
      ]
    };
  }
}
`};

import { NxActionModule } from '@allianz/ng-aquila/action';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxTreeModule } from '@allianz/ng-aquila/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TreeExampleComponent } from './tree/tree-example';
import { TreeA1ExampleComponent } from './tree-a1/tree-a1-example';

import { TreeWithCheckboxesExampleComponent } from './tree-with-checkboxes/tree-with-checkboxes-example';

const EXAMPLES = [TreeExampleComponent, TreeA1ExampleComponent];

@NgModule({
  imports: [
    NxTreeModule,
    NxIconModule,
    NxActionModule,
    RouterModule,
    CommonModule,
    EXAMPLES,
  ],
  exports: [EXAMPLES],
})
export class TreeExamplesModule {
  static components() {
    return {
      tree: TreeExampleComponent,
      'tree-with-checkboxes': TreeWithCheckboxesExampleComponent,
      'tree-a1': TreeA1ExampleComponent,
    };
  }
}

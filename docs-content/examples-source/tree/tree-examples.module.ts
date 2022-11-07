import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxTreeModule } from '@aposin/ng-aquila/tree';

import { TreeExampleComponent } from './tree/tree-example';

const EXAMPLES = [TreeExampleComponent];

@NgModule({
    imports: [
        NxTreeModule,
        NxIconModule,
        NxActionModule,
        RouterModule,
        CommonModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class TreeExamplesModule {
    static components() {
        return {
            tree: TreeExampleComponent,
        };
    }
}

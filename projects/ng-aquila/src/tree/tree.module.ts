import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxTreeNodeActionItem } from './action-item.directive';
import { NxTreeNodeComponent, NxTreeNodeDefDirective } from './node';
import { NxTreeNodeOutletDirective } from './outlet';
import { NxTreeNodePaddingDirective } from './padding';
import { NxTreeNodeToggleDirective } from './toggle';
import { NxTreeComponent } from './tree.component';

@NgModule({
    imports: [CdkTreeModule, CommonModule],
    declarations: [
        NxTreeComponent,
        NxTreeNodeComponent,
        NxTreeNodeDefDirective,
        NxTreeNodePaddingDirective,
        NxTreeNodeToggleDirective,
        NxTreeNodeOutletDirective,
        NxTreeNodeActionItem,
    ],
    exports: [
        NxTreeComponent,
        NxTreeNodeComponent,
        NxTreeNodeDefDirective,
        NxTreeNodePaddingDirective,
        NxTreeNodeToggleDirective,
        NxTreeNodeOutletDirective,
        NxTreeNodeActionItem,
    ],
})
export class NxTreeModule {}

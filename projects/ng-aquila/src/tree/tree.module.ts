import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxTreeComponent } from './tree.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NxTreeNodeComponent, NxTreeNodeDefDirective } from './node';
import { NxTreeNodePaddingDirective } from './padding';
import { NxTreeNodeToggleDirective } from './toggle';
import { NxTreeNodeOutletDirective } from './outlet';

@NgModule({
  imports: [ CdkTreeModule, CommonModule ],
  declarations: [ NxTreeComponent, NxTreeNodeComponent, NxTreeNodeDefDirective,
    NxTreeNodePaddingDirective, NxTreeNodeToggleDirective, NxTreeNodeOutletDirective],
  exports: [ NxTreeComponent, NxTreeNodeComponent, NxTreeNodeDefDirective,
    NxTreeNodePaddingDirective, NxTreeNodeToggleDirective, NxTreeNodeOutletDirective]
})
export class NxTreeModule { }

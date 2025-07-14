import { NxErrorModule, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxCheckboxComponent, NxCheckboxGroupComponent } from './checkbox.component';

@NgModule({
  exports: [NxCheckboxComponent, NxCheckboxGroupComponent, NxLabelModule, NxErrorModule],
  imports: [
    CommonModule,
    NxIconModule,
    ObserversModule,
    NxCheckboxComponent,
    NxCheckboxGroupComponent,
  ],
})
export class NxCheckboxModule {}

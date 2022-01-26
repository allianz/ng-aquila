import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxCheckboxComponent, NxCheckboxGroupComponent } from './checkbox.component';

@NgModule({
    declarations: [NxCheckboxComponent, NxCheckboxGroupComponent],
    exports: [NxCheckboxComponent, NxCheckboxGroupComponent, NxLabelModule, NxErrorModule],
    imports: [CommonModule, NxIconModule, ObserversModule],
})
export class NxCheckboxModule {}

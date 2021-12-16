import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxCheckboxComponent } from './checkbox.component';
import { NxCheckboxGroupComponent } from './checkbox.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
    declarations: [NxCheckboxComponent, NxCheckboxGroupComponent],
    exports: [NxCheckboxComponent, NxCheckboxGroupComponent, NxLabelModule, NxErrorModule],
    imports: [CommonModule, NxIconModule, ObserversModule],
})
export class NxCheckboxModule {}

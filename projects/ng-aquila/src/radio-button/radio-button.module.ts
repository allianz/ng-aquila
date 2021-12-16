import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxRadioComponent } from './radio-button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxRadioGroupComponent } from './radio-button';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
    declarations: [NxRadioComponent, NxRadioGroupComponent],
    exports: [NxRadioComponent, NxRadioGroupComponent, NxErrorModule, NxLabelModule],
    imports: [CommonModule, NxIconModule, ObserversModule],
})
export class NxRadioModule {}

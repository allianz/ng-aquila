import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxRadioComponent, NxRadioGroupComponent } from './radio-button';

@NgModule({
    exports: [NxRadioComponent, NxRadioGroupComponent, NxErrorModule, NxLabelModule],
    imports: [CommonModule, NxIconModule, ObserversModule, NxRadioComponent, NxRadioGroupComponent],
})
export class NxRadioModule {}

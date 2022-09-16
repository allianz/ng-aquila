import { NxErrorModule, NxLabelModule } from '@allianz/ng-aquila/base';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxRadioComponent, NxRadioGroupComponent } from './radio-button';

@NgModule({
    declarations: [NxRadioComponent, NxRadioGroupComponent],
    exports: [NxRadioComponent, NxRadioGroupComponent, NxErrorModule, NxLabelModule],
    imports: [CommonModule, NxIconModule, ObserversModule],
})
export class NxRadioModule {}

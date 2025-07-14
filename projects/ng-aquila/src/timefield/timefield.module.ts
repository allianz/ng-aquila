import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@allianz/ng-aquila/radio-toggle';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NxTimefieldComponent, NxTimefieldControl } from './timefield.component';
import { NxTimefieldOption } from './timefield-option';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NxRadioModule,
    NxIconModule,
    NxButtonModule,
    OverlayModule,
    NxRadioToggleModule,
    A11yModule,
    NxFormfieldModule,
    NxInputModule,
    ReactiveFormsModule,
    NxTimefieldOption,
    NxTimefieldControl,
    NxTimefieldComponent,
  ],
  exports: [NxTimefieldComponent],
  providers: [],
})
export class NxTimefieldModule {}

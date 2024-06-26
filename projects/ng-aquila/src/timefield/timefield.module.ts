import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';
import { NxRadioToggleModule } from '@aposin/ng-aquila/radio-toggle';

import { NxTimefieldComponent, NxTimefieldControl } from './timefield.component';
import { NxTimefieldIntl } from './timefield-intl';
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
    ],
    declarations: [NxTimefieldComponent],
    exports: [NxTimefieldComponent],
    providers: [NxTimefieldIntl],
})
export class NxTimefieldModule {}

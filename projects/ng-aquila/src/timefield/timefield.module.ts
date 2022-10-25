import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxRadioModule } from '@aposin/ng-aquila/radio-button';

import { NxTimefieldComponent } from './timefield.component';
import { NxTimefieldIntl } from './timefield-intl';

@NgModule({
    imports: [CommonModule, FormsModule, NxRadioModule],
    declarations: [NxTimefieldComponent],
    exports: [NxTimefieldComponent],
    providers: [NxTimefieldIntl],
})
export class NxTimefieldModule {}

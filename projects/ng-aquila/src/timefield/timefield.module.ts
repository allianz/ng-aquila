import { NxRadioModule } from '@allianz/ng-aquila/radio-button';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxTimefieldComponent } from './timefield.component';
import { NxTimefieldIntl } from './timefield-intl';

@NgModule({
    imports: [CommonModule, FormsModule, NxRadioModule],
    declarations: [NxTimefieldComponent],
    exports: [NxTimefieldComponent],
    providers: [NxTimefieldIntl],
})
export class NxTimefieldModule {}

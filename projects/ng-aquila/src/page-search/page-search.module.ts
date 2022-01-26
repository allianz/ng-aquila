import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxAutocompleteModule } from '@aposin/ng-aquila/autocomplete';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';

import { NxPageSearchComponent } from './page-search.component';

@NgModule({
    imports: [CommonModule, NxAutocompleteModule, NxFormfieldModule, NxButtonModule, NxGridModule],
    declarations: [NxPageSearchComponent],
    exports: [NxPageSearchComponent],
})
export class NxPageSearchModule {}

import { NxAutocompleteModule } from '@allianz/ng-aquila/autocomplete';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxPageSearchComponent } from './page-search.component';

/**
 * @deprecated This module is deprecated. Use `nxInput` or `nxAutocomplete` inside an `nx-formfield` with a search icon or button instead.
 * @deletion-target 23.0.0
 */
@NgModule({
  imports: [
    CommonModule,
    NxAutocompleteModule,
    NxFormfieldModule,
    NxButtonModule,
    NxGridModule,
    NxPageSearchComponent,
  ],
  exports: [NxPageSearchComponent],
})
export class NxPageSearchModule {}

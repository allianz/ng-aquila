import { NxGridModule } from '@aposin/ng-aquila/grid';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NxAutocompleteModule} from '@aposin/ng-aquila/autocomplete';
import {NxFormfieldModule} from '@aposin/ng-aquila/formfield';
import {NxPageSearchComponent} from './page-search.component';
import {NxButtonModule} from '@aposin/ng-aquila/button';

@NgModule({
  imports: [
    CommonModule,
    NxAutocompleteModule,
    NxFormfieldModule,
    NxButtonModule,
    NxGridModule
  ],
  declarations: [
    NxPageSearchComponent
  ],
  exports: [
    NxPageSearchComponent
  ]
})
export class NxPageSearchModule {

}

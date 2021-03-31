import { NxInputModule } from '@aposin/ng-aquila/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxPhoneInputComponent } from './phone-input.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    NxDropdownModule,
    CommonModule,
    FormsModule,
    NxInputModule
  ],
  exports: [
    NxPhoneInputComponent,
    NxFormfieldModule
  ],
  declarations: [NxPhoneInputComponent],
  providers: [],
})
export class NxPhoneInputModule { }

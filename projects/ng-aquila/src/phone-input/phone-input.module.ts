import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxPhoneInputComponent } from './phone-input.component';

@NgModule({
    imports: [NxDropdownModule, CommonModule, FormsModule, NxInputModule],
    exports: [NxPhoneInputComponent, NxFormfieldModule],
    declarations: [NxPhoneInputComponent],
    providers: [],
})
export class NxPhoneInputModule {}

import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxPhoneInputComponent } from './phone-input.component';

@NgModule({
    imports: [NxDropdownModule, CommonModule, FormsModule, NxInputModule],
    exports: [NxPhoneInputComponent, NxFormfieldModule],
    declarations: [NxPhoneInputComponent],
    providers: [],
})
export class NxPhoneInputModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxInputModule } from '@aposin/ng-aquila/input';

import { NxvSearchInputComponent } from './search-input.component';

@NgModule({
    imports: [CommonModule, FormsModule, NxInputModule, NxvSearchInputComponent],
    exports: [NxvSearchInputComponent],
    providers: [],
})
export class NxvSearchInputModule {}

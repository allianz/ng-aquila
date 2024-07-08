import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NxCodeInputComponent } from './code-input.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NxCodeInputComponent],
    exports: [NxCodeInputComponent],
    providers: [],
})
export class NxCodeInputModule {}

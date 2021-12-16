import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxFormfieldErrorDirective } from './error.directive';
import { NxFormfieldComponent } from './formfield.component';
import { NxFormfieldHintDirective } from './hint.directive';
import { NxFormfieldNoteDirective } from './note.directive';
import { NxFormfieldPrefixDirective } from './prefix.directive';
import { NxFormfieldSuffixDirective } from './suffix.directive';
import { NxFormfieldAppendixDirective } from './appendix.directive';
import { NxFormfieldLabelDirective } from './label.directive';
import { NxErrorModule, NxLabelModule } from '@aposin/ng-aquila/base';

@NgModule({
    imports: [CommonModule],
    declarations: [NxFormfieldComponent, NxFormfieldHintDirective, NxFormfieldErrorDirective, NxFormfieldNoteDirective, NxFormfieldPrefixDirective, NxFormfieldSuffixDirective, NxFormfieldAppendixDirective, NxFormfieldLabelDirective],
    exports: [
        NxFormfieldComponent,
        NxFormfieldHintDirective,
        NxFormfieldErrorDirective,
        NxFormfieldNoteDirective,
        NxFormfieldPrefixDirective,
        NxFormfieldSuffixDirective,
        NxFormfieldAppendixDirective,
        NxFormfieldLabelDirective,
        NxErrorModule,
        NxLabelModule,
    ],
})
export class NxFormfieldModule {}

import { NxErrorModule, NxLabelModule } from '@allianz/ng-aquila/base';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxFormfieldAppendixDirective } from './appendix.directive';
import { NxFormfieldErrorDirective } from './error.directive';
import { NxFormfieldComponent } from './formfield.component';
import { NxFormfieldHintDirective } from './hint.directive';
import { NxFormfieldLabelDirective } from './label.directive';
import { NxFormfieldNoteDirective } from './note.directive';
import { NxFormfieldPrefixDirective } from './prefix.directive';
import { NxFormfieldSuffixDirective } from './suffix.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        NxFormfieldComponent,
        NxFormfieldHintDirective,
        NxFormfieldErrorDirective,
        NxFormfieldNoteDirective,
        NxFormfieldPrefixDirective,
        NxFormfieldSuffixDirective,
        NxFormfieldAppendixDirective,
        NxFormfieldLabelDirective,
    ],
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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { NxNaturalLanguageFormComponent } from './natural-language-form.component';
import { NxWordComponent } from './word.component';

@NgModule({
    imports: [CommonModule, NxInputModule, NxPopoverModule],
    declarations: [NxNaturalLanguageFormComponent, NxWordComponent],
    exports: [NxNaturalLanguageFormComponent, NxWordComponent],
})
export class NxNaturalLanguageFormModule {}

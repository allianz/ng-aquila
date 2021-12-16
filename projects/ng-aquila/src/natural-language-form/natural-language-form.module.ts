import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxWordComponent } from './word.component';
import { NxNaturalLanguageFormComponent } from './natural-language-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, NxInputModule, NxPopoverModule],
    declarations: [NxNaturalLanguageFormComponent, NxWordComponent],
    exports: [NxNaturalLanguageFormComponent, NxWordComponent],
})
export class NxNaturalLanguageFormModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { A11ySkipToDataDescriptionComponent } from './a11y-skip-to-data-description/a11y-skip-to-data-description-example';
import { AiAutofillExampleComponent } from './ai-autofill/ai-autofill-example';
import { ContainedListExampleComponent } from './contained-list/contained-list-example';
import { DropdownFetchOnFilterComponent } from './dropdown-fetch-on-filter/dropdown-fetch-on-filter-example';
import { TextAreaCharacterLimitExampleComponent } from './text-area-character-limit/text-area-character-limit-example';

const EXAMPLES = [
  TextAreaCharacterLimitExampleComponent,
  AiAutofillExampleComponent,
  A11ySkipToDataDescriptionComponent,
  DropdownFetchOnFilterComponent,
];

@NgModule({
  imports: [CommonModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class PatternExamplesModule {
  static components() {
    return {
      'text-area-character-limit': TextAreaCharacterLimitExampleComponent,
      'ai-autofill': AiAutofillExampleComponent,
      'a11y-skip-to-data-description': A11ySkipToDataDescriptionComponent,
      'dropdown-fetch-on-filter': DropdownFetchOnFilterComponent,
      'contained-list': ContainedListExampleComponent,
    };
  }
}

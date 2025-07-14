import { NgModule } from '@angular/core';

import { TimefieldCustomValidationExampleComponent } from './timefield-custom-validation/timefield-custom-validation-example';
import { TimefieldDefaultExampleComponent } from './timefield-default/timefield-default-example';
import { TimefieldDisabledExampleComponent } from './timefield-disabled/timefield-disabled-example';
import { TimefieldExpertExampleComponent } from './timefield-expert/timefield-expert-example';
import { TimefieldFormatTogglerExampleComponent } from './timefield-format-toggler/timefield-format-toggler-example';
import { TimefieldLocalizeExampleComponent } from './timefield-localize/timefield-localize-example';
import { TimefieldNegativeExampleComponent } from './timefield-negative/timefield-negative-example';
import { TimefieldOptionsIntervalExampleComponent } from './timefield-options-interval/timefield-options-interval-example';
import { TimefieldReactiveExampleComponent } from './timefield-reactive/timefield-reactive-example';
import { TimefieldTemplateDrivenExampleComponent } from './timefield-template-driven/timefield-template-driven-example';
import { TimefieldWithInputmode } from './timefield-with-inputmode/timefield-with-inputmode-example';
import { TimefieldWithTimepickerExampleComponent } from './timefield-with-timepicker/timefield-with-timepicker-example';
import { TimefieldWithTimepickerGlobalExampleComponent } from './timefield-with-timepicker-global/timefield-with-timepicker-global-example';

const EXAMPLES = [
  TimefieldExpertExampleComponent,
  TimefieldDisabledExampleComponent,
  TimefieldFormatTogglerExampleComponent,
  TimefieldLocalizeExampleComponent,
  TimefieldNegativeExampleComponent,
  TimefieldReactiveExampleComponent,
  TimefieldTemplateDrivenExampleComponent,
  TimefieldOptionsIntervalExampleComponent,
  TimefieldCustomValidationExampleComponent,
];

@NgModule({
  imports: [EXAMPLES],
  exports: [EXAMPLES],
})
export class TimefieldExamplesModule {
  static components() {
    return {
      'timefield-expert': TimefieldExpertExampleComponent,
      'timefield-disabled': TimefieldDisabledExampleComponent,
      'timefield-format-toggler': TimefieldFormatTogglerExampleComponent,
      'timefield-localize': TimefieldLocalizeExampleComponent,
      'timefield-negative': TimefieldNegativeExampleComponent,
      'timefield-reactive': TimefieldReactiveExampleComponent,
      'timefield-template-driven': TimefieldTemplateDrivenExampleComponent,
      'timefield-options-interval': TimefieldOptionsIntervalExampleComponent,
      'timefield-default': TimefieldDefaultExampleComponent,
      'timefield-with-timepicker': TimefieldWithTimepickerExampleComponent,
      'timefield-with-timepicker-global':
        TimefieldWithTimepickerGlobalExampleComponent,
      'timefield-custom-validation': TimefieldCustomValidationExampleComponent,
      'timefield-with-inputmode': TimefieldWithInputmode,
    };
  }
}

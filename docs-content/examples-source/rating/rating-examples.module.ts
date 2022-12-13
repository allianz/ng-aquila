import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NxRatingModule } from '@aposin/ng-aquila/rating';

import { RatingAccessibilityExampleComponent } from './rating-accessibility/rating-accessibility-example';
import { RatingBasicExampleComponent } from './rating-basic/rating-basic-example';
import { RatingDisabledExampleComponent } from './rating-disabled/rating-disabled-example';
import { RatingNegativeExampleComponent } from './rating-negative/rating-negative-example';
import { RatingReactiveExampleComponent } from './rating-reactive/rating-reactive-example';
import { RatingSimpleExampleComponent } from './rating-simple/rating-simple-example';
import { RatingSizesExampleComponent } from './rating-sizes/rating-sizes-example';
import { RatingTemplateExampleComponent } from './rating-template/rating-template-example';

const EXAMPLES = [
    RatingAccessibilityExampleComponent,
    RatingBasicExampleComponent,
    RatingDisabledExampleComponent,
    RatingNegativeExampleComponent,
    RatingReactiveExampleComponent,
    RatingSimpleExampleComponent,
    RatingTemplateExampleComponent,
    RatingSizesExampleComponent,
];

@NgModule({
    imports: [NxRatingModule, ReactiveFormsModule, FormsModule, CommonModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class RatingExamplesModule {
    static components() {
        return {
            'rating-accessibility': RatingAccessibilityExampleComponent,
            'rating-basic': RatingBasicExampleComponent,
            'rating-disabled': RatingDisabledExampleComponent,
            'rating-negative': RatingNegativeExampleComponent,
            'rating-reactive': RatingReactiveExampleComponent,
            'rating-simple': RatingSimpleExampleComponent,
            'rating-template': RatingTemplateExampleComponent,
            'rating-sizes': RatingSizesExampleComponent,
        };
    }
}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxIndicatorModule } from '@aposin/ng-aquila/indicator';

import { AnchorButtonExampleComponent } from './anchor-button/anchor-button-example';
import { ButtonExampleComponent } from './button/button-example';
import { ButtonBlockExampleComponent } from './button-block/button-block-example';
import { ButtonDangerExampleComponent } from './button-danger/button-danger-example';
import { ButtonIconExampleComponent } from './button-icon/button-icon-example';
import { ButtonIconIndicatorExampleComponent } from './button-icon-indicator/button-icon-indicator-example';
import { ButtonLargeExampleComponent } from './button-large/button-large-example';
import { ButtonMediumExampleComponent } from './button-medium/button-medium-example';
import { ButtonNegativeExampleComponent } from './button-negative/button-negative-example';
import { ButtonPlainExampleComponent } from './button-plain/button-plain-example';
import { ButtonPlainA1ExampleComponent } from './button-plain-a1/button-plain-a1-example';
import { ButtonSmallExampleComponent } from './button-small/button-small-example';
import { ButtonSmallMediumExampleComponent } from './button-small-medium/button-small-medium-example';
import { ButtonWithIconExampleComponent } from './button-with-icon/button-with-icon-example';

const EXAMPLES = [
    ButtonExampleComponent,
    ButtonBlockExampleComponent,
    ButtonDangerExampleComponent,
    ButtonIconExampleComponent,
    ButtonLargeExampleComponent,
    ButtonMediumExampleComponent,
    ButtonNegativeExampleComponent,
    ButtonPlainExampleComponent,
    ButtonSmallExampleComponent,
    ButtonSmallMediumExampleComponent,
    ButtonWithIconExampleComponent,
    ButtonIconIndicatorExampleComponent,
    AnchorButtonExampleComponent,
    ButtonPlainA1ExampleComponent,
];

@NgModule({
    imports: [
        NxButtonModule,
        CommonModule,
        NxIconModule,
        NxIndicatorModule,
        NxHeadlineModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ButtonExamplesModule {
    static components() {
        return {
            button: ButtonExampleComponent,
            'button-block': ButtonBlockExampleComponent,
            'button-danger': ButtonDangerExampleComponent,
            'button-icon': ButtonIconExampleComponent,
            'button-large': ButtonLargeExampleComponent,
            'button-medium': ButtonMediumExampleComponent,
            'button-negative': ButtonNegativeExampleComponent,
            'button-plain': ButtonPlainExampleComponent,
            'button-small': ButtonSmallExampleComponent,
            'button-small-medium': ButtonSmallMediumExampleComponent,
            'button-with-icon': ButtonWithIconExampleComponent,
            'button-icon-indicator': ButtonIconIndicatorExampleComponent,
            'anchor-button': AnchorButtonExampleComponent,
            'button-plain-a1': ButtonPlainA1ExampleComponent,
        };
    }
}

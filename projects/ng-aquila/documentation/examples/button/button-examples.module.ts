import { NxIconModule } from '@aposin/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NxButtonModule } from '@aposin/ng-aquila/button';

import { NgModule } from '@angular/core';
import { ButtonExampleComponent } from './button/button-example';
import { ButtonBlockExampleComponent } from './button-block/button-block-example';
import { ButtonDangerExampleComponent } from './button-danger/button-danger-example';
import { ButtonIconExampleComponent } from './button-icon/button-icon-example';
import { ButtonLargeExampleComponent } from './button-large/button-large-example';
import { ButtonMediumExampleComponent } from './button-medium/button-medium-example';
import { ButtonNegativeExampleComponent } from './button-negative/button-negative-example';
import { ButtonPlainExampleComponent } from './button-plain/button-plain-example';
import { ButtonSmallExampleComponent } from './button-small/button-small-example';
import { ButtonSmallMediumExampleComponent } from './button-small-medium/button-small-medium-example';
import { ButtonWithIconExampleComponent } from './button-with-icon/button-with-icon-example';
import { LazyLoadedModule } from '../../lazy-loaded-module';

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
  ButtonWithIconExampleComponent
];

 @NgModule({
  imports: [NxButtonModule, CommonModule, NxIconModule ],
  declarations: [EXAMPLES],
  exports: [EXAMPLES]
})
export class ButtonExamplesModule implements LazyLoadedModule {
  static components() {
    return {
      'button': ButtonExampleComponent,
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
    };
  }
}

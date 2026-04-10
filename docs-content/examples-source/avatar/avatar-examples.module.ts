import { NxAvatarModule } from '@allianz/ng-aquila/avatar';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxImageModule } from '@allianz/ng-aquila/image';
import { NgModule } from '@angular/core';

import { AvatarExampleComponent } from './avatar/avatar-example';
import { AvatarAccentColorsExampleComponent } from './avatar-accent-colors/avatar-accent-colors-example';
import { AvatarButtonExampleComponent } from './avatar-button/avatar-button-example';
import { AvatarColorsExampleComponent } from './avatar-colors/avatar-colors-example';
import { AvatarDisabledExampleComponent } from './avatar-disabled/avatar-disabled-example';
import { AvatarSizeExampleComponent } from './avatar-size/avatar-size-example';
import { AvatarSizeA1ExampleComponent } from './avatar-size-a1/avatar-size-a1-example';

const EXAMPLES = [
  AvatarExampleComponent,
  AvatarButtonExampleComponent,
  AvatarSizeExampleComponent,
  AvatarSizeA1ExampleComponent,
  AvatarColorsExampleComponent,
  AvatarAccentColorsExampleComponent,
  AvatarDisabledExampleComponent,
];

@NgModule({
  imports: [NxAvatarModule, NxIconModule, NxImageModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class AvatarExamplesModule {
  static components() {
    return {
      avatar: AvatarExampleComponent,
      'avatar-button': AvatarButtonExampleComponent,
      'avatar-size': AvatarSizeExampleComponent,
      'avatar-size-a1': AvatarSizeA1ExampleComponent,
      'avatar-colors': AvatarColorsExampleComponent,
      'avatar-accent-colors': AvatarAccentColorsExampleComponent,
      'avatar-disabled': AvatarDisabledExampleComponent,
    };
  }
}

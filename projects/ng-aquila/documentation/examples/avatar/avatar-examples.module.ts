import { NxAvatarModule } from '@allianz/ng-aquila/avatar';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxImageModule } from '@allianz/ng-aquila/image';
import { NgModule } from '@angular/core';

import { AvatarExampleComponent } from './avatar/avatar-example';
import { AvatarButtonExampleComponent } from './avatar-button/avatar-button-example';
import { AvatarColorsExampleComponent } from './avatar-colors/avatar-colors-example';
import { AvatarSizeExampleComponent } from './avatar-size/avatar-size-example';

const EXAMPLES = [
  AvatarExampleComponent,
  AvatarButtonExampleComponent,
  AvatarSizeExampleComponent,
  AvatarColorsExampleComponent,
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
      'avatar-colors': AvatarColorsExampleComponent,
    };
  }
}

import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NgModule } from '@angular/core';

import { BadgeExampleComponent } from './badge/badge-example';
import { BadgeCharacterExampleComponent } from './badge-character/badge-character-example';
import { BadgeVibrantExampleComponent } from './badge-vibrant/badge-vibrant-example';

const EXAMPLES = [BadgeExampleComponent, BadgeVibrantExampleComponent];

@NgModule({
  imports: [NxBadgeModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class BadgeExamplesModule {
  static components() {
    return {
      badge: BadgeExampleComponent,
      'badge-vibrant': BadgeVibrantExampleComponent,
      'badge-character': BadgeCharacterExampleComponent,
    };
  }
}

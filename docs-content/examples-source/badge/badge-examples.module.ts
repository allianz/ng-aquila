import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NgModule } from '@angular/core';

import { BadgeExampleComponent } from './badge/badge-example';
import { BadgeAccentColorExampleComponent } from './badge-accent-color/badge-accent-color-example';
import { BadgeBrandExampleComponent } from './badge-brand/badge-brand-example';
import { BadgeCharacterExampleComponent } from './badge-character/badge-character-example';
import { BadgeCharacterNdbxExampleComponent } from './badge-character-ndbx/badge-character-ndbx-example';
import { BadgeDisabledExampleComponent } from './badge-disabled/badge-disabled-example';
import { BadgeInverseExampleComponent } from './badge-inverse/badge-inverse-example';
import { BadgeProminenceExampleComponent } from './badge-prominence/badge-prominence-example';
import { BadgeVibrantExampleComponent } from './badge-vibrant/badge-vibrant-example';

const EXAMPLES = [
  BadgeExampleComponent,
  BadgeVibrantExampleComponent,
  BadgeAccentColorExampleComponent,
  BadgeProminenceExampleComponent,
  BadgeBrandExampleComponent,
  BadgeDisabledExampleComponent,
  BadgeInverseExampleComponent,
  BadgeCharacterNdbxExampleComponent,
];

@NgModule({
  imports: [NxBadgeModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class BadgeExamplesModule {
  static components() {
    return {
      badge: BadgeExampleComponent,
      'badge-vibrant': BadgeVibrantExampleComponent,
      'badge-prominence': BadgeProminenceExampleComponent,
      'badge-brand': BadgeBrandExampleComponent,
      'badge-character': BadgeCharacterExampleComponent,
      'badge-character-ndbx': BadgeCharacterNdbxExampleComponent,
      'badge-accent-color': BadgeAccentColorExampleComponent,
      'badge-disabled': BadgeDisabledExampleComponent,
      'badge-inverse': BadgeInverseExampleComponent,
    };
  }
}

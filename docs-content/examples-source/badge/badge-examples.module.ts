import { NxBadgeModule } from '@allianz/ng-aquila/badge';
import { NgModule } from '@angular/core';

import { BadgeExampleComponent } from './badge/badge-example';
import { BadgeCharacterExampleComponent } from './badge-character/badge-character-example';
import { BadgeVibrantExampleComponent } from './badge-vibrant/badge-vibrant-example';
import { BadgeColorSchemeExampleComponent } from './badge-color-scheme/badge-color-scheme-example';
import { BadgeProminenceExampleComponent } from './badge-prominence/badge-prominence-example';
import { BadgeBrandExampleComponent } from './badge-brand/badge-brand-example';
import { BadgeDisabledExampleComponent } from './badge-disabled/badge-disabled-example';
import { BadgeInverseExampleComponent } from './badge-inverse/badge-inverse-example';
import { BadgeCharacterNdbxExampleComponent } from './badge-character-ndbx/badge-character-ndbx-example';

const EXAMPLES = [
  BadgeExampleComponent,
  BadgeVibrantExampleComponent,
  BadgeColorSchemeExampleComponent,
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
      'badge-color-scheme': BadgeColorSchemeExampleComponent,
      'badge-disabled': BadgeDisabledExampleComponent,
      'badge-inverse': BadgeInverseExampleComponent,
    };
  }
}

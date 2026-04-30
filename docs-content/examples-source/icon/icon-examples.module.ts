import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IconAttentionColorsExampleComponent } from './icon-attention-colors/icon-attention-colors-example';
import { IconContainedExampleComponent } from './icon-contained/icon-contained-example';
import { IconContainedSizesExampleComponent } from './icon-contained-sizes/icon-contained-sizes-example';
import { IconEmphasisExampleComponent } from './icon-emphasis/icon-emphasis-example';
import { IconEssentialIconsExampleComponent } from './icon-essential-icons/icon-essential-icons-example';
import { IconEssentialOverrideExampleComponent } from './icon-essential-override/icon-essential-override-example';
import { IconFilledExampleComponent } from './icon-filled/icon-filled-example';
import { IconGeneralExampleComponent } from './icon-general/icon-general-example';
import { IconOutlineExampleComponent } from './icon-outline/icon-outline-example';
import { IconRegistryExampleComponent } from './icon-registry/icon-registry-example';
import { IconSizesExampleComponent } from './icon-sizes/icon-sizes-example';
import { IconTypeExampleComponent } from './icon-type/icon-type-example';
import { StatusIconExampleComponent } from './status-icon/status-icon-example';
import { StatusIconSizesExampleComponent } from './status-icon-sizes/status-icon-sizes-example';

const EXAMPLES = [
  IconEssentialIconsExampleComponent,
  IconEssentialOverrideExampleComponent,
  IconFilledExampleComponent,
  IconGeneralExampleComponent,
  IconOutlineExampleComponent,
  IconRegistryExampleComponent,
  IconAttentionColorsExampleComponent,
  IconTypeExampleComponent,
  IconEmphasisExampleComponent,
  IconContainedExampleComponent,
  IconContainedSizesExampleComponent,
  IconSizesExampleComponent,
  StatusIconExampleComponent,
  StatusIconSizesExampleComponent,
];

@NgModule({
  imports: [NxIconModule, CommonModule, NxHeadlineModule, EXAMPLES],
  exports: [EXAMPLES],
})
export class IconExamplesModule {
  static components() {
    return {
      'icon-attention-colors': IconAttentionColorsExampleComponent,
      'icon-essential-icons': IconEssentialIconsExampleComponent,
      'icon-essential-override': IconEssentialOverrideExampleComponent,
      'icon-filled': IconFilledExampleComponent,
      'icon-general': IconGeneralExampleComponent,
      'icon-outline': IconOutlineExampleComponent,
      'icon-registry': IconRegistryExampleComponent,
      'icon-sizes': IconSizesExampleComponent,
      'icon-type': IconTypeExampleComponent,
      'icon-emphasis': IconEmphasisExampleComponent,
      'icon-contained': IconContainedExampleComponent,
      'icon-contained-sizes': IconContainedSizesExampleComponent,
      'status-icon': StatusIconExampleComponent,
      'status-icon-sizes': StatusIconSizesExampleComponent,
    };
  }
}

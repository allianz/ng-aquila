import { NgModule } from '@angular/core';

import { NxAccentColorComponent } from './accent-color/accent-color.component';
import { NxBodyTextComponent } from './body-text/body-text.component';
import { NxUtilityTextComponent } from './utility-text/utility-text.component';

@NgModule({
  imports: [NxAccentColorComponent, NxBodyTextComponent, NxUtilityTextComponent],
  exports: [NxAccentColorComponent, NxBodyTextComponent, NxUtilityTextComponent],
})
export class NxTextModule {}

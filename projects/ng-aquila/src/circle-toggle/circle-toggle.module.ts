import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxCircleToggleComponent } from './circle-toggle/circle-toggle.component';
import { NxCircleToggleGroupComponent } from './circle-toggle-group/circle-toggle-group.component';
import { NxIconToggleButtonComponent } from './icon-toggle-button/icon-toggle-button.component';
import { NxMobileToggleButtonComponent } from './mobile-toggle-button/mobile-toggle-button.component';

@NgModule({
  exports: [
    NxCircleToggleGroupComponent,
    NxIconToggleButtonComponent,
    NxCircleToggleComponent,
    NxMobileToggleButtonComponent,
  ],
  imports: [
    CommonModule,
    NxIconModule,
    NxCircleToggleGroupComponent,
    NxCircleToggleComponent,
    NxIconToggleButtonComponent,
    NxMobileToggleButtonComponent,
  ],
})
export class NxCircleToggleModule {}

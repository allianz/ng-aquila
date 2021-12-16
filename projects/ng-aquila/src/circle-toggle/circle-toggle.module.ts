import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxCircleToggleGroupComponent } from './circle-toggle-group/circle-toggle-group.component';
import { NxCircleToggleComponent } from './circle-toggle/circle-toggle.component';
import { NxIconToggleButtonComponent } from './icon-toggle-button/icon-toggle-button.component';
import { NxMobileToggleButtonComponent } from './mobile-toggle-button/mobile-toggle-button.component';

@NgModule({
    declarations: [NxCircleToggleGroupComponent, NxCircleToggleComponent, NxIconToggleButtonComponent, NxMobileToggleButtonComponent],
    exports: [NxCircleToggleGroupComponent, NxIconToggleButtonComponent, NxCircleToggleComponent, NxMobileToggleButtonComponent],
    imports: [CommonModule, NxIconModule],
})
export class NxCircleToggleModule {}

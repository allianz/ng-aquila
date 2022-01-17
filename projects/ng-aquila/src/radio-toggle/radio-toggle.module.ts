import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxRadioToggleButtonComponent } from './radio-toggle-button.component';
import { NxRadioToggleComponent } from './radio-toggle.component';

@NgModule({
    declarations: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
    exports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
    imports: [CommonModule, FormsModule, NxIconModule],
})
export class NxRadioToggleModule {}

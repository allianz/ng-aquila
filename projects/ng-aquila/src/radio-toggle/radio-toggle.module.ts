import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxRadioToggleComponent } from './radio-toggle.component';
import { FormsModule } from '@angular/forms';
import { NxRadioToggleButtonComponent } from './radio-toggle-button.component';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
    declarations: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
    exports: [NxRadioToggleComponent, NxRadioToggleButtonComponent],
    imports: [CommonModule, FormsModule, NxIconModule],
})
export class NxRadioToggleModule {}

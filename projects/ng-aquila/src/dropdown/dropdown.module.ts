import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDropdownComponent } from './dropdown';
import { NxDropdownGroupComponent } from './group/dropdown-group';
import { NxDropdownItemComponent } from './item/dropdown-item';
import { ObserversModule } from '@angular/cdk/observers';
import { NxDropdownClosedLabelDirective } from './closed-label.directive';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxTooltipModule } from '@aposin/ng-aquila/tooltip';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxMultiSelectOptionComponent } from './multi-select/multi-select-option.component';
import { NxMultiSelectComponent } from './multi-select/multi-select.component';

@NgModule({
    imports: [CommonModule, NxFormfieldModule, NxCheckboxModule, OverlayModule, A11yModule, NxIconModule, ObserversModule, FormsModule, NxTooltipModule, NxButtonModule, NxInputModule],
    declarations: [NxDropdownComponent, NxDropdownItemComponent, NxDropdownGroupComponent, NxDropdownClosedLabelDirective, NxMultiSelectComponent, NxMultiSelectOptionComponent],
    exports: [NxDropdownComponent, NxDropdownItemComponent, NxDropdownGroupComponent, NxDropdownClosedLabelDirective, NxMultiSelectComponent],
})
export class NxDropdownModule {}

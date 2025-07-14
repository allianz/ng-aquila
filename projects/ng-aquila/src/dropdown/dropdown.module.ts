import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { A11yModule } from '@angular/cdk/a11y';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NxDropdownClosedLabelDirective } from './closed-label.directive';
import { NxDropdownComponent } from './dropdown';
import { NxDropdownGroupComponent } from './group/dropdown-group';
import { NxDropdownItemComponent } from './item/dropdown-item';
import { NxMultiSelectComponent } from './multi-select/multi-select.component';
import { NxMultiSelectAllComponent } from './multi-select/multi-select-all.component';
import { NxMultiSelectOptionComponent } from './multi-select/multi-select-option.component';

@NgModule({
  imports: [
    CommonModule,
    NxFormfieldModule,
    NxCheckboxModule,
    OverlayModule,
    A11yModule,
    NxIconModule,
    ObserversModule,
    FormsModule,
    NxTooltipModule,
    NxButtonModule,
    NxInputModule,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDropdownGroupComponent,
    NxDropdownClosedLabelDirective,
    NxMultiSelectComponent,
    NxMultiSelectOptionComponent,
    NxMultiSelectAllComponent,
  ],
  providers: [],
  exports: [
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDropdownGroupComponent,
    NxDropdownClosedLabelDirective,
    NxMultiSelectComponent,
  ],
})
export class NxDropdownModule {}

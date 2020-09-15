import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDropdownComponent } from './dropdown';
import { NxDropdownGroupComponent } from './group/dropdown-group';
import { NxDropdownItemComponent } from './item/dropdown-item';
import { ObserversModule } from '@angular/cdk/observers';
import { NxDropdownClosedLabelDirective } from './closed-label.directive';

@NgModule({
  imports: [
    CommonModule,
    NxFormfieldModule,
    NxCheckboxModule,
    OverlayModule,
    A11yModule,
    NxIconModule,
    ObserversModule
  ],
  declarations: [
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDropdownGroupComponent,
    NxDropdownClosedLabelDirective
  ],
  exports: [
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxDropdownGroupComponent,
    NxDropdownClosedLabelDirective
  ]
})
export class NxDropdownModule {

}

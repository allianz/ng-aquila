import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxCardComponent } from './card.component';
import { NxCardFooterComponent } from './card-footer.component';
import { NxCardHeaderComponent } from './card-header.component';
import { NxCardMainLinkDirective, NxCardSecondaryInfoDirective } from './card-link.directive';
import {
  NxSelectableCardComponent,
  NxSelectableCardGroupComponent,
} from './selectable-card.component';

@NgModule({
  exports: [
    NxCardComponent,
    NxSelectableCardComponent,
    NxCardHeaderComponent,
    NxCardFooterComponent,
    NxErrorModule,
    NxSelectableCardGroupComponent,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,
  ],
  imports: [
    CommonModule,
    NxIconModule,
    NxErrorModule,
    NxCheckboxModule,
    NxCardMainLinkDirective,
    NxCardSecondaryInfoDirective,
    NxCardComponent,
    NxSelectableCardComponent,
    NxCardHeaderComponent,
    NxCardFooterComponent,
    NxSelectableCardGroupComponent,
  ],
})
export class NxCardModule {}

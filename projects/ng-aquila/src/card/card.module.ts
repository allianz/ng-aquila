import {NgModule} from '@angular/core';
import {NxCardComponent} from './card.component';
import {CommonModule} from '@angular/common';
import { NxSelectableCardComponent } from './selectable-card.component';
import { NxCardHeaderComponent } from './card-header.component';
import { NxCardFooterComponent } from './card-footer.component';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';

@NgModule({
  declarations: [
    NxCardComponent,
    NxSelectableCardComponent,
    NxCardHeaderComponent,
    NxCardFooterComponent
  ],
  exports: [
    NxCardComponent,
    NxSelectableCardComponent,
    NxCardHeaderComponent,
    NxCardFooterComponent,
    NxErrorModule
  ],
  imports: [
    CommonModule,
    NxIconModule,
    NxErrorModule,
    NxCheckboxModule
  ]
})
export class NxCardModule { }

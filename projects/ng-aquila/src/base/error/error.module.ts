import {NgModule} from '@angular/core';
import {NxErrorComponent} from './error.component';
import {CommonModule} from '@angular/common';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxMessageModule } from '@aposin/ng-aquila/message';

@NgModule({
  imports: [
    CommonModule,
    NxIconModule,
    NxMessageModule
  ],
  declarations: [
    NxErrorComponent
  ],
  exports: [
    NxErrorComponent
  ]
})
export class NxErrorModule {

}

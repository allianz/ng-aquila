import { NgModule } from '@angular/core';
import { NxSwitcherComponent } from './switcher.component';
import { CommonModule } from '@angular/common';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import {ObserversModule} from '@angular/cdk/observers';

@NgModule({
  declarations: [ NxSwitcherComponent ],
  exports: [ NxSwitcherComponent ],
  imports: [ CommonModule, NxIconModule, ObserversModule ]
})
export class NxSwitcherModule {}

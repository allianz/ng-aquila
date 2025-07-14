import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxSwipebarComponent } from './swipebar.component';

@NgModule({
  exports: [NxSwipebarComponent],
  imports: [CommonModule, NxCopytextModule, NxSwipebarComponent],
})
export class NxSwipebarModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';

import { NxSwipebarComponent } from './swipebar.component';

@NgModule({
    exports: [NxSwipebarComponent],
    imports: [CommonModule, NxCopytextModule, NxSwipebarComponent],
})
export class NxSwipebarModule {}

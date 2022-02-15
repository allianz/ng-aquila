import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';

import { NxSwipebarComponent } from './swipebar.component';

@NgModule({
    declarations: [NxSwipebarComponent],
    exports: [NxSwipebarComponent],
    imports: [CommonModule, NxCopytextModule],
})
export class NxSwipebarModule {}

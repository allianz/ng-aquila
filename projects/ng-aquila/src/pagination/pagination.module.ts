import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxPaginationComponent } from './pagination.component';

@NgModule({
    imports: [CommonModule, NxIconModule, NxPaginationComponent],
    exports: [NxPaginationComponent],
    providers: [],
})
export class NxPaginationModule {}

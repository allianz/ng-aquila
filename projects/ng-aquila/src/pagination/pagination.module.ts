import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxPaginationComponent } from './pagination.component';
import { NxPaginationUtils } from './pagination-utils';

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: [NxPaginationComponent],
    exports: [NxPaginationComponent],
    providers: [NxPaginationUtils],
})
export class NxPaginationModule {}

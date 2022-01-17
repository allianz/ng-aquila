import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxPaginationUtils } from './pagination-utils';
import { NxPaginationComponent } from './pagination.component';

@NgModule({
    imports: [CommonModule, NxIconModule],
    declarations: [NxPaginationComponent],
    exports: [NxPaginationComponent],
    providers: [NxPaginationUtils],
})
export class NxPaginationModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxvTableOfContentsComponent } from './table-of-contents';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [NxvTableOfContentsComponent],
    exports: [NxvTableOfContentsComponent],
})
export class NxvTableOfContentsModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxvTableOfContentsComponent } from './table-of-contents';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [NxvTableOfContentsComponent],
    exports: [NxvTableOfContentsComponent],
})
export class NxvTableOfContentsModule {}

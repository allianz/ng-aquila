import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxVersionSelectComponent } from './version-select.component';

@NgModule({
    imports: [NxButtonModule, NxContextMenuModule, FormsModule, CommonModule, NxIconModule],
    exports: [NxVersionSelectComponent],
    declarations: [NxVersionSelectComponent],
    providers: [],
})
export class NxvVersionSelectModule {}

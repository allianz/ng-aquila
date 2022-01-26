import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxvThemeSwitcherComponent } from './theme-switcher.component';

@NgModule({
    imports: [CommonModule, NxButtonModule, NxContextMenuModule, NxIconModule, FormsModule],
    exports: [NxvThemeSwitcherComponent],
    declarations: [NxvThemeSwitcherComponent],
})
export class NxvThemeSwitcherModule {}

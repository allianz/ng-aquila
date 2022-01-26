import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { ColorPickerModule } from 'ngx-color-picker';

import { CssVarSidebarComponent } from './css-var-sidebar-component';

@NgModule({
    imports: [CommonModule, FormsModule, ColorPickerModule, NxIconModule, NxButtonModule],
    exports: [CssVarSidebarComponent],
    declarations: [CssVarSidebarComponent],
})
export class CssVarSidebarModule {}

import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { CssVarSidebarComponent } from './css-var-sidebar-component';

@NgModule({
    imports: [CommonModule, FormsModule, ColorPickerModule, NxIconModule, NxButtonModule],
    exports: [CssVarSidebarComponent],
    declarations: [CssVarSidebarComponent],
})
export class CssVarSidebarModule {}

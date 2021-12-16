import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { CssVarSidebarComponent } from './css-var-sidebar-component';
import { ColorPickerModule } from 'ngx-color-picker';
import { CommonModule } from '@angular/common';
import { NxButtonModule } from '@aposin/ng-aquila/button';

@NgModule({
    imports: [CommonModule, FormsModule, ColorPickerModule, NxIconModule, NxButtonModule],
    exports: [CssVarSidebarComponent],
    declarations: [CssVarSidebarComponent],
})
export class CssVarSidebarModule {}

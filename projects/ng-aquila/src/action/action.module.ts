import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NxActionComponent } from './action.component';
import { NxActionIconDirective } from './action-icon.directive';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@NgModule({
    imports: [NxIconModule, CommonModule],
    declarations: [NxActionComponent, NxActionIconDirective],
    exports: [NxActionComponent, NxActionIconDirective],
})
export class NxActionModule {}

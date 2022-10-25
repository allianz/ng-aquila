import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxActionComponent } from './action.component';
import { NxActionIconDirective } from './action-icon.directive';

@NgModule({
    imports: [NxIconModule, CommonModule],
    declarations: [NxActionComponent, NxActionIconDirective],
    exports: [NxActionComponent, NxActionIconDirective],
})
export class NxActionModule {}

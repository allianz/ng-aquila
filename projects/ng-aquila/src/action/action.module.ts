import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxActionComponent } from './action.component';
import { NxActionIconDirective } from './action-icon.directive';

@NgModule({
    imports: [NxIconModule, CommonModule],
    declarations: [NxActionComponent, NxActionIconDirective],
    exports: [NxActionComponent, NxActionIconDirective],
})
export class NxActionModule {}

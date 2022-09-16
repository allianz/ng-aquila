import { NxErrorModule } from '@allianz/ng-aquila/base';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxCardComponent } from './card.component';
import { NxCardFooterComponent } from './card-footer.component';
import { NxCardHeaderComponent } from './card-header.component';
import { NxSelectableCardComponent } from './selectable-card.component';

@NgModule({
    declarations: [NxCardComponent, NxSelectableCardComponent, NxCardHeaderComponent, NxCardFooterComponent],
    exports: [NxCardComponent, NxSelectableCardComponent, NxCardHeaderComponent, NxCardFooterComponent, NxErrorModule],
    imports: [CommonModule, NxIconModule, NxErrorModule, NxCheckboxModule],
})
export class NxCardModule {}

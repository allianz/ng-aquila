import { NxFooterModule } from '@allianz/ng-aquila/footer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NxvFooterComponent } from './footer.component';

@NgModule({
    imports: [CommonModule, NxFooterModule],
    declarations: [NxvFooterComponent],
    exports: [NxvFooterComponent],
})
export class NxvFooterModule {}

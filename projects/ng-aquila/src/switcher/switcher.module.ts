import { ObserversModule } from '@angular/cdk/observers';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

import { NxSwitcherComponent } from './switcher.component';

@NgModule({
    declarations: [NxSwitcherComponent],
    exports: [NxSwitcherComponent],
    imports: [CommonModule, NxIconModule, ObserversModule],
})
export class NxSwitcherModule {}

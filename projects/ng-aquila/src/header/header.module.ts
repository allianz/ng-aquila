import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    NxHeaderActionsDirective,
    NxHeaderAppTitleDirective,
    NxHeaderBrandDirective,
    NxHeaderComponent,
    NxHeaderLinkComponent,
    NxHeaderNavigationComponent,
    NxHeaderNavigationItemDirective,
    NxHeaderRowDirective,
} from './header.component';

const EXPORTS = [
    NxHeaderComponent,
    NxHeaderLinkComponent,
    NxHeaderActionsDirective,
    NxHeaderNavigationComponent,
    NxHeaderBrandDirective,
    NxHeaderRowDirective,
    NxHeaderNavigationItemDirective,
    NxHeaderAppTitleDirective,
];

@NgModule({
    declarations: EXPORTS,
    exports: EXPORTS,
    imports: [CommonModule],
})
export class NxHeaderModule {}

import { NgModule } from '@angular/core';

import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxTreeModule } from '@aposin/ng-aquila/tree';

@NgModule({
    imports: [CommonModule, RouterModule, CdkAccordionModule, NxActionModule, NxTreeModule],
    exports: [NavigationComponent],
    declarations: [NavigationComponent],
    providers: [],
})
export class NavigationModule {}

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxActionModule } from '@aposin/ng-aquila/action';
import { NxTreeModule } from '@aposin/ng-aquila/tree';

import { NavigationComponent } from './navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule, CdkAccordionModule, NxActionModule, NxTreeModule],
    exports: [NavigationComponent],
    declarations: [NavigationComponent],
    providers: [],
})
export class NavigationModule {}

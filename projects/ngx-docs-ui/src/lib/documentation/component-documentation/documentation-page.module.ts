import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';

import { NxvDocumentationComponent } from './documentation-page.component';
import { NxvFooterModule } from './footer/footer.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
    imports: [NxSidebarModule, NavigationModule, RouterModule, CommonModule, NxGridModule, NxvFooterModule, ScrollingModule],
    exports: [],
    declarations: [NxvDocumentationComponent],
    providers: [],
})
export class NxvDocumentationPageModule {}

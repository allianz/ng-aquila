import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxSidebarModule } from '@allianz/ng-aquila/sidebar';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NxvDocumentationComponent } from './documentation-page.component';
import { NxvFooterModule } from './footer/footer.module';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  imports: [
    NxSidebarModule,
    NavigationModule,
    RouterModule,
    CommonModule,
    NxGridModule,
    NxvFooterModule,
    ScrollingModule,
    NxvDocumentationComponent,
  ],
  exports: [],
  providers: [],
})
export class NxvDocumentationPageModule {}

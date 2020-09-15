import { NgModule } from '@angular/core';

import { NavigationModule } from './navigation/navigation.module';
import { RouterModule } from '@angular/router';
import { NxvDocumentationComponent } from './documentation-page.component';
import { CommonModule } from '@angular/common';
import { NxSidebarModule } from '@aposin/ng-aquila/sidebar';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxvFooterModule } from './footer/footer.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
      NxSidebarModule,
      NavigationModule,
      RouterModule,
      CommonModule,
      NxGridModule,
      NxvFooterModule,
      ScrollingModule
    ],
  exports: [],
  declarations: [NxvDocumentationComponent],
  providers: []
})
export class NxvDocumentationPageModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxCheckboxModule } from '@aposin/ng-aquila/checkbox';
import { NxDocumentationIconModule } from '@aposin/ng-aquila/documentation-icons';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFooterModule } from '@aposin/ng-aquila/footer';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';
import { NxHeadlineModule } from '@aposin/ng-aquila/headline';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxLinkModule } from '@aposin/ng-aquila/link';
import { NxMessageModule } from '@aposin/ng-aquila/message';
import { NxModalModule } from '@aposin/ng-aquila/modal';
import { NxOverlayModule } from '@aposin/ng-aquila/overlay';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    NxButtonModule,
    NxCheckboxModule,
    NxDocumentationIconModule,
    NxDropdownModule,
    NxFooterModule,
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxIconModule,
    NxInputModule,
    NxLinkModule,
    NxMessageModule,
    NxModalModule,
    NxOverlayModule,
    NxPopoverModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

/**  Copyright APOSIN 2021 */

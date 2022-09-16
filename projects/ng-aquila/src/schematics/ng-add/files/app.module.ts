import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFooterModule } from '@allianz/ng-aquila/footer';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxModalModule } from '@allianz/ng-aquila/modal';
import { NxOverlayModule } from '@allianz/ng-aquila/overlay';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

@NgModule({
    declarations: [AppComponent],
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
        NxPopoverModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}

/**  Copyright ALLIANZ */

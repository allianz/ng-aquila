import {} from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NxButtonModule, NxIconButtonComponent } from '@aposin/ng-aquila/button';
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
import { NxDialogService, NxModalModule, NxModalRef } from '@aposin/ng-aquila/modal';
import { NxOverlayModule } from '@aposin/ng-aquila/overlay';
import { NxPopoverModule } from '@aposin/ng-aquila/popover';
import { NxSmallStageModule } from '@aposin/ng-aquila/small-stage';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
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
        NxSmallStageModule,
        NxIconButtonComponent,
    ],
    templateUrl: './app.component.html',
})
export class AppComponent {
    @ViewChild('consentTemplate') consentTemplateRef!: TemplateRef<any>;
    @ViewChild('submitTemplate') submitTemplateRef!: TemplateRef<any>;
    dialogRef!: NxModalRef<any>;
    formGroup: FormGroup;

    constructor(readonly dialogService: NxDialogService) {
        this.formGroup = new FormBuilder().group({
            name: ['', Validators.required],
            items: ['', Validators.required],
            email: ['', [Validators.email, Validators.required]],
            consent: [false, Validators.requiredTrue],
        });
    }

    openConsentDialog(): void {
        this.dialogRef = this.dialogService.open(this.consentTemplateRef, {
            ariaLabel: 'A modal with content',
            showCloseIcon: true,
        });
    }

    openSubmitDialog(): void {
        this.dialogRef = this.dialogService.open(this.submitTemplateRef, {
            ariaLabel: 'The final modal of the Starter App',
            showCloseIcon: false,
        });
    }

    closeDialog() {
        this.dialogRef.close();
    }
}

/** Copyright ALLIANZ */

import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

@Component({
    selector: 'app-root',
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

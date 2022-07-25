import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

/**
 * @title Modal closing example
 */
@Component({
    selector: 'modal-closing-example',
    templateUrl: './modal-closing-example.html',
    styleUrls: ['./modal-closing-example.css'],
})
export class ModalClosingExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;
    dialogRef!: NxModalRef<any>;
    actionResult!: string;

    constructor(readonly dialogService: NxDialogService) {}

    openFromTemplate(): void {
        this.dialogRef = this.dialogService.open(this.templateRef, {
            ariaLabel: 'A simple modal',
            showCloseIcon: true,
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.actionResult = result;
        });
    }

    closeDialog(result: string) {
        this.dialogRef.close(result);
    }
}

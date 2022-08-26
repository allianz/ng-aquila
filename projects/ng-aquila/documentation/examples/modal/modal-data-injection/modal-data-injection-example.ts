import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

interface MyDialogData {
    name: string;
}

/**
 * @title Data injection example
 */
@Component({
    selector: 'modal-data-injection-example',
    templateUrl: './modal-data-injection-example.html',
    styleUrls: ['./modal-data-injection-example.css'],
})
export class ModalDataInjectionExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    dialogRef?: NxModalRef<any>;

    constructor(private readonly dialogService: NxDialogService) {}

    openFromTemplate(): void {
        const myDialogData: MyDialogData = { name: 'Max Mustermann' };

        this.dialogRef = this.dialogService.open(this.templateRef, {
            showCloseIcon: true,
            ariaLabel: 'A modal with injected data',
            data: myDialogData,
        });
    }
}

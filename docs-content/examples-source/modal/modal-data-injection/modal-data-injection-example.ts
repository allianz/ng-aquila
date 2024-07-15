import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
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
    standalone: true,
    imports: [NxButtonComponent, NxHeadlineComponent, NxCopytextComponent],
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

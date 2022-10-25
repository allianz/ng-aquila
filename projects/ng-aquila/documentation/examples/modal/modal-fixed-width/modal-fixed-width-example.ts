import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxDialogService } from '@aposin/ng-aquila/modal';

/**
 * @title Fixed width example
 */
@Component({
    selector: 'modal-fixed-width-example',
    templateUrl: './modal-fixed-width-example.html',
    styleUrls: ['./modal-fixed-width-example.css'],
})
export class ModalFixedWidthExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    constructor(private readonly dialogService: NxDialogService) {}

    openFromTemplate(): void {
        this.dialogService.open(this.templateRef, {
            showCloseIcon: true,
            ariaLabel: 'A modal with fixed width',
            width: '350px',
        });
    }
}

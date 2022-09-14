import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxDialogService } from '@aposin/ng-aquila/modal';

/**
 * @title Closing behaviour example
 */
@Component({
    selector: 'modal-closing-behaviour-example',
    templateUrl: './modal-closing-behaviour-example.html',
    styleUrls: ['./modal-closing-behaviour-example.css'],
})
export class ModalClosingBehaviourExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    constructor(private readonly dialogService: NxDialogService) {}

    openFromTemplate(): void {
        this.dialogService.open(this.templateRef, {
            ariaLabel: 'A simple modal',
            disableClose: true,
        });
    }
}

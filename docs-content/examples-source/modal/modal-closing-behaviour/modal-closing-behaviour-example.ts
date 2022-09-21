import { NxDialogService } from '@allianz/ng-aquila/modal';
import { Component, TemplateRef, ViewChild } from '@angular/core';

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

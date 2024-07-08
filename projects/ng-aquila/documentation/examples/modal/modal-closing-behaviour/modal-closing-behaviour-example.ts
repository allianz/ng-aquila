import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxDialogService,
    NxModalActionsDirective,
    NxModalCloseDirective,
    NxModalContentDirective,
} from '@aposin/ng-aquila/modal';

/**
 * @title Closing behaviour example
 */
@Component({
    selector: 'modal-closing-behaviour-example',
    templateUrl: './modal-closing-behaviour-example.html',
    styleUrls: ['./modal-closing-behaviour-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxModalContentDirective,
        NxHeadlineComponent,
        NxCopytextComponent,
        NxModalActionsDirective,
        NxModalCloseDirective,
    ],
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

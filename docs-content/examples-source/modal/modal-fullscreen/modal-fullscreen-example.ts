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
 * @title Fullscreen example
 */
@Component({
    selector: 'modal-fullscreen-example',
    templateUrl: './modal-fullscreen-example.html',
    styleUrls: ['./modal-fullscreen-example.css'],
    imports: [
        NxButtonComponent,
        NxModalContentDirective,
        NxHeadlineComponent,
        NxCopytextComponent,
        NxModalActionsDirective,
        NxModalCloseDirective,
    ],
})
export class ModalFullscreenExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    constructor(private readonly dialogService: NxDialogService) {}

    openFromTemplate(): void {
        this.dialogService.open(this.templateRef, {
            fullscreen: true,
            showCloseIcon: true,
            ariaLabel: 'A fullscreen modal',
        });
    }
}

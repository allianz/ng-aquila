import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxDialogService } from '@aposin/ng-aquila/modal';

/**
 * @title Fullscreen example
 */
@Component({
    selector: 'modal-fullscreen-example',
    templateUrl: './modal-fullscreen-example.html',
    styleUrls: ['./modal-fullscreen-example.css'],
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

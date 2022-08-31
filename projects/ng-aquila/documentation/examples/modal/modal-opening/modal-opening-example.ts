import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

@Component({
    template: `<div class="u-text-center">
        <h3>Modal Dialog from a component</h3>
        <p>
            Any content can be included in a modal view and styled as necessary.
        </p>
    </div>`,
})
export class SimpleModalComponent {}

/**
 * @title Modal opening example
 */
@Component({
    selector: 'modal-opening-example',
    templateUrl: './modal-opening-example.html',
    styleUrls: ['./modal-opening-example.css'],
})
export class ModalOpeningExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;
    @ViewChild('template2') templateRef2!: TemplateRef<any>;

    templateDialogRef?: NxModalRef<any>;
    componentDialogRef?: NxModalRef<SimpleModalComponent>;

    constructor(private readonly dialogService: NxDialogService) {}

    openFromTemplate(): void {
        this.templateDialogRef = this.dialogService.open(this.templateRef, {
            ariaLabel: 'A simple dialog',
        });
    }

    openFromComponent(): void {
        this.componentDialogRef = this.dialogService.open(
            SimpleModalComponent,
            {
                ariaLabel: 'A simple dialog',
                showCloseIcon: true,
            },
        );
    }

    closeTemplateDialog() {
        this.templateDialogRef?.close();
    }
}

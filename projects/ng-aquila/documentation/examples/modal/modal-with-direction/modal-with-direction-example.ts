import { Directionality } from '@angular/cdk/bidi';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

/**
 * @title Modal with direction example
 */
@Component({
    selector: 'modal-with-direction-example',
    templateUrl: './modal-with-direction-example.html',
    styleUrls: ['./modal-with-direction-example.css'],
    imports: [NxButtonComponent, NxHeadlineComponent, NxCopytextComponent],
})
export class ModalWithDirectionExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    templateDialogRef?: NxModalRef<any>;

    constructor(
        private readonly dialogService: NxDialogService,
        private readonly dir: Directionality,
    ) {}

    openFromTemplate(): void {
        this.templateDialogRef = this.dialogService.open(this.templateRef, {
            ariaLabel: 'Dialog with direction',
            direction: this.dir.value,
        });
    }

    closeTemplateDialog() {
        this.templateDialogRef?.close();
    }
}

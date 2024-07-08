import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    NxDialogService,
    NxModalActionsDirective,
    NxModalCloseDirective,
    NxModalContentDirective,
    NxModalRef,
    NxModalTitleComponent,
} from '@aposin/ng-aquila/modal';

type MyDialogResult = 'agree' | 'disagree';

/**
 * @title Modal with content and actions example
 */
@Component({
    selector: 'modal-content-actions-example',
    templateUrl: './modal-content-actions-example.html',
    styleUrls: ['./modal-content-actions-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxModalContentDirective,
        NxModalTitleComponent,
        NxCopytextComponent,
        NxModalActionsDirective,
        NxModalCloseDirective,
    ],
})
export class ModalContentActionsExampleComponent {
    dialogRef?: NxModalRef<any, MyDialogResult | undefined>; // cancel and backdrop click return undefined

    actionResult?: MyDialogResult;

    constructor(
        private readonly dialogService: NxDialogService,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    openFromTemplate(templateRef: TemplateRef<any>): void {
        this.dialogRef = this.dialogService.open(templateRef, {
            ariaLabel: 'A modal with content and actions sections',
            showCloseIcon: true,
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.actionResult = result;
            this._cdr.markForCheck();
        });
    }
}

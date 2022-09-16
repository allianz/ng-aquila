import { NxDialogService, NxModalRef } from '@allianz/ng-aquila/modal';
import {
    ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
} from '@angular/core';

type MyDialogResult = 'agree' | 'disagree';

/**
 * @title Modal with content and actions example
 */
@Component({
    selector: 'modal-content-actions-example',
    templateUrl: './modal-content-actions-example.html',
    styleUrls: ['./modal-content-actions-example.css'],
})
export class ModalContentActionsExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    dialogRef?: NxModalRef<any, MyDialogResult | undefined>; // cancel and backdrop click return undefined

    actionResult?: MyDialogResult;

    constructor(
        private readonly dialogService: NxDialogService,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    openFromTemplate(): void {
        this.dialogRef = this.dialogService.open(this.templateRef, {
            ariaLabel: 'A modal with content and actions sections',
            showCloseIcon: true,
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.actionResult = result;
            this._cdr.markForCheck();
        });
    }
}

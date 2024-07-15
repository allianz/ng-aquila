import {
    ChangeDetectorRef,
    Component,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxDialogService,
    NxModalActionsDirective,
    NxModalCloseDirective,
    NxModalContentDirective,
    NxModalRef,
} from '@aposin/ng-aquila/modal';

type MyDialogResult = 'proceed' | 'cancel';

/**
 * @title Modal closing example
 */
@Component({
    selector: 'modal-closing-example',
    templateUrl: './modal-closing-example.html',
    styleUrls: ['./modal-closing-example.css'],
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
export class ModalClosingExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    dialogRef?: NxModalRef<any, MyDialogResult | undefined>; // cancel and backdrop click return undefined

    actionResult?: MyDialogResult;

    constructor(
        private readonly dialogService: NxDialogService,
        private readonly _cdr: ChangeDetectorRef,
    ) {}

    openFromTemplate(): void {
        this.dialogRef = this.dialogService.open(this.templateRef, {
            ariaLabel: 'A simple modal',
            showCloseIcon: true,
        });

        this.dialogRef.afterClosed().subscribe(result => {
            this.actionResult = result;
            this._cdr.markForCheck();
        });
    }

    closeDialog(result: MyDialogResult): void {
        this.dialogRef?.close(result);
    }
}

import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { NxStatusIconType } from '@aposin/ng-aquila/icon';
import {
    NxDialogService,
    NxModalAppearance,
    NxModalRef,
} from '@aposin/ng-aquila/modal';

/**
 * @title Modal status example
 */
@Component({
    selector: 'modal-status-example',
    templateUrl: './modal-status-example.html',
    styleUrls: ['./modal-status-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalStatusExample {
    dialogRef?: NxModalRef<any>;

    status!: NxStatusIconType;

    constructor(private readonly dialogService: NxDialogService) {}

    open(
        status: NxStatusIconType,
        appearance: NxModalAppearance,
        template: TemplateRef<any>,
    ): void {
        this.status = status;
        this.dialogRef = this.dialogService.open(template, {
            ariaLabel: 'A simple modal',
            showCloseIcon: true,
            appearance,
        });
    }
}

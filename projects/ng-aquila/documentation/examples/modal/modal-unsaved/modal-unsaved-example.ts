import {
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';
import { delay } from 'rxjs/operators';

type MyDialogResult = 'proceed' | 'cancel';

/**
 * @title Modal with unsaved changes and popover example
 */
@Component({
    selector: 'modal-unsaved-example',
    templateUrl: './modal-unsaved-example.html',
    styleUrls: ['./modal-unsaved-example.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalUnsavedExampleComponent {
    @ViewChild('template') templateRef!: TemplateRef<any>;

    formGroup: FormGroup = new FormGroup({ text: new FormControl('') });

    dialogRef?: NxModalRef<any, MyDialogResult | undefined>; // cancel and backdrop click return undefined

    showPopoverFlag = false;

    constructor(private readonly dialogService: NxDialogService) {}

    openModal(): void {
        this.dialogRef = this.dialogService.open(this.templateRef, {
            showCloseIcon: true,
            disableClose: false,
            shouldClose: (modalResult: MyDialogResult) => {
                if (modalResult === 'proceed') {
                    return true;
                }
                return !this.formGroup.dirty;
            },
        });
        this.dialogRef.closeDenied.pipe(delay(100)).subscribe(() => {
            this.showPopover();
        });
    }

    onSubmit(): void {
        console.log('form submitted', this.formGroup.get('text')?.value);
        this.formGroup.reset();
    }

    showPopover(): void {
        this.showPopoverFlag = true;
    }

    closePopover(): void {
        this.showPopoverFlag = false;
    }

    discard(): void {
        this.formGroup.reset();
        this.closePopover();
        this.dialogRef?.close();
    }
}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalCloseDirective,
  NxModalContentDirective,
  NxModalRef,
} from '@allianz/ng-aquila/modal';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

type MyDialogResult = 'proceed' | 'cancel';

/**
 * @title Modal closing example
 */
@Component({
  selector: 'modal-closing-example',
  templateUrl: './modal-closing-example.html',
  styleUrls: ['./modal-closing-example.css'],
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

    this.dialogRef.afterClosed().subscribe((result) => {
      this.actionResult = result;
      this._cdr.markForCheck();
    });
  }

  closeDialog(result: MyDialogResult): void {
    this.dialogRef?.close(result);
  }
}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalCloseDirective,
  NxModalContentDirective,
  NxModalRef,
  NxModalTitleComponent,
} from '@allianz/ng-aquila/modal';
import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';

type MyDialogResult = 'agree' | 'disagree';

/**
 * @title Modal with content and actions example
 */
@Component({
  selector: 'modal-content-actions-example',
  templateUrl: './modal-content-actions-example.html',
  styleUrls: ['./modal-content-actions-example.css'],
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

    this.dialogRef.afterClosed().subscribe((result) => {
      this.actionResult = result;
      this._cdr.markForCheck();
    });
  }
}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxStatusIconType } from '@allianz/ng-aquila/icon';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalAppearance,
  NxModalContentDirective,
  NxModalRef,
  NxModalTitleComponent,
} from '@allianz/ng-aquila/modal';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';

/**
 * @title Modal status example
 */
@Component({
  selector: 'modal-status-example',
  templateUrl: './modal-status-example.html',
  styleUrls: ['./modal-status-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxButtonComponent,
    NxModalTitleComponent,
    NxModalContentDirective,
    NxCopytextComponent,
    NxModalActionsDirective,
  ],
})
export class ModalStatusExampleComponent {
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

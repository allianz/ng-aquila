import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalContentDirective,
  NxModalRef,
  NxModalTitleComponent,
} from '@allianz/ng-aquila/modal';
import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';

/**
 * @title Modal with custom icon in header example
 */
@Component({
  selector: 'modal-custom-icon-example',
  templateUrl: './modal-custom-icon-example.html',
  styleUrls: ['./modal-custom-icon-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxButtonComponent,
    NxModalTitleComponent,
    NxModalContentDirective,
    NxCopytextComponent,
    NxModalActionsDirective,
    NxIconComponent,
  ],
})
export class ModalCustomIconExampleComponent {
  dialogRef?: NxModalRef<any>;

  constructor(private readonly dialogService: NxDialogService) {}

  open(template: TemplateRef<any>): void {
    this.dialogRef = this.dialogService.open(template, {
      ariaLabel: 'A simple modal',
      showCloseIcon: true,
    });
  }
}

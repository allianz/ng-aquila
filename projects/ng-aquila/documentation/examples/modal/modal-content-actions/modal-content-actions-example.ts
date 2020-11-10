import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

/**
* @title Modal with content and actions example
*/
@Component({
  templateUrl: './modal-content-actions-example.html',
  styleUrls: ['./modal-content-actions-example.css']
})
export class ModalContentActionsExampleComponent {
  @ViewChild('template') templateRef: TemplateRef<any>;
  actionResult: string;

  dialogRef: NxModalRef<any, any>;

  constructor(public dialogService: NxDialogService) {
  }

  openFromTemplate(): void {
    this.dialogRef = this.dialogService.open(this.templateRef,
      { ariaLabel: 'A modal with content and actions sections', showCloseIcon: true });

    this.dialogRef.afterClosed().subscribe(result => {
      this.actionResult = result;
    });
  }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}

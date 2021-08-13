import { Component, ViewChild, TemplateRef, AfterContentInit } from '@angular/core';
import { NxDialogService, NxModalRef } from '@aposin/ng-aquila/modal';

/**
* @title Data injection example
*/
@Component({
  selector: 'modal-data-injection-example',
  templateUrl: './modal-data-injection-example.html',
  styleUrls: ['./modal-data-injection-example.css']
})
export class ModalDataInjectionExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;
  actionResult!: string;

  dialogRef!: NxModalRef<any, any>;

  constructor(public dialogService: NxDialogService) {
  }

  openFromTemplate(): void {
    this.dialogRef = this.dialogService.open(this.templateRef, {
      showCloseIcon: true,
      ariaLabel: 'A modal with injected data',
      data: {
        name: 'Max Mustermann'
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.actionResult = result;
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

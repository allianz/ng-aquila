import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxDialogService, NxModalRef } from '@allianz/ng-aquila/modal';
import { Directionality } from '@angular/cdk/bidi';
import { Component, TemplateRef, ViewChild } from '@angular/core';

/**
 * @title Modal with direction example
 */
@Component({
  selector: 'modal-with-direction-example',
  templateUrl: './modal-with-direction-example.html',
  styleUrls: ['./modal-with-direction-example.css'],
  imports: [NxButtonComponent, NxHeadlineComponent, NxCopytextComponent],
})
export class ModalWithDirectionExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;

  templateDialogRef?: NxModalRef<any>;

  constructor(
    private readonly dialogService: NxDialogService,
    private readonly dir: Directionality,
  ) {}

  openFromTemplate(): void {
    this.templateDialogRef = this.dialogService.open(this.templateRef, {
      ariaLabel: 'Dialog with direction',
      direction: this.dir.value,
    });
  }

  closeTemplateDialog() {
    this.templateDialogRef?.close();
  }
}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalCloseDirective,
  NxModalContentDirective,
} from '@allianz/ng-aquila/modal';
import { Component, TemplateRef, ViewChild } from '@angular/core';

/**
 * @title Closing behaviour example
 */
@Component({
  selector: 'modal-closing-behaviour-example',
  templateUrl: './modal-closing-behaviour-example.html',
  styleUrls: ['./modal-closing-behaviour-example.css'],
  imports: [
    NxButtonComponent,
    NxModalContentDirective,
    NxHeadlineComponent,
    NxCopytextComponent,
    NxModalActionsDirective,
    NxModalCloseDirective,
  ],
})
export class ModalClosingBehaviourExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;

  constructor(private readonly dialogService: NxDialogService) {}

  openFromTemplate(): void {
    this.dialogService.open(this.templateRef, {
      ariaLabel: 'A simple modal',
      disableClose: true,
    });
  }
}

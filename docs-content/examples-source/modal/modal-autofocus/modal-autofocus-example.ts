import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  AutoFocusTarget,
  NxDialogService,
  NxModalActionsDirective,
  NxModalCloseDirective,
  NxModalContentDirective,
} from '@allianz/ng-aquila/modal';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

/**
 * @title Modal autofocus Example
 */
@Component({
  selector: 'modal-autofocus-example',
  imports: [
    NxButtonComponent,
    NxModalContentDirective,
    NxHeadlineComponent,
    NxCopytextComponent,
    NxModalActionsDirective,
    NxModalCloseDirective,
  ],
  templateUrl: './modal-autofocus-example.html',
  styleUrl: './modal-autofocus-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalAutofocusExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;

  constructor(private readonly dialogService: NxDialogService) {}

  openFromTemplate(focus: AutoFocusTarget | string): void {
    this.dialogService.open(this.templateRef, {
      autoFocus: focus,
      showCloseIcon: true,
    });
  }
}

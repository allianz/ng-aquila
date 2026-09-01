import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalContentDirective,
  NxModalRef,
} from '@allianz/ng-aquila/modal';
import { NxTabComponent, NxTabGroupComponent } from '@allianz/ng-aquila/tabs';
import {
  ChangeDetectorRef,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

/**
 * @title Closable tabs with confirmation
 */
@Component({
  selector: 'tabs-closable-confirm-example',
  templateUrl: './tabs-closable-confirm-example.html',
  styleUrls: ['./tabs-closable-confirm-example.css'],
  imports: [
    NxTabGroupComponent,
    NxTabComponent,
    NxButtonComponent,
    NxHeadlineComponent,
    NxCopytextComponent,
    NxModalContentDirective,
    NxModalActionsDirective,
  ],
})
export class TabsClosableConfirmExampleComponent {
  @ViewChild('confirmTemplate') confirmTemplate!: TemplateRef<any>;

  tabs = [
    { label: 'First tab' },
    { label: 'Second tab' },
    { label: 'Third tab' },
  ];

  private dialogRef?: NxModalRef<any, boolean>;

  /** Label of the tab awaiting confirmation, shown in the dialog. */
  pendingLabel = '';

  constructor(
    private readonly dialogService: NxDialogService,
    private readonly _cdr: ChangeDetectorRef,
  ) {}

  confirmClose(index: number): void {
    this.pendingLabel = this.tabs[index].label;

    this.dialogRef = this.dialogService.open<any, boolean>(
      this.confirmTemplate,
      { showCloseIcon: false },
    );

    this.dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.tabs = this.tabs.filter((_, i) => i !== index);
        this._cdr.markForCheck();
      }
    });
  }

  handleClick(confirmed: boolean): void {
    this.dialogRef?.close(confirmed);
  }
}

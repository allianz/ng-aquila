import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NX_MODAL_DEFAULT_OPTIONS,
  NxDialogService,
  NxModalRef,
} from '@allianz/ng-aquila/modal';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';

/**
 * @title Global default options example
 */
@Component({
  selector: 'modal-default-options-example',
  templateUrl: './modal-default-options-example.html',
  styleUrls: ['./modal-default-options-example.css'],
  imports: [NxButtonComponent, NxHeadlineComponent, NxCopytextComponent],
  // Provide app-wide defaults for every modal opened from this injector.
  // Only the options you set are overridden; all other NxModalConfig defaults
  // (e.g. role: 'dialog', hasBackdrop: true) are preserved.
  //
  // In a real app you provide NX_MODAL_DEFAULT_OPTIONS at the root (e.g. in
  // your AppModule / bootstrap providers) so the root NxDialogService picks it
  // up. Because NxDialogService is providedIn: 'root', we also provide it here
  // so this self-contained example gets an instance that reads the defaults
  // from this component's injector.
  providers: [
    NxDialogService,
    {
      provide: NX_MODAL_DEFAULT_OPTIONS,
      useValue: {
        width: '600px',
        showCloseIcon: true,
      },
    },
  ],
})
export class ModalDefaultOptionsExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;

  dialogRef?: NxModalRef<any>;

  private readonly dialogService = inject(NxDialogService);

  // No per-call config needed: the dialog picks up the provided defaults
  // (600px wide, close icon shown) on top of the built-in NxModalConfig defaults.
  openWithDefaults(): void {
    this.dialogRef = this.dialogService.open(this.templateRef);
  }

  // Per-call config still wins over the provided defaults.
  openWithOverride(): void {
    this.dialogRef = this.dialogService.open(this.templateRef, {
      width: '400px',
    });
  }

  closeDialog(): void {
    this.dialogRef?.close();
  }
}

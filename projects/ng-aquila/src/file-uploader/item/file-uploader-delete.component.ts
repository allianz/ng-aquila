import { NxButtonModule } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { Component, computed, inject, input } from '@angular/core';

/** Shows a delete button. */
@Component({
  selector: 'nx-file-upload-delete',
  template: `
    @if (isAllianzOne()) {
      <!-- A1 design system uses nxPlainButton instead of nxIconButton -->
      <button
        nxPlainButton="tertiary small-medium"
        [attr.aria-label]="deleteLabel() || null"
        type="button"
        [attr.disabled]="disabled() || isUploading() || null"
      >
        <nx-icon name="trash-o" [attr.aria-hidden]="true"></nx-icon>
      </button>
    } @else {
      <button
        nxIconButton="tertiary"
        size="small-medium"
        [attr.aria-label]="deleteLabel() || null"
        type="button"
        [attr.disabled]="disabled() || isUploading() || null"
      >
        <nx-icon name="trash-o" [attr.aria-hidden]="true"></nx-icon>
      </button>
    }
  `,
  styleUrls: ['file-uploader-delete.component.scss'],
  imports: [NxButtonModule, NxIconModule],
})
export class NxFileUploaderItemDelete {
  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });

  protected readonly isAllianzOne = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  /** Whether the file is uploading at the moment. If true, the button is disabled. Default: false.*/
  readonly isUploading = input(false);

  /** Whether this button is disabled. The button is additionally disabled while uploading. Default: false. */
  readonly disabled = input(false);

  /** The label that is used for the delete button (used by screen readers). */
  readonly deleteLabel = input<string>();
}

import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { Directive, inject, input } from '@angular/core';

// This Directive solely purpose is to mark given ng-content and project it into the required destination.
@Directive({
  selector: '[nxFileUploadHint]',
  host: {
    '[attr.id]': 'id()',
    '[class.nx-file-upload-hint]': 'true',
  },
  standalone: true,
})
export class NxFileUploaderHintDirective {
  /** Sets the id of the file upload hint. */
  readonly id = input(inject(IdGenerationService).nextId('nx-formfield-hint'));
}

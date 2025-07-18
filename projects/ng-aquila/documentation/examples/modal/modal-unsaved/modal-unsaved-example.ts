import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxDialogService,
  NxModalActionsDirective,
  NxModalCloseDirective,
  NxModalContentDirective,
  NxModalRef,
} from '@allianz/ng-aquila/modal';
import {
  NxPopoverComponent,
  NxPopoverTriggerDirective,
} from '@allianz/ng-aquila/popover';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { delay } from 'rxjs/operators';

type MyDialogResult = 'proceed' | 'cancel';

/**
 * @title Modal with unsaved changes and popover example
 */
@Component({
  selector: 'modal-unsaved-example',
  templateUrl: './modal-unsaved-example.html',
  styleUrls: ['./modal-unsaved-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NxModalContentDirective,
    NxHeadlineComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxModalActionsDirective,
    NxPopoverTriggerDirective,
    NxModalCloseDirective,
    NxPopoverComponent,
    NxIconComponent,
  ],
})
export class ModalUnsavedExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;

  formGroup: FormGroup = new FormGroup({ text: new FormControl('') });

  dialogRef?: NxModalRef<any, MyDialogResult | undefined>; // cancel and backdrop click return undefined

  showPopoverFlag = false;

  constructor(private readonly dialogService: NxDialogService) {}

  openModal(): void {
    this.dialogRef = this.dialogService.open(this.templateRef, {
      showCloseIcon: true,
      disableClose: false,
      shouldClose: (modalResult: MyDialogResult) => {
        if (modalResult === 'proceed') {
          return true;
        }
        return !this.formGroup.dirty;
      },
    });
    this.dialogRef.closeDenied.pipe(delay(100)).subscribe(() => {
      this.showPopover();
    });
  }

  onSubmit(): void {
    this.formGroup.reset();
  }

  showPopover(): void {
    this.showPopoverFlag = true;
  }

  closePopover(): void {
    this.showPopoverFlag = false;
  }

  discard(): void {
    this.formGroup.reset();
    this.closePopover();
    this.dialogRef?.close();
  }
}

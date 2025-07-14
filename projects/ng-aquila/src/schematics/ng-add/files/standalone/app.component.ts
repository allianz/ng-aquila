import { NxButtonModule, NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFooterModule } from '@allianz/ng-aquila/footer';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxDialogService, NxModalModule, NxModalRef } from '@allianz/ng-aquila/modal';
import { NxOverlayModule } from '@allianz/ng-aquila/overlay';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { NxSmallStageModule } from '@allianz/ng-aquila/small-stage';
import {} from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NxButtonModule,
    NxCheckboxModule,
    NxDocumentationIconModule,
    NxDropdownModule,
    NxFooterModule,
    NxFormfieldModule,
    NxGridModule,
    NxHeadlineModule,
    NxIconModule,
    NxInputModule,
    NxLinkModule,
    NxMessageModule,
    NxModalModule,
    NxOverlayModule,
    NxPopoverModule,
    NxSmallStageModule,
    NxIconButtonComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('consentTemplate') consentTemplateRef!: TemplateRef<any>;
  @ViewChild('submitTemplate') submitTemplateRef!: TemplateRef<any>;
  dialogRef!: NxModalRef<any>;
  formGroup: FormGroup;

  constructor(readonly dialogService: NxDialogService) {
    this.formGroup = new FormBuilder().group({
      name: ['', Validators.required],
      items: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      consent: [false, Validators.requiredTrue],
    });
  }

  openConsentDialog(): void {
    this.dialogRef = this.dialogService.open(this.consentTemplateRef, {
      ariaLabel: 'A modal with content',
      showCloseIcon: true,
    });
  }

  openSubmitDialog(): void {
    this.dialogRef = this.dialogService.open(this.submitTemplateRef, {
      ariaLabel: 'The final modal of the Starter App',
      showCloseIcon: false,
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

/** Copyright ALLIANZ */

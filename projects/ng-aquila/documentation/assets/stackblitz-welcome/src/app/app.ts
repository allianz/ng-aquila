import {
    Component,
    ElementRef,
    inject,
    signal,
    TemplateRef,
    viewChild,
    ViewChild,
} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NxDialogService, NxModalModule, NxModalRef } from '@allianz/ng-aquila/modal';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxOverlayModule } from '@allianz/ng-aquila/overlay';

import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxExpertModule } from '@allianz/ng-aquila/config';
import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxDocumentationIconModule } from '@allianz/ng-aquila/documentation-icons';
import { NxDropdownModule } from '@allianz/ng-aquila/dropdown';
import { NxFooterModule } from '@allianz/ng-aquila/footer';
import { NxFormfieldModule } from '@allianz/ng-aquila/formfield';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxInputModule } from '@allianz/ng-aquila/input';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { NxMessageModule } from '@allianz/ng-aquila/message';
import { NxPopoverModule } from '@allianz/ng-aquila/popover';
import { NxSmallStageModule } from '@allianz/ng-aquila/small-stage';

@Component({
    selector: 'app-root',
    imports: [
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
        NxCopytextModule,
        NxExpertModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './app.html',
    styleUrl: './app.css',
})
export class App {
    protected readonly title = signal('aquila-starter-app');

    dialogRef?: NxModalRef<any, any>;

    submitTemplateRef = viewChild.required<TemplateRef<any>>('submitTemplate');

    formGroup = new FormBuilder().group({
        name: ['', Validators.required],
        items: ['', Validators.required],
        email: ['', [Validators.email, Validators.required]],
        consent: [false, Validators.requiredTrue],
    });

    onSubmit() {
        if (this.formGroup.valid) {
            this.openSubmitDialog();
        }
    }

    private readonly dialogService = inject<NxDialogService>(NxDialogService);

    openSubmitDialog(): void {
        this.dialogRef = this.dialogService.open(this.submitTemplateRef(), {
            ariaLabel: 'The final modal of the Starter App',
            showCloseIcon: false,
        });
    }
}

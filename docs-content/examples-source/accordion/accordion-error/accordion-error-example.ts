import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    NxAccordionDirective,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Accordion Error Example
 */
@Component({
    selector: 'accordion-error-example',
    templateUrl: './accordion-error-example.html',
    styleUrls: ['./accordion-error-example.css'],
    imports: [
        NxAccordionDirective,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxIconComponent,
        FormsModule,
        ReactiveFormsModule,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxMessageComponent,
    ],
})
export class AccordionErrorExampleComponent {
    readonly formGroupInfo = this.fb.group({
        surname: ['Mustermann', Validators.required],
    });

    readonly formGroupPayment = this.fb.group({
        input: ['', Validators.required],
    });

    showErrorPayment = true;
    showErrorInfo = false;

    constructor(private readonly fb: FormBuilder) {
        this.formGroupPayment.markAllAsTouched();
    }

    get infoHasError() {
        return this.formGroupInfo.get('surname')?.hasError('required');
    }

    get paymentHasError() {
        return this.formGroupPayment.get('input')?.hasError('required');
    }
}

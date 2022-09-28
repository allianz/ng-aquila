import { DATEPICKER_DEFAULT_OPTIONS } from '@allianz/ng-aquila/datefield';
import { FORMFIELD_DEFAULT_OPTIONS } from '@allianz/ng-aquila/formfield';
import { Component } from '@angular/core';
import {
    UntypedFormArray,
    UntypedFormControl,
    UntypedFormGroup,
} from '@angular/forms';
import moment from 'moment';

/**
 * @title Table with form elements
 */
@Component({
    selector: 'table-form-elements-example',
    templateUrl: './table-form-elements-example.html',
    styleUrls: ['./table-form-elements-example.css'],
    providers: [
        // Both provided with NxExpertModule
        {
            provide: FORMFIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', nxFloatLabel: 'always' },
        },
        {
            provide: DATEPICKER_DEFAULT_OPTIONS,
            useValue: { toggleIconTabindex: -1 },
        },
    ],
})
export class TableFormElementsExampleComponent {
    formArray = new UntypedFormArray([
        new UntypedFormGroup({
            id: new UntypedFormControl('123456789'),
            amount: new UntypedFormControl(250.0),
            endingAt: new UntypedFormControl(moment([2021, 4, 1])),
            status: new UntypedFormControl('open'),
        }),
        new UntypedFormGroup({
            id: new UntypedFormControl('987654321'),
            amount: new UntypedFormControl(1000.4),
            endingAt: new UntypedFormControl(moment([2023, 2, 23])),
            status: new UntypedFormControl('processing'),
        }),
        new UntypedFormGroup({
            id: new UntypedFormControl('123456700'),
            amount: new UntypedFormControl(40),
            endingAt: new UntypedFormControl(moment([2019, 11, 31])),
            status: new UntypedFormControl('accepted'),
        }),
        new UntypedFormGroup({
            id: new UntypedFormControl('123456780'),
            amount: new UntypedFormControl(501),
            endingAt: new UntypedFormControl(moment([2018, 11, 31])),
            status: new UntypedFormControl('rejected'),
        }),
    ]);

    addRow() {
        this.formArray.push(
            new UntypedFormGroup({
                id: new UntypedFormControl(''),
                amount: new UntypedFormControl(''),
                endingAt: new UntypedFormControl(''),
                status: new UntypedFormControl(''),
            }),
        );
    }

    removeRow(index: number) {
        this.formArray.removeAt(index);
    }

    getFormGroup(i: number): UntypedFormGroup {
        return this.formArray.controls[i] as UntypedFormGroup;
    }
}

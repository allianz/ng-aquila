import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { DATEPICKER_DEFAULT_OPTIONS } from '@aposin/ng-aquila/datefield';
import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';
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
    formArray = new FormArray([
        new FormGroup({
            id: new FormControl('123456789'),
            amount: new FormControl(250.0),
            endingAt: new FormControl(moment([2021, 4, 1])),
            status: new FormControl('open'),
        }),
        new FormGroup({
            id: new FormControl('987654321'),
            amount: new FormControl(1000.4),
            endingAt: new FormControl(moment([2023, 2, 23])),
            status: new FormControl('processing'),
        }),
        new FormGroup({
            id: new FormControl('123456700'),
            amount: new FormControl(40),
            endingAt: new FormControl(moment([2019, 11, 31])),
            status: new FormControl('accepted'),
        }),
        new FormGroup({
            id: new FormControl('123456780'),
            amount: new FormControl(501),
            endingAt: new FormControl(moment([2018, 11, 31])),
            status: new FormControl('rejected'),
        }),
    ]);

    addRow() {
        this.formArray.push(
            new FormGroup({
                id: new FormControl(''),
                amount: new FormControl(0),
                endingAt: new FormControl(moment('')),
                status: new FormControl(''),
            }),
        );
    }

    removeRow(index: number) {
        this.formArray.removeAt(index);
    }

    getFormGroup(i: number): FormGroup {
        return this.formArray.controls[i] as FormGroup;
    }
}

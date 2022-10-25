import { Component, Injectable, OnInit } from '@angular/core';
import {
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { NxTimefieldIntl } from '@aposin/ng-aquila/timefield';

@Injectable()
export class MyIntl extends NxTimefieldIntl {
    inputFieldHoursAriaLabel = 'stunden';
    inputFieldMinutesAriaLabel = 'minuten';
}

/**
 * @title Localization example
 */
@Component({
    selector: 'timefield-localize-example',
    templateUrl: './timefield-localize-example.html',
    styleUrls: ['./timefield-localize-example.css'],
    providers: [{ provide: NxTimefieldIntl, useClass: MyIntl }],
})
export class TimefieldLocalizeExampleComponent implements OnInit {
    testForm!: UntypedFormGroup;

    ngOnInit(): void {
        this.testForm = new UntypedFormGroup({
            today: new UntypedFormControl('', {
                validators: [Validators.required],
            }),
        });
    }
}

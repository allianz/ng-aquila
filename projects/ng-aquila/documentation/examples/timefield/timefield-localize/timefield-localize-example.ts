import { NxTimefieldIntl } from '@allianz/ng-aquila/timefield';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    testForm!: FormGroup;

    ngOnInit(): void {
        this.testForm = new FormGroup({
            today: new FormControl('', {
                validators: [Validators.required],
            }),
        });
    }
}

import { Component, Injectable, OnInit } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxTimefieldComponent,
    NxTimefieldIntl,
} from '@aposin/ng-aquila/timefield';

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
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxTimefieldComponent,
        NxErrorComponent,
    ],
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

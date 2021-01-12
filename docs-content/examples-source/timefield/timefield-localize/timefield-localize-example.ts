import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
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
  providers: [
    { provide: NxTimefieldIntl, useClass: MyIntl },
  ],
})

export class TimefieldLocalizeExampleComponent implements OnInit {
  testForm: FormGroup;

  ngOnInit() {
    this.testForm = new FormGroup({
      today: new FormControl('', {
        validators: [
          Validators.required,
        ]
      })
    });
  }
}

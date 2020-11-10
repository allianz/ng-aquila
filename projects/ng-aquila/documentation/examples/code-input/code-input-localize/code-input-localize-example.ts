import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Injectable } from '@angular/core';
import { NxCodeInputIntl } from '@aposin/ng-aquila/code-input';

@Injectable()
export class MyIntl extends NxCodeInputIntl {
  inputFieldAriaLabel = 'Key eingeben';
  ofLabel = 'von';
}

/**
* @title Localization example
*/
@Component({
  selector: 'nx-code-input-localize-example',
  templateUrl: 'code-input-localize-example.html',
  styleUrls: ['code-input-localize-example.css'],
  providers: [
    {provide: NxCodeInputIntl, useClass: MyIntl},
  ],
})

export class CodeInputLocalizeExampleComponent implements OnInit {
  inputValue: string = '';
  codeForm: FormGroup;

  ngOnInit() {
    this.codeForm = new FormGroup({
      keyCode: new FormControl(this.inputValue, {
        validators: [
          Validators.required,
          Validators.pattern('[A-Z]+'),
          Validators.minLength(5)
        ],
        updateOn: 'submit'
      })
    });
  }

  get keyCode() {
    return this.codeForm.get('keyCode');
  }
}

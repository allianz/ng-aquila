import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

/**
* @title Disabled example
*/
@Component({
  selector: 'nx-code-input-disabled-example',
  templateUrl: 'code-input-disabled-example.html',
  styleUrls: ['code-input-disabled-example.css']
})

export class CodeInputDisabledExampleComponent implements OnInit {
  inputValue: string = '';
  codeForm: FormGroup;

  ngOnInit() {
    this.codeForm = new FormGroup({
      keyCode: new FormControl(
        { value: this.inputValue, disabled: true },
        { validators: [
            Validators.required,
            Validators.pattern('[A-Z]+'),
            Validators.minLength(4)
          ],
          updateOn: 'submit'
        }
      )
    });
  }

  get keyCode() {
    return this.codeForm.get('keyCode');
  }

  toggleDisabled() {
    if (this.keyCode.disabled) {
      this.keyCode.enable();
    } else {
      this.keyCode.disable();
    }
  }
}

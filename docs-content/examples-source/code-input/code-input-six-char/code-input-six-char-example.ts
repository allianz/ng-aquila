import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

/**
* @title Six character code input example
*/
@Component({
  selector: 'code-input-six-char-example',
  templateUrl: 'code-input-six-char-example.html',
  styleUrls: ['code-input-six-char-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CodeInputSixCharExampleComponent implements OnInit {
  inputValue: string = '';
  codeForm: FormGroup;

  ngOnInit() {
    this.codeForm = new FormGroup({
      keyCode: new FormControl(this.inputValue, {
        validators: [
          Validators.required,
          Validators.minLength(6)
        ],
        updateOn: 'blur'
      })
    });
  }

  get keyCode() {
    return this.codeForm.get('keyCode');
  }
}

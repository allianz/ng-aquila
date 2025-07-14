import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCodeInputComponent } from '@allianz/ng-aquila/code-input';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

/**
 * @title Seven character code input example
 */
@Component({
  selector: 'code-input-seven-char-example',
  templateUrl: 'code-input-seven-char-example.html',
  styleUrls: ['code-input-seven-char-example.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NxCodeInputComponent,
    NxErrorComponent,
    NxButtonComponent,
  ],
})
export class CodeInputSevenCharExampleComponent implements OnInit {
  inputValue = '';
  codeForm!: FormGroup;

  ngOnInit() {
    this.codeForm = new FormGroup({
      keyCode: new FormControl(this.inputValue, {
        validators: [Validators.required, Validators.minLength(7)],
        updateOn: 'submit',
      }),
    });
  }

  get keyCode() {
    return this.codeForm.get('keyCode');
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

/**
* @title Accordion Error Example
*/
@Component({
  selector: 'accordion-error-example',
  templateUrl: './accordion-error-example.html',
  styleUrls: ['./accordion-error-example.css']
})
export class AccordionErrorExampleComponent {

  public showErrorPayment: boolean = true;
  public showErrorInfo: boolean = false;

  formGroupInfo: FormGroup;
  formGroupPayment: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.formGroupInfo = this.fb.group({
      surname: ['Mustermann', Validators.required]
    });
    this.formGroupPayment = this.fb.group({
      input: [, Validators.required]
    });
    this.formGroupPayment.markAllAsTouched();
  }

  get infoHasError() {
    return this.formGroupInfo.get('surname').hasError('required');
  }

  get paymentHasError() {
    return this.formGroupPayment.get('input').hasError('required');
  }
}

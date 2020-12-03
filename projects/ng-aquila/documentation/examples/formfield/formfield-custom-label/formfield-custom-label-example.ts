import { Component } from '@angular/core';

/**
* @title Custom formfield label example
*/
@Component({
  templateUrl: './formfield-custom-label-example.html'
})
export class FormfieldCustomLabelExampleComponent {

  isOptional = '(optional)';

  addOptionalSuffix() {
    this.isOptional = this.isOptional === '' ? '(optional)' : '';
  }
}

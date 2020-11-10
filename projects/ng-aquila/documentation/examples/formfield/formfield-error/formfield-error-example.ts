import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
* @title Error example
*/
@Component({
  templateUrl: './formfield-error-example.html'
})
export class FormfieldErrorExampleComponent implements AfterContentInit {

  @ViewChild('exampleErrorNgModel', { static: true }) exampleErrorNgModel: NxInputDirective;
  @ViewChild('exampleErrorNgModelHint', { static: true }) exampleErrorNgModelHint: NxInputDirective;
  public valueSupplementError;
  public valueSupplementErrorHint;

  ngAfterContentInit() {
    this.exampleErrorNgModel.ngControl.control.markAsTouched();
    this.exampleErrorNgModelHint.ngControl.control.markAsTouched();
  }

}

import { Component, ViewChild, AfterContentInit } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Expert error message example
 */
@Component({
  templateUrl: './formfield-expert-error-example.html'
})
export class FormfieldExpertErrorExampleComponent implements AfterContentInit {
  @ViewChild('exampleErrorNgModel', { static: true }) exampleErrorNgModel: NxInputDirective;
  @ViewChild('exampleErrorWithHintNgModel', { static: true }) exampleErrorWithHintNgModel: NxInputDirective;
  public valueError;
  public valueErrorWithHint;

  ngAfterContentInit() {
    this.exampleErrorNgModel.ngControl.control.markAsTouched();
    this.exampleErrorWithHintNgModel.ngControl.control.markAsTouched();
  }
}

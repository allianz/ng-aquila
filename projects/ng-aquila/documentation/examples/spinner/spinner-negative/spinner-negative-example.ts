import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { Component } from '@angular/core';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'spinner-negative-example',
  templateUrl: './spinner-negative-example.html',
  styleUrls: ['./spinner-negative-example.css'],
  imports: [NxSpinnerComponent, NxHeadlineComponent],
})
export class SpinnerNegativeExampleComponent {}

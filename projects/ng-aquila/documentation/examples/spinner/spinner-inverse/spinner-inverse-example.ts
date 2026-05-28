import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { Component } from '@angular/core';

/**
 * @title Inverse styling example
 */
@Component({
  selector: 'spinner-inverse-example',
  templateUrl: './spinner-inverse-example.html',
  styleUrls: ['./spinner-inverse-example.css'],
  imports: [NxSpinnerComponent, NxHeadlineComponent],
})
export class SpinnerInverseExampleComponent {}

import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { Component } from '@angular/core';

/**
 * @title Spinner sizes
 */
@Component({
  selector: 'spinner-sizes-example',
  templateUrl: './spinner-sizes-example.html',
  styleUrls: ['./spinner-sizes-example.css'],
  imports: [NxSpinnerComponent, NxHeadlineComponent],
})
export class SpinnerSizesExampleComponent {}

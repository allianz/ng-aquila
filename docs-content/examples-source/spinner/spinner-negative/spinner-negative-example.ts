import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'spinner-negative-example',
    templateUrl: './spinner-negative-example.html',
    styleUrls: ['./spinner-negative-example.css'],
    standalone: true,
    imports: [NxSpinnerComponent, NxHeadlineComponent],
})
export class SpinnerNegativeExampleComponent {}

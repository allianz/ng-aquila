import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxSpinnerComponent } from '@aposin/ng-aquila/spinner';

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

import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Headline Negative Example
 */
@Component({
    selector: 'headline-negative-example',
    templateUrl: './headline-negative-example.html',
    styleUrls: ['./headline-negative-example.css'],
    standalone: true,
    imports: [NxHeadlineComponent, NxLinkComponent],
})
export class HeadlineNegativeExampleComponent {}

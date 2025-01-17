import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxLinkComponent } from '@aposin/ng-aquila/link';

/**
 * @title Headline Links Example
 */
@Component({
    selector: 'headline-links-example',
    templateUrl: './headline-links-example.html',
    styleUrls: ['./headline-links-example.css'],
    imports: [NxHeadlineComponent, NxLinkComponent],
})
export class HeadlineLinksExampleComponent {}

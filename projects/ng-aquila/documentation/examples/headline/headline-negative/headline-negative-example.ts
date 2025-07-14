import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';

/**
 * @title Headline Negative Example
 */
@Component({
  selector: 'headline-negative-example',
  templateUrl: './headline-negative-example.html',
  styleUrls: ['./headline-negative-example.css'],
  imports: [NxHeadlineComponent, NxLinkComponent],
})
export class HeadlineNegativeExampleComponent {}

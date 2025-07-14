import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
import { Component } from '@angular/core';

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

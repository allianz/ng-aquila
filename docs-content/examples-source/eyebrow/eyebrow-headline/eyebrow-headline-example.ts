import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

/**
 * @title Eyebrow as part of Headline example
 */
@Component({
  selector: 'eyebrow-headline-example',
  templateUrl: './eyebrow-headline-example.html',
  styleUrls: ['eyebrow-headline-example.css'],
  imports: [NxEyebrowComponent, NxHeadlineComponent],
})
export class EyebrowHeadlineExampleComponent {}

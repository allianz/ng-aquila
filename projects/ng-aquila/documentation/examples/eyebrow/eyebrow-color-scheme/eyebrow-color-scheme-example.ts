import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { Component } from '@angular/core';

/**
 * @title Eyebrow color scheme example
 */
@Component({
  selector: 'eyebrow-color-scheme-example',
  templateUrl: './eyebrow-color-scheme-example.html',
  styleUrls: ['./eyebrow-color-scheme-example.css'],
  imports: [NxEyebrowComponent, NxHeadlineComponent],
})
export class EyebrowColorSchemeExampleComponent {}

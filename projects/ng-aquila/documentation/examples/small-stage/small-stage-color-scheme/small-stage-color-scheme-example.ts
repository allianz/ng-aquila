import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSmallStageComponent } from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small Stage color scheme example
 */
@Component({
  selector: 'small-stage-color-scheme-example',
  templateUrl: './small-stage-color-scheme-example.html',
  styleUrls: ['./small-stage-color-scheme-example.css'],
  imports: [NxSmallStageComponent, NxHeadlineComponent, NxEyebrowComponent],
})
export class SmallStageColorSchemeExampleComponent {}

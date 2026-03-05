import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSmallStageComponent } from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small Stage example
 */
@Component({
  selector: 'small-stage-example',
  templateUrl: './small-stage-example.html',
  styleUrls: ['./small-stage-example.css'],
  imports: [NxSmallStageComponent, NxHeadlineComponent, NxEyebrowComponent],
})
export class SmallStageExampleComponent {}

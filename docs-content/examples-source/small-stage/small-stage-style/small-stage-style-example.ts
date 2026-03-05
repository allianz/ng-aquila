import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageImageDirective,
} from '@allianz/ng-aquila/small-stage';
import { NxAttentionColorComponent } from '@allianz/ng-aquila/text';
import { Component } from '@angular/core';
/**
 * @title Small Stage style example
 */
@Component({
  selector: 'small-stage-style-example',
  templateUrl: './small-stage-style-example.html',
  styleUrls: ['./small-stage-style-example.css'],
  imports: [
    NxSmallStageComponent,
    NxHeadlineComponent,
    NxEyebrowComponent,
    NxAttentionColorComponent,
    NxSmallStageImageDirective,
  ],
})
export class SmallStageStyleExampleComponent {}

import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageImageDirective,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small Stage with Image example
 */
@Component({
  selector: 'small-stage-image-example',
  templateUrl: './small-stage-image-example.html',
  styleUrls: ['./small-stage-image-example.css'],
  imports: [
    NxSmallStageComponent,
    NxHeadlineComponent,
    NxEyebrowComponent,
    NxSmallStageImageDirective,
  ],
})
export class SmallStageImageExampleComponent {}

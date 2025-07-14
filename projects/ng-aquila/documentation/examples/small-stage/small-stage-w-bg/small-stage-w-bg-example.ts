import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageImageBottomDirective,
  NxSmallStageImageDirective,
  NxSmallStageImageEndDirective,
  NxSmallStageImageStartDirective,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small stage with background example
 */
@Component({
  selector: 'small-stage-w-bg-example',
  templateUrl: './small-stage-w-bg-example.html',
  styleUrls: ['./small-stage-w-bg-example.css'],
  imports: [
    NxSmallStageComponent,
    NxHeadlineComponent,
    NxSmallStageImageDirective,
    NxSmallStageImageStartDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageImageBottomDirective,
  ],
})
export class SmallStageWithBackgroundExampleComponent {}

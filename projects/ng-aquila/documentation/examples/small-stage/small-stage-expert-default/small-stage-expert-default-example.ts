import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageImageDirective,
  NxSmallStageImageEndDirective,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small stage expert default example
 */
@Component({
  selector: 'small-stage-expert-default-example',
  templateUrl: './small-stage-expert-default-example.html',
  styleUrls: ['./small-stage-expert-default-example.css'],
  imports: [
    NxSmallStageComponent,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
    NxHeadlineComponent,
  ],
})
export class SmallStageExpertDefaultExampleComponent {}

import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageImageDirective,
  NxSmallStageImageEndDirective,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small stage expert narrow content example
 */
@Component({
  selector: 'small-stage-expert-content-narrow-example',
  templateUrl: './small-stage-expert-content-narrow-example.html',
  styleUrls: ['./small-stage-expert-content-narrow-example.css'],
  imports: [
    NxSmallStageComponent,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
    NxCopytextComponent,
    NxHeadlineComponent,
  ],
})
export class SmallStageExpertContentNarrowExampleComponent {}

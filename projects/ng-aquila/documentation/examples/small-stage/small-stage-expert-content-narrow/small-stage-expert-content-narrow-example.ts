import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxSmallStageComponent,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
} from '@aposin/ng-aquila/small-stage';

/**
 * @title Small stage expert narrow content example
 */
@Component({
    selector: 'small-stage-expert-content-narrow-example',
    templateUrl: './small-stage-expert-content-narrow-example.html',
    styleUrls: ['./small-stage-expert-content-narrow-example.css'],
    standalone: true,
    imports: [
        NxSmallStageComponent,
        NxSmallStageImageDirective,
        NxSmallStageImageEndDirective,
        NxCopytextComponent,
        NxHeadlineComponent,
    ],
})
export class SmallStageExpertContentNarrowExampleComponent {}

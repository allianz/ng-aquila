import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxSmallStageComponent,
    NxSmallStageImageBottomDirective,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageImageStartDirective,
} from '@aposin/ng-aquila/small-stage';

/**
 * @title Small stage with background example
 */
@Component({
    selector: 'small-stage-w-bg-example',
    templateUrl: './small-stage-w-bg-example.html',
    styleUrls: ['./small-stage-w-bg-example.css'],
    standalone: true,
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

import { Component } from '@angular/core';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxSmallStageComponent,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
} from '@aposin/ng-aquila/small-stage';

/**
 * @title Small stage expert default example
 */
@Component({
    selector: 'small-stage-expert-default-example',
    templateUrl: './small-stage-expert-default-example.html',
    styleUrls: ['./small-stage-expert-default-example.css'],
    standalone: true,
    imports: [
        NxSmallStageComponent,
        NxSmallStageImageDirective,
        NxSmallStageImageEndDirective,
        NxHeadlineComponent,
    ],
})
export class SmallStageExpertDefaultExampleComponent {}

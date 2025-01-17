import { Component } from '@angular/core';
import {
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
} from '@aposin/ng-aquila/breadcrumb';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxSmallStageComponent,
    NxSmallStageHeaderDirective,
    NxSmallStageImageBottomDirective,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageImageStartDirective,
} from '@aposin/ng-aquila/small-stage';

/**
 * @title Small stage content variation example
 */
@Component({
    selector: 'small-stage-content-variation-example',
    templateUrl: './small-stage-content-variation-example.html',
    styleUrls: ['./small-stage-content-variation-example.css'],
    imports: [
        NxSmallStageComponent,
        NxLinkComponent,
        NxSmallStageHeaderDirective,
        NxIconComponent,
        NxHeadlineComponent,
        NxSmallStageImageDirective,
        NxSmallStageImageStartDirective,
        NxSmallStageImageEndDirective,
        NxSmallStageImageBottomDirective,
        NxBreadcrumbComponent,
        NxBreadcrumbItemComponent,
        NxCopytextComponent,
    ],
})
export class SmallStageContentVariationExampleComponent {}

import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
} from '@aposin/ng-aquila/breadcrumb';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import {
    NxSmallStageComponent,
    NxSmallStageHeaderDirective,
    NxSmallStageImageBottomDirective,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageImageStartDirective,
} from '@aposin/ng-aquila/small-stage';

/**
 * @title Small stage default example
 */
@Component({
    selector: 'small-stage-default-example',
    templateUrl: './small-stage-default-example.html',
    styleUrls: ['./small-stage-default-example.css'],
    standalone: true,
    imports: [
        NxSmallStageComponent,
        NxSmallStageHeaderDirective,
        NxBreadcrumbComponent,
        NgFor,
        NxBreadcrumbItemComponent,
        NxSmallStageImageDirective,
        NxSmallStageImageStartDirective,
        NxSmallStageImageEndDirective,
        NxSmallStageImageBottomDirective,
        NxHeadlineComponent,
        NxCopytextComponent,
    ],
})
export class SmallStageDefaultExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];

    dynamicItems = this.items;

    goToItem(i: number) {
        this.dynamicItems = this.items.slice(0, i + 1);
    }
}

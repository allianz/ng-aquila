import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageHeaderDirective,
  NxSmallStageImageBottomDirective,
  NxSmallStageImageDirective,
  NxSmallStageImageEndDirective,
  SMALL_STAGE_DEFAULT_OPTIONS,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small Stage Functional Grid example
 */
@Component({
  selector: 'small-stage-functional-grid-example',
  templateUrl: './small-stage-functional-grid-example.html',
  styleUrls: ['./small-stage-functional-grid-example.css'],
  imports: [
    NxSmallStageComponent,
    NxSmallStageHeaderDirective,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    NxSmallStageImageDirective,
    NxSmallStageImageEndDirective,
    NxSmallStageImageBottomDirective,
    NxHeadlineComponent,
    NxEyebrowComponent,
  ],
  providers: [
    {
      provide: SMALL_STAGE_DEFAULT_OPTIONS,
      useValue: { appearance: 'expert' },
    },
  ],
})
export class SmallStageFunctionalGridExampleComponent {
  items = ['Home', 'Insurance', 'Health Insurance'];

  dynamicItems = this.items;

  goToItem(i: number) {
    this.dynamicItems = this.items.slice(0, i + 1);
  }
}

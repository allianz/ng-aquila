import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { NxEyebrowComponent } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageHeaderDirective,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small Stage Header example
 */
@Component({
  selector: 'small-stage-header-example',
  templateUrl: './small-stage-header-example.html',
  styleUrls: ['./small-stage-header-example.css'],
  imports: [
    NxSmallStageComponent,
    NxSmallStageHeaderDirective,
    NxBreadcrumbComponent,
    NxBreadcrumbItemComponent,
    NxHeadlineComponent,
    NxEyebrowComponent,
  ],
})
export class SmallStageHeaderExampleComponent {
  items = ['Home', 'Insurance', 'Health Insurance'];

  dynamicItems = this.items;

  goToItem(i: number) {
    this.dynamicItems = this.items.slice(0, i + 1);
  }
}

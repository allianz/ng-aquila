import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import {
  NxSmallStageComponent,
  NxSmallStageHeaderDirective,
  NxSmallStageImageBottomDirective,
  NxSmallStageImageDirective,
  NxSmallStageImageEndDirective,
  NxSmallStageImageStartDirective,
} from '@allianz/ng-aquila/small-stage';
import { Component } from '@angular/core';

/**
 * @title Small stage default example
 */
@Component({
  selector: 'small-stage-default-example',
  templateUrl: './small-stage-default-example.html',
  styleUrls: ['./small-stage-default-example.css'],
  imports: [
    NxSmallStageComponent,
    NxSmallStageHeaderDirective,
    NxBreadcrumbComponent,
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

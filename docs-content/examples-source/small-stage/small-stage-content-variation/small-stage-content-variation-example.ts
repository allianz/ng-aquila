import {
  NxBreadcrumbComponent,
  NxBreadcrumbItemComponent,
} from '@allianz/ng-aquila/breadcrumb';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxLinkComponent } from '@allianz/ng-aquila/link';
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

import {
  NxExpansionPanelComponent,
  NxExpansionPanelHeaderComponent,
  NxExpansionPanelTitleDirective,
} from '@allianz/ng-aquila/accordion';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Recommendation table expert example
 */
@Component({
  selector: 'recommendation-table-expert-example',
  templateUrl: './recommendation-table-expert-example.html',
  styleUrls: ['./recommendation-table-expert-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxCopytextComponent,
    NxHeadlineComponent,
    NxListComponent,
    NxListIconComponent,
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
  ],
})
export class RecommendationTableExpertExampleComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxListComponent, NxListIconComponent } from '@aposin/ng-aquila/list';

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

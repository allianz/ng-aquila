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
 * @title Recommendation table example
 */
@Component({
    selector: 'recommendation-table-example',
    templateUrl: './recommendation-table-example.html',
    styleUrls: ['./recommendation-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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
export class RecommendationTableExampleComponent {}

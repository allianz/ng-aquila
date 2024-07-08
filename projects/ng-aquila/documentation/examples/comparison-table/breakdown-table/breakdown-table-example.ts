import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    NxExpansionPanelComponent,
    NxExpansionPanelHeaderComponent,
    NxExpansionPanelTitleDirective,
} from '@aposin/ng-aquila/accordion';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxDataDisplayComponent } from '@aposin/ng-aquila/data-display';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';

/**
 * @title Breakdown table example
 */
@Component({
    selector: 'breakdown-table-example',
    templateUrl: './breakdown-table-example.html',
    styleUrls: ['./breakdown-table-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxCopytextComponent,
        NxHeadlineComponent,
        NxExpansionPanelComponent,
        NxExpansionPanelHeaderComponent,
        NxExpansionPanelTitleDirective,
        NxDataDisplayComponent,
        CurrencyPipe,
    ],
})
export class BreakdownTableExampleComponent {}

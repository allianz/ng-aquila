import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxRadioToggleButtonComponent,
    NxRadioToggleComponent,
} from '@aposin/ng-aquila/radio-toggle';
import {
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
} from '@aposin/ng-aquila/table';

/**
 * @title Sticky Columns Table
 */
@Component({
    selector: 'table-sticky-column-example',
    templateUrl: './table-sticky-column-example.html',
    styleUrls: ['./table-sticky-column-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        NxCopytextComponent,
        NxRadioToggleComponent,
        NxRadioToggleButtonComponent,
        NxTableComponent,
        NxTableRowComponent,
        NxHeaderCellDirective,
        NxTableCellComponent,
        NxLinkComponent,
        RouterLink,
        NxBadgeComponent,
    ],
})
export class TableStickyColumnExampleComponent {
    stickyColumn = 'first';
    tableElements = [
        {
            product: 'Car',
            contractNumber: 1234,
            desc: 'This is a contract',
            website: 'www.example.com',
            endingAt: '1/3/2020',
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Health',
            contractNumber: 2423,
            desc: 'This is another contract',
            website: 'www.allianz.com',
            endingAt: '4/2/2020',
            status: 'active',
            statusText: 'accepted',
        },
        {
            product: 'Car',
            contractNumber: 353455,
            desc: 'Lorem ipsum dolor sit amet, csis libero. ',
            website: 'www.example.com',
            endingAt: '6/2/2020',
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Home',
            contractNumber: 22344,
            desc: 'This is a description of a contract',
            website: 'www.example.org',
            endingAt: '1/2/2027',
            status: 'critical',
            statusText: 'rejected',
        },
    ];
}

import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
import { NxLinkComponent } from '@aposin/ng-aquila/link';
import {
    NxHeaderCellDirective,
    NxHeaderResizeDirective,
    NxTableCellClipDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
} from '@aposin/ng-aquila/table';

@Component({
    selector: 'table-column-resize-example',
    templateUrl: './table-column-resize-example.html',
    styleUrls: ['./table-column-resize-example.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NxTableComponent,
        NxTableCellClipDirective,
        NxTableRowComponent,
        NxHeaderCellDirective,
        NxHeaderResizeDirective,
        NgFor,
        NxTableCellComponent,
        NxLinkComponent,
        RouterLink,
        NxBadgeComponent,
    ],
})
export class TableColumnResizeExample {
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

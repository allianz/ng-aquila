import { Component } from '@angular/core';
import { NxDynamicTableColumnDefinition } from '@aposin/ng-aquila/dynamic-table';

/**
 * @title Popover Table Example
 */
@Component({
    selector: 'popover-table-example',
    templateUrl: './popover-table-example.html',
    styleUrls: ['./popover-table-example.css'],
})
export class PopoverTableExampleComponent {
    data = [
        {
            nxDirection: 'top',
            fallback1: 'top-left',
            fallback2: 'top-right',
            fallback3: 'bottom',
            fallback4: 'bottom-left',
            fallback5: 'bottom-right',
            fallback6: 'left',
            fallback7: 'right',
        },
        {
            nxDirection: 'bottom',
            fallback1: 'bottom-left',
            fallback2: 'bottom-right',
            fallback3: 'top',
            fallback4: 'top-left',
            fallback5: 'top-right',
            fallback6: 'left',
            fallback7: 'right',
        },
        {
            nxDirection: 'left',
            fallback1: 'right',
            fallback2: 'bottom',
            fallback3: 'bottom-left',
            fallback4: 'bottom-right',
            fallback5: 'top',
            fallback6: 'top-left',
            fallback7: 'top-right',
        },
        {
            nxDirection: 'right',
            fallback1: 'left',
            fallback2: 'bottom',
            fallback3: 'bottom-left',
            fallback4: 'bottom-right',
            fallback5: 'top',
            fallback6: 'top-left',
            fallback7: 'top-right',
        },
    ];
    displayedColumns: NxDynamicTableColumnDefinition[] = [
        // HINT: \xa0 is a non-breaking space, so the table header looks nicer
        { title: 'nxDirection', key: 'nxDirection', type: 'string' },
        { title: 'fallback\xa01', key: 'fallback1', type: 'string' },
        { title: 'fallback\xa02', key: 'fallback2', type: 'string' },
        { title: 'fallback\xa03', key: 'fallback3', type: 'string' },
        { title: 'fallback\xa04', key: 'fallback4', type: 'string' },
        { title: 'fallback\xa05', key: 'fallback5', type: 'string' },
        { title: 'fallback\xa06', key: 'fallback6', type: 'string' },
        { title: 'fallback\xa07', key: 'fallback7', type: 'string' },
    ];
}

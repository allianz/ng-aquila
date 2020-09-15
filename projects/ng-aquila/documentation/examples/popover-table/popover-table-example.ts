import { Component } from '@angular/core';

/**
 * @title Popover Table Example
 */
 @Component({
  selector: 'nx-popover-table-example',
  templateUrl: './popover-table-example.html'
})
export class PopoverTableExampleComponent {
  data = [
    {
      nxDirection: 'right',
      nospaceon: 'right',
      fallback: 'bottom'
    },
    {
      nxDirection: 'right',
      nospaceon: 'right, bottom',
      fallback: 'left'
    },
    {
      nxDirection: 'right',
      nospaceon: 'right, bottom, left',
      fallback: 'top'
    },
    {
      nxDirection: 'bottom',
      nospaceon: 'bottom',
      fallback: 'right'
    },
    {
      nxDirection: 'bottom',
      nospaceon: 'bottom, right',
      fallback: 'left'
    },
    {
      nxDirection: 'bottom',
      nospaceon: 'bottom, right, left',
      fallback: 'top'
    },
    {
      nxDirection: 'left',
      nospaceon: 'left',
      fallback: 'bottom'
    },
    {
      nxDirection: 'left',
      nospaceon: 'left, bottom',
      fallback: 'right'
    },
    {
      nxDirection: 'left',
      nospaceon: 'bottom, right, left',
      fallback: 'top'
    },
    {
      nxDirection: 'top',
      nospaceon: 'top',
      fallback: 'bottom'
    },
    {
      nxDirection: 'top',
      nospaceon: 'top, bottom',
      fallback: 'right'
    },
    {
      nxDirection: 'top',
      nospaceon: 'top, bottom, right',
      fallback: 'left'
    }
  ];
  displayedColumns = [
    { title: 'nxDirection', key: 'nxDirection', type: 'string' },
    { title: 'no space on', key: 'nospaceon', type: 'string' },
    { title: 'fallback', key: 'fallback', type: 'string' }
  ];
}

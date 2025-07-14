import { NxBadgeComponent, NxBadgeType } from '@allianz/ng-aquila/badge';
import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuContentDirective,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@allianz/ng-aquila/table';
import { Component } from '@angular/core';

interface Contract {
  id: string;
  user: string;
  status: NxBadgeType;
  documents: string[];
}

/**
 * @title Data Context Menu Example
 */
@Component({
  selector: 'context-menu-data-example',
  templateUrl: './context-menu-data-example.html',
  styleUrls: ['context-menu-data-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuContentDirective,
    NxContextMenuItemComponent,
    NxIconComponent,
    NxContextMenuTriggerDirective,
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxBadgeComponent,
    NxIconButtonComponent,
  ],
})
export class ContextMenuDataExampleComponent {
  contracts: Contract[] = [
    {
      id: '23412',
      user: 'Anna Schuster',
      status: 'active',
      documents: ['Contract 01/04/2017'],
    },
    {
      id: '09090',
      user: 'Max Pecu',
      status: 'active',
      documents: ['Contract 11/07/2015'],
    },
    {
      id: '45234',
      user: 'Sefan Maier',
      status: 'active',
      documents: ['Contract 01/01/2017'],
    },
  ];
}

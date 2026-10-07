import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import {
  NxPaginationAlignment,
  NxPaginationComponent,
  NxPaginationControlDisplay,
  NxPaginationControlsPosition,
} from '@allianz/ng-aquila/pagination';
import { Component, signal } from '@angular/core';

/**
 * @title Configurable Advanced Pagination Example
 */
@Component({
  selector: 'pagination-advanced-controls-example',
  templateUrl: './pagination-advanced-controls-example.html',
  styleUrls: ['./pagination-advanced-controls-example.css'],
  imports: [
    NxPaginationComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxFormfieldComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
  ],
})
export class PaginationAdvancedControlsExampleComponent {
  readonly controlsPositions: NxPaginationControlsPosition[] = [
    'around',
    'start',
    'end',
  ];

  readonly alignments: NxPaginationAlignment[] = ['start', 'space-between'];

  readonly controlDisplays: NxPaginationControlDisplay[] = [
    'icon',
    'label',
    'hidden',
  ];

  readonly controlsPosition = signal<NxPaginationControlsPosition>('around');
  readonly alignment = signal<NxPaginationAlignment>('start');
  readonly firstLastControls = signal<NxPaginationControlDisplay>('icon');
  readonly prevNextControls = signal<NxPaginationControlDisplay>('icon');

  readonly count = 210;
  readonly perPage = 10;
  readonly page = signal(4);

  prevPage() {
    this.page.update((page) => page - 1);
  }

  nextPage() {
    this.page.update((page) => page + 1);
  }

  goToPage(n: number) {
    this.page.set(n);
  }
}

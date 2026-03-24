import {
  NxVirtualFor,
  NxVirtualViewportComponent,
  VirtualRangeChangeEvent,
} from '@allianz/ng-aquila/virtual-scroll';
import { Component, signal } from '@angular/core';

interface ItemClickInfo {
  index: number;
  value: number;
}

/**
 * @title Events example
 */
@Component({
  selector: 'virtual-scroll-events-example',
  templateUrl: './virtual-scroll-events-example.html',
  styleUrls: ['./virtual-scroll-events-example.css'],
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
export class VirtualScrollEventsExampleComponent {
  readonly items = Array.from({ length: 1000 }, (_, i) => ({
    value: i,
    label: `Item ${i + 1}`,
  }));

  readonly lastClicked = signal<ItemClickInfo | null>(null);
  readonly visibleRange = signal<VirtualRangeChangeEvent | null>(null);

  onItemClick(item: { value: number; label: string }, index: number): void {
    this.lastClicked.set({ index, value: item.value });
  }
}

import {
  NxVirtualFor,
  NxVirtualViewportComponent,
} from '@allianz/ng-aquila/virtual-scroll';
import { Component } from '@angular/core';

/**
 * @title Basic virtual scroll example
 */
@Component({
  selector: 'virtual-scroll-basic-example',
  templateUrl: './virtual-scroll-basic-example.html',
  styleUrls: ['./virtual-scroll-basic-example.css'],
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
export class VirtualScrollBasicExampleComponent {
  readonly items = Array.from({ length: 10000 }, (_, i) => ({
    value: i,
    label: `Item ${i + 1}`,
  }));
}

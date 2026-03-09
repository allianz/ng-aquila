import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxVirtualFor,
  NxVirtualViewportComponent,
} from '@allianz/ng-aquila/virtual-scroll';
import { Component, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Programmatic navigation example
 */
@Component({
  selector: 'virtual-scroll-navigation-example',
  templateUrl: './virtual-scroll-navigation-example.html',
  styleUrls: ['./virtual-scroll-navigation-example.css'],
  imports: [
    NxVirtualViewportComponent,
    NxVirtualFor,
    NxButtonComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
  ],
})
export class VirtualScrollNavigationExampleComponent {
  readonly viewport = viewChild(NxVirtualViewportComponent);

  readonly items = Array.from({ length: 10000 }, (_, i) => ({
    value: i,
    label: `Item ${i + 1}`,
  }));

  targetIndex = 5000;

  scrollToTop(): void {
    this.viewport()?.scrollToIndex(0, 'smooth');
  }

  scrollToBottom(): void {
    this.viewport()?.scrollToIndex(this.items.length - 1, 'smooth');
  }

  scrollToIndex(): void {
    this.viewport()?.scrollToIndex(this.targetIndex, 'smooth');
  }

  scrollToValue(): void {
    const index = this.items.findIndex(
      (item) => item.value === this.targetIndex,
    );
    if (index >= 0) {
      this.viewport()?.scrollToIndex(index, 'smooth');
    }
  }
}

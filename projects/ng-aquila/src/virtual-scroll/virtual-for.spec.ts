import {
  ChangeDetectionStrategy,
  Component,
  provideZonelessChangeDetection,
  signal,
  viewChild,
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { NxVirtualFor, NxVirtualGroupOutlet } from './virtual-for';
import { NxVirtualViewportComponent } from './virtual-scroll-viewport';

interface TestItem {
  id: number;
  name: string;
}

function generateItems(count: number): TestItem[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: `Item ${i}`,
  }));
}

@Component({
  selector: 'test-virtual-for-basic-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" [overscan]="2" style="height: 200px; display: block;">
      <div *nxVirtualFor="let item of items(); trackBy: 'id'" class="test-item">
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class BasicTestComponent {
  items = signal<TestItem[]>([]);
  viewport = viewChild.required(NxVirtualViewportComponent);
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  selector: 'test-function-track-by-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <div *nxVirtualFor="let item of items(); trackBy: trackByFn" class="test-item">
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class FunctionTrackByTestComponent {
  items = signal<TestItem[]>([]);
  trackByFn = (_index: number, item: TestItem) => item.id;
  viewport = viewChild.required(NxVirtualViewportComponent);
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  selector: 'test-context-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <div
        *nxVirtualFor="
          let item of items();
          let i = index;
          let c = count;
          let f = first;
          let l = last;
          let e = even;
          let o = odd
        "
        class="test-item"
        [attr.data-index]="i"
        [attr.data-count]="c"
        [attr.data-first]="f"
        [attr.data-last]="l"
        [attr.data-even]="e"
        [attr.data-odd]="o"
      >
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class ContextTestComponent {
  items = signal<TestItem[]>([]);
  viewport = viewChild.required(NxVirtualViewportComponent);
}

interface TestGroup {
  id: number;
  name: string;
}

@Component({
  selector: 'test-group-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" [overscan]="2" style="height: 200px; display: block;">
      <ng-template #group let-group>
        <div class="test-group" role="group" [attr.aria-label]="group.name">
          <ng-container nxVirtualGroupOutlet />
        </div>
      </ng-template>
      <ng-template #altGroup let-group>
        <section class="test-group alt-group" [attr.aria-label]="group.name">
          <ng-container nxVirtualGroupOutlet />
        </section>
      </ng-template>
      <div
        *nxVirtualFor="
          let item of items();
          trackBy: 'id';
          groupBy: groupOf;
          groupTrackBy: groupKey;
          groupTemplate: alt ? altGroup : group
        "
        class="test-item"
      >
        {{ item.name }}
        <button type="button">{{ item.name }}</button>
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor, NxVirtualGroupOutlet],
})
class GroupTestComponent {
  /** Groups of ten items, items with an id of 95 or higher have no group. */
  groups: TestGroup[] = Array.from({ length: 10 }, (_, i) => ({ id: i, name: `Group ${i}` }));
  items = signal<TestItem[]>([]);
  groupOf = (item: TestItem): TestGroup | null =>
    item.id >= 95 ? null : this.groups[Math.floor(item.id / 10)];
  groupKey: string = '';
  alt = false;
  viewport = viewChild.required(NxVirtualViewportComponent);
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  selector: 'test-group-without-outlet-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <ng-template #group><div role="group"></div></ng-template>
      <div
        *nxVirtualFor="let item of items(); groupBy: groupOf; groupTemplate: group"
        class="test-item"
      >
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class GroupWithoutOutletTestComponent {
  items = signal<TestItem[]>(generateItems(100));
  groupOf = () => 'group';
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  selector: 'test-group-outlet-in-control-flow-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <ng-template #group let-group>
        <div class="test-group" role="group" [attr.aria-label]="group">
          @switch (outlet) {
            @case ('first') {
              <ng-container nxVirtualGroupOutlet />
            }
            @case ('second') {
              <ng-container nxVirtualGroupOutlet />
            }
          }
        </div>
      </ng-template>
      <div
        *nxVirtualFor="let item of items(); groupBy: groupOf; groupTemplate: group"
        class="test-item"
      >
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor, NxVirtualGroupOutlet],
})
class GroupOutletInControlFlowTestComponent {
  items = signal<TestItem[]>(generateItems(3));
  outlet: 'first' | 'second' | 'none' = 'first';
  groupOf = () => 'group';
}

@Component({
  selector: 'test-misplaced-group-outlet-test-component',
  template: `<ng-container nxVirtualGroupOutlet />`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualGroupOutlet],
})
class MisplacedGroupOutletTestComponent {}

@Component({
  selector: 'test-positioned-group-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <ng-template #group>
        <div role="group" style="transform: translateZ(0)">
          <ng-container nxVirtualGroupOutlet />
        </div>
      </ng-template>
      <div *nxVirtualFor="let item of items(); groupBy: groupOf; groupTemplate: group">
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxVirtualViewportComponent, NxVirtualFor, NxVirtualGroupOutlet],
})
class PositionedGroupTestComponent {
  items = signal<TestItem[]>(generateItems(3));
  groupOf = () => 'group';
}

@Component({
  selector: 'test-control-flow-root-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <div *nxVirtualFor="let item of items(); trackBy: 'id'" class="test-item">
        @if (item) {
          <div style="height: 30px">{{ item.name }}</div>
        }
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class ControlFlowRootTestComponent {
  items = signal<TestItem[]>(generateItems(100));
  virtualFor = viewChild.required(NxVirtualFor);
}

interface SizedItem {
  id: number;
  height: number;
}

@Component({
  selector: 'test-sized-items-test-component',
  template: `
    <nx-virtual-viewport
      [itemHeight]="44"
      [overscan]="overscan()"
      style="height: 200px; display: block;"
    >
      <div
        *nxVirtualFor="let item of items(); trackBy: 'id'"
        [style.height.px]="rowHeight() ?? item.height"
      ></div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class SizedItemsTestComponent {
  items = signal<SizedItem[]>([]);
  overscan = signal(20);
  /** Resizes the rows without changing the data, so only the `ResizeObserver` sees it. */
  rowHeight = signal<number | null>(null);
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  selector: 'test-duplicate-keys-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="44" style="height: 200px; display: block;">
      <div *nxVirtualFor="let item of items; let first = first" [style.height.px]="first ? 56 : 44">
        {{ item }}
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class DuplicateKeysTestComponent {
  /** Without trackBy, both 'a' rows share a key and so a cached height. */
  items = ['a', 'a', 'b'];
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  selector: 'test-padded-items-test-component',
  template: `
    <nx-virtual-viewport [itemHeight]="44" style="height: 400px; display: block;">
      <div
        *nxVirtualFor="let item of items(); trackBy: 'id'"
        [style.padding]="item.selected ? '10px 0' : '0'"
      >
        <div style="height: 44px"></div>
      </div>
    </nx-virtual-viewport>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class PaddedItemsTestComponent {
  items = signal(Array.from({ length: 50 }, (_, id) => ({ id, selected: false })));
}

function animationFrames(count: number): Promise<void> {
  return new Promise((resolve) => {
    const next = (remaining: number) =>
      remaining === 0 ? resolve() : requestAnimationFrame(() => next(remaining - 1));
    next(count);
  });
}

describe('NxVirtualFor', () => {
  describe('basic functionality', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges();
      const viewport = fixture.nativeElement.querySelector('nx-virtual-viewport');
      expect(viewport).toBeTruthy();
    });

    it('should render visible items only', fakeAsync(() => {
      component.items.set(generateItems(1000));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      // With 200px height and 40px items, should render ~5 items + 2 overscan on each side = ~9
      expect(renderedItems.length).toBeLessThan(15);
      expect(renderedItems.length).toBeGreaterThan(0);
    }));

    it('should calculate total height correctly', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      // 100 items * 40px = 4000px (before measurement adjusts)
      expect(viewport.totalHeight()).toBe(4000);
    }));

    it('should handle empty items array', fakeAsync(() => {
      component.items.set([]);
      fixture.detectChanges();
      tick();

      const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      expect(renderedItems.length).toBe(0);

      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(0);
    }));

    it('should position items with data-virtual-index attribute', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const firstItem = fixture.nativeElement.querySelector('.test-item');
      expect(firstItem.hasAttribute('data-virtual-index')).toBe(true);
      expect(firstItem.getAttribute('data-virtual-index')).toBe('0');
    }));

    it('should position items absolutely', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const firstItem = fixture.nativeElement.querySelector('.test-item') as HTMLElement;
      expect(firstItem.style.position).toBe('absolute');
    }));
  });

  describe('trackBy with function', () => {
    let fixture: ComponentFixture<FunctionTrackByTestComponent>;
    let component: FunctionTrackByTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FunctionTrackByTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FunctionTrackByTestComponent);
      component = fixture.componentInstance;
    });

    it('should use function trackBy', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      expect(renderedItems.length).toBeGreaterThan(0);
    }));
  });

  describe('template context', () => {
    let fixture: ComponentFixture<ContextTestComponent>;
    let component: ContextTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [ContextTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(ContextTestComponent);
      component = fixture.componentInstance;
    });

    it('should provide correct index', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.test-item');
      expect(items[0].getAttribute('data-index')).toBe('0');
    }));

    it('should provide correct count', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const item = fixture.nativeElement.querySelector('.test-item');
      expect(item.getAttribute('data-count')).toBe('10');
    }));

    it('should provide correct first flag', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.test-item');
      expect(items[0].getAttribute('data-first')).toBe('true');
      if (items.length > 1) {
        expect(items[1].getAttribute('data-first')).toBe('false');
      }
    }));

    it('should provide correct even/odd flags', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.test-item');
      expect(items[0].getAttribute('data-even')).toBe('true');
      expect(items[0].getAttribute('data-odd')).toBe('false');
      if (items.length > 1) {
        expect(items[1].getAttribute('data-even')).toBe('false');
        expect(items[1].getAttribute('data-odd')).toBe('true');
      }
    }));

    it('should provide correct last flag', fakeAsync(() => {
      // Use small dataset to ensure last item is in viewport
      component.items.set(generateItems(3));
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.test-item');
      expect(items.length).toBe(3);

      // First item should not be last
      expect(items[0].getAttribute('data-last')).toBe('false');

      // Middle item should not be last
      expect(items[1].getAttribute('data-last')).toBe('false');

      // Last item should have last=true
      expect(items[2].getAttribute('data-last')).toBe('true');
    }));
  });

  describe('data changes', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should handle filtering (reduced items)', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(4000);

      // Filter to 10 items
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(viewport.totalHeight()).toBe(400);
    }));

    it('should handle adding items', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(400);

      // Add more items
      component.items.set(generateItems(50));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(viewport.totalHeight()).toBe(2000);
    }));

    it('should handle replacing items with new values', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Replace with completely different items
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1000, // Different IDs
        name: `New Item ${i}`,
      }));
      component.items.set(newItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const firstItem = fixture.nativeElement.querySelector('.test-item');
      expect(firstItem.textContent.trim()).toBe('New Item 0');
    }));
  });

  describe('scrolling', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should scroll to index', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      viewport.scrollToIndex(50);
      tick();
      fixture.detectChanges();

      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      // Item 50 at 40px height should be at offset 2000px
      expect(viewportEl.scrollTop).toBe(2000);
    }));

    it('scrollIntoView should not scroll when item is visible', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      const initialScrollTop = viewportEl.scrollTop;

      const viewport = component.viewport();
      viewport.scrollIntoView(0); // First item should be visible
      tick();
      fixture.detectChanges();

      expect(viewportEl.scrollTop).toBe(initialScrollTop);
    }));

    it('scrollIntoView should scroll down to item below viewport', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      viewport.scrollIntoView(20); // Item at 800px, well below 200px viewport
      tick();
      fixture.detectChanges();

      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      // Should scroll so item bottom aligns with viewport bottom
      // Item 20 bottom = 21 * 40 = 840px, viewport = 200px, so scrollTop = 640
      expect(viewportEl.scrollTop).toBe(640);
    }));
  });

  describe('trackBy height cache', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should get correct offset for index', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();

      // Item 0 should be at offset 0
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);

      // Item 1 should be at offset 40 (default itemHeight)
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);

      // Item 50 should be at offset 2000
      expect(virtualFor.getOffsetForIndex(50)).toBe(2000);
    }));

    it('should get correct height for index', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();

      // All items should have default itemHeight of 40
      expect(virtualFor.getHeightForIndex(0)).toBe(40);
      expect(virtualFor.getHeightForIndex(50)).toBe(40);
    }));

    it('should return 0 for offset of invalid index', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();

      expect(virtualFor.getOffsetForIndex(-1)).toBe(0);
      expect(virtualFor.getOffsetForIndex(100)).toBe(0);
    }));

    it('should return default itemHeight for invalid index', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();

      // Should return default itemHeight (40) for invalid indices
      expect(virtualFor.getHeightForIndex(-1)).toBe(40);
      expect(virtualFor.getHeightForIndex(100)).toBe(40);
    }));
  });

  describe('position calculation after data changes', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should calculate correct positions when items are reordered', fakeAsync(() => {
      // Setup: [id:0, id:1, id:2]
      component.items.set(generateItems(3));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();

      // Verify initial positions
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);
      expect(virtualFor.getOffsetForIndex(2)).toBe(80);

      // Reorder to [id:2, id:0, id:1]
      const items = component.items();
      component.items.set([items[2], items[0], items[1]]);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Positions should still be sequential from 0
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);
      expect(virtualFor.getOffsetForIndex(2)).toBe(80);

      // Verify DOM positioning
      const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      expect(renderedItems.length).toBe(3);
      expect((renderedItems[0] as HTMLElement).style.transform).toBe('translateY(0px)');
      expect((renderedItems[1] as HTMLElement).style.transform).toBe('translateY(40px)');
      expect((renderedItems[2] as HTMLElement).style.transform).toBe('translateY(80px)');
    }));

    it('should calculate correct positions when items inserted at beginning', fakeAsync(() => {
      // Setup: [id:1, id:2] at indices 0,1
      const initialItems = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      component.items.set(initialItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);

      // Insert [id:0] at beginning → [id:0, id:1, id:2]
      const newItems = [{ id: 0, name: 'Item 0' }, ...initialItems];
      component.items.set(newItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // All positions should be sequential from 0
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);
      expect(virtualFor.getOffsetForIndex(2)).toBe(80);

      // Total height should account for new item
      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(120);
    }));

    it('should calculate correct positions when items inserted in middle', fakeAsync(() => {
      // Setup: [id:0, id:2] at indices 0,1
      const initialItems = [
        { id: 0, name: 'Item 0' },
        { id: 2, name: 'Item 2' },
      ];
      component.items.set(initialItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);

      // Insert [id:1] in middle → [id:0, id:1, id:2]
      const newItems = [
        { id: 0, name: 'Item 0' },
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
      component.items.set(newItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Positions should be sequential
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);
      expect(virtualFor.getOffsetForIndex(2)).toBe(80);

      // Total height should reflect 3 items
      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(120);
    }));

    it('should calculate correct positions when items deleted from beginning', fakeAsync(() => {
      // Setup: [id:0, id:1, id:2]
      component.items.set(generateItems(3));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);
      expect(virtualFor.getOffsetForIndex(2)).toBe(80);

      // Delete first item → [id:1, id:2]
      const items = component.items();
      component.items.set([items[1], items[2]]);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Remaining items should be repositioned starting from 0
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);

      // Total height should reflect 2 items
      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(80);
    }));

    it('should calculate correct positions when items deleted from middle', fakeAsync(() => {
      // Setup: [id:0, id:1, id:2]
      component.items.set(generateItems(3));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);
      expect(virtualFor.getOffsetForIndex(2)).toBe(80);

      // Delete middle item → [id:0, id:2]
      const items = component.items();
      component.items.set([items[0], items[2]]);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Last item should be repositioned to follow first
      expect(virtualFor.getOffsetForIndex(0)).toBe(0);
      expect(virtualFor.getOffsetForIndex(1)).toBe(40);

      // Total height should reflect 2 items
      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(80);
    }));

    it('should maintain correct total height after data changes', fakeAsync(() => {
      // Setup: 10 items at 40px each = 400px
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      expect(viewport.totalHeight()).toBe(400);

      // Delete 3 items → 7 items = 280px
      const items = component.items();
      component.items.set(items.slice(3)); // Remove first 3
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(viewport.totalHeight()).toBe(280);

      // Add 2 more items → 9 items = 360px
      const currentItems = component.items();
      component.items.set([
        ...currentItems,
        { id: 100, name: 'New Item 1' },
        { id: 101, name: 'New Item 2' },
      ]);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(viewport.totalHeight()).toBe(360);
    }));

    it('should handle complex reordering with multiple operations', fakeAsync(() => {
      // Setup: [id:0, id:1, id:2, id:3, id:4]
      component.items.set(generateItems(5));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      const viewport = component.viewport();

      // Initial state verification
      expect(viewport.totalHeight()).toBe(200);
      expect(virtualFor.getOffsetForIndex(4)).toBe(160);

      // Reverse the order → [id:4, id:3, id:2, id:1, id:0]
      const items = component.items();
      component.items.set([...items].reverse());
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Total height should remain the same
      expect(viewport.totalHeight()).toBe(200);

      // All positions should still be sequential
      for (let i = 0; i < 5; i++) {
        expect(virtualFor.getOffsetForIndex(i)).toBe(i * 40);
      }
    }));
  });

  describe('updateForScroll', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should be called by viewport on scroll events', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      // Spy on updateForScroll
      vi.spyOn(virtualFor, 'updateForScroll');

      // Trigger scroll event
      viewportEl.scrollTop = 400;
      viewportEl.dispatchEvent(new Event('scroll'));
      tick(16); // RAF timing
      fixture.detectChanges();

      expect(virtualFor.updateForScroll).toHaveBeenCalled();
    }));

    it('should update visible range when scrolling via viewport', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const virtualFor = component.virtualFor();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      // Initial visible range should start at 0
      expect(virtualFor.visibleRange().start).toBe(0);

      // Scroll down significantly (to item ~20)
      viewportEl.scrollTop = 800;
      viewportEl.dispatchEvent(new Event('scroll'));
      tick(16); // RAF timing
      fixture.detectChanges();

      // Visible range should have updated
      expect(virtualFor.visibleRange().start).toBeGreaterThan(0);
    }));
  });

  describe('data change with scroll anchoring', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('should re-render items after data changes', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Verify items are rendered
      let renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      expect(renderedItems.length).toBeGreaterThan(0);

      // Change data to completely new items
      const newItems = Array.from({ length: 50 }, (_, i) => ({
        id: i + 500,
        name: `New Item ${i}`,
      }));
      component.items.set(newItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Items should be re-rendered with new content
      renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      expect(renderedItems.length).toBeGreaterThan(0);
      expect(renderedItems[0].textContent.trim()).toBe('New Item 0');
    }));

    it('should force re-render when data changes even if range is the same', fakeAsync(() => {
      // Start with items
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Get first rendered item content
      let firstItem = fixture.nativeElement.querySelector('.test-item');
      expect(firstItem.textContent.trim()).toBe('Item 0');

      // Replace with different items but same count (range should be same: 0-9)
      const newItems = Array.from({ length: 10 }, (_, i) => ({
        id: i + 100,
        name: `Replaced ${i}`,
      }));
      component.items.set(newItems);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // Even though range is same, content should be updated
      firstItem = fixture.nativeElement.querySelector('.test-item');
      expect(firstItem.textContent.trim()).toBe('Replaced 0');
    }));
  });

  describe('groups', () => {
    let fixture: ComponentFixture<GroupTestComponent>;
    let component: GroupTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [GroupTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(GroupTestComponent);
      component = fixture.componentInstance;
    });

    function render(items: TestItem[]) {
      component.items.set(items);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }

    function scrollTo(scrollTop: number) {
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      viewportEl.scrollTop = scrollTop;
      component.virtualFor().updateForScroll(scrollTop, 200);
      fixture.detectChanges();
    }

    function renderedGroups(): { name: string; items: string[] }[] {
      return Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.test-group')).map(
        (group) => ({
          name: group.getAttribute('aria-label')!,
          items: Array.from(group.querySelectorAll('.test-item')).map((item) =>
            item.firstChild!.textContent!.trim(),
          ),
        }),
      );
    }

    function contentChildren(): HTMLElement[] {
      return Array.from(
        fixture.nativeElement.querySelector('.nx-virtual-viewport__content').children,
      );
    }

    it('wraps the rendered items of a group in the group template', fakeAsync(() => {
      render(generateItems(100));
      expect(renderedGroups()).toEqual([
        {
          name: 'Group 0',
          items: ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        },
      ]);
    }));

    it('renders only the groups of the rendered items', fakeAsync(() => {
      render(generateItems(100));
      scrollTo(2000);
      expect(renderedGroups()).toEqual([
        { name: 'Group 4', items: ['Item 48', 'Item 49'] },
        {
          name: 'Group 5',
          items: ['Item 50', 'Item 51', 'Item 52', 'Item 53', 'Item 54', 'Item 55', 'Item 56'],
        },
      ]);
    }));

    it('keeps the items in their order when scrolling back up', fakeAsync(() => {
      render(generateItems(100));
      scrollTo(2000);
      scrollTo(1880);
      const items = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.test-item'));
      const indices = items.map((item) => Number(item.dataset['virtualIndex']));
      expect(indices).toEqual([...indices].sort((a, b) => a - b));
      expect(renderedGroups().map((group) => group.name)).toEqual(['Group 4', 'Group 5']);
    }));

    it('inserts a group that comes into view above in front of the others', fakeAsync(() => {
      render(generateItems(100));
      scrollTo(2200);
      const group5 = fixture.nativeElement.querySelector('[aria-label="Group 5"]');
      const item54 = fixture.nativeElement.querySelector('[data-virtual-index="54"]');
      scrollTo(1920);
      expect(contentChildren().map((child) => child.getAttribute('aria-label'))).toEqual([
        'Group 4',
        'Group 5',
      ]);
      expect(fixture.nativeElement.querySelector('[aria-label="Group 5"]')).toBe(group5);
      expect(fixture.nativeElement.querySelector('[data-virtual-index="54"]')).toBe(item54);
    }));

    it('does not move views when scrolling down', fakeAsync(() => {
      render(generateItems(100));
      const removed: Node[] = [];
      const observer = new MutationObserver((records) =>
        records.forEach((record) => removed.push(...Array.from(record.removedNodes))),
      );
      observer.observe(fixture.nativeElement.querySelector('.nx-virtual-viewport__content'), {
        childList: true,
        subtree: true,
      });
      for (let scrollTop = 40; scrollTop <= 2400; scrollTop += 120) {
        scrollTo(scrollTop);
      }
      observer.takeRecords().forEach((record) => removed.push(...Array.from(record.removedNodes)));
      observer.disconnect();
      expect(removed.length).toBeGreaterThan(0);
      expect(removed.filter((node) => node.isConnected)).toEqual([]);
    }));

    it('keeps the focus in a rendered item when scrolling up', fakeAsync(() => {
      render(generateItems(100));
      scrollTo(2000);
      const button = fixture.nativeElement.querySelector(
        '[data-virtual-index="52"] button',
      ) as HTMLButtonElement;
      button.focus();
      scrollTo(1880);
      expect(document.activeElement).toBe(button);
    }));

    it('renders items without a group outside of the group templates', fakeAsync(() => {
      render(generateItems(100));
      scrollTo(3800);
      const ungrouped = contentChildren()
        .filter((child) => child.classList.contains('test-item'))
        .map((item) => item.firstChild!.textContent!.trim());
      expect(ungrouped).toEqual(['Item 95', 'Item 96', 'Item 97', 'Item 98', 'Item 99']);
      expect(renderedGroups().map((group) => group.name)).toEqual(['Group 9']);
    }));

    it('positions grouped items like ungrouped ones', fakeAsync(() => {
      render(generateItems(100));
      const viewportTop = fixture.nativeElement
        .querySelector('.nx-virtual-viewport__content')
        .getBoundingClientRect().top;
      const item = fixture.nativeElement.querySelector('[data-virtual-index="3"]');
      expect(item.getBoundingClientRect().top - viewportTop).toBe(120);
    }));

    it('moves an item to its new group when the data changes', fakeAsync(() => {
      render(generateItems(5));
      component.groupOf = (item) => component.groups[item.id < 2 ? 0 : 1];
      render(generateItems(5));
      expect(renderedGroups()).toEqual([
        { name: 'Group 0', items: ['Item 0', 'Item 1'] },
        { name: 'Group 1', items: ['Item 2', 'Item 3', 'Item 4'] },
      ]);
    }));

    it('warns once about a group that appears more than once and renders it in its first container', fakeAsync(() => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      component.groupOf = (item) => component.groups[item.id === 1 ? 1 : 0];
      render(generateItems(3));
      render(generateItems(4));

      expect(consoleWarn).toHaveBeenCalledTimes(1);
      expect(consoleWarn).toHaveBeenCalledWith(
        expect.stringMatching(/appears more than once/),
        component.groups[0],
      );
      expect(renderedGroups()).toEqual([
        { name: 'Group 0', items: ['Item 0', 'Item 2', 'Item 3'] },
        { name: 'Group 1', items: ['Item 1'] },
      ]);
    }));

    it('keeps the views when the data is replaced by equal data', fakeAsync(() => {
      component.groupKey = 'id';
      render(generateItems(100));
      const nodes = contentChildren();
      const items = Array.from(fixture.nativeElement.querySelectorAll('.test-item'));

      component.groups = component.groups.map((group) => ({ ...group }));
      render(generateItems(100));

      expect(contentChildren()).toEqual(nodes);
      contentChildren().forEach((child, i) => expect(child).toBe(nodes[i]));
      Array.from(fixture.nativeElement.querySelectorAll('.test-item')).forEach((item, i) =>
        expect(item).toBe(items[i]),
      );
    }));

    it('updates the group of a kept group view', fakeAsync(() => {
      component.groupKey = 'id';
      render(generateItems(100));
      const group = fixture.nativeElement.querySelector('.test-group');

      component.groups = component.groups.map((g) => ({ ...g, name: `Renamed ${g.id}` }));
      render(generateItems(100));

      expect(fixture.nativeElement.querySelector('.test-group')).toBe(group);
      expect(group.getAttribute('aria-label')).toBe('Renamed 0');
    }));

    it('recreates the groups when the group template changes', fakeAsync(() => {
      render(generateItems(100));
      component.alt = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('div.test-group')).toHaveLength(0);
      expect(renderedGroups()).toEqual([
        {
          name: 'Group 0',
          items: ['Item 0', 'Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
        },
      ]);
      expect(fixture.nativeElement.querySelector('.alt-group')).not.toBeNull();
    }));

    it('does not warn about the layout of a valid group template', fakeAsync(() => {
      const consoleWarn = vi.spyOn(console, 'warn');
      render(generateItems(100));
      tick(16);
      expect(consoleWarn).not.toHaveBeenCalled();
    }));
  });

  describe('group template validation', () => {
    it('throws for a group template without outlet once and renders without groups', fakeAsync(() => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      TestBed.configureTestingModule({ imports: [GroupWithoutOutletTestComponent] });
      const fixture = TestBed.createComponent(GroupWithoutOutletTestComponent);
      fixture.detectChanges();
      tick();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      for (const scrollTop of [400, 800, 1200]) {
        viewportEl.scrollTop = scrollTop;
        fixture.componentInstance.virtualFor().updateForScroll(scrollTop, 200);
        fixture.detectChanges();
      }
      tick(16);

      const outletErrors = consoleError.mock.calls.filter((args) =>
        /needs an element with nxVirtualGroupOutlet/.test(
          (args[1] as Error | undefined)?.message ?? '',
        ),
      );
      expect(outletErrors).toHaveLength(1);
      expect(fixture.nativeElement.querySelectorAll('[role="group"]')).toHaveLength(0);
      expect(fixture.nativeElement.querySelectorAll('.test-item').length).toBeGreaterThan(0);
    }));

    it('accepts an outlet inside control flow', fakeAsync(() => {
      TestBed.configureTestingModule({ imports: [GroupOutletInControlFlowTestComponent] });
      const fixture = TestBed.createComponent(GroupOutletInControlFlowTestComponent);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const group = fixture.nativeElement.querySelector('.test-group');
      expect(group.querySelectorAll('.test-item')).toHaveLength(3);
    }));

    it('moves the items to an outlet that replaces the previous one', fakeAsync(() => {
      TestBed.configureTestingModule({ imports: [GroupOutletInControlFlowTestComponent] });
      const fixture = TestBed.createComponent(GroupOutletInControlFlowTestComponent);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      fixture.componentInstance.outlet = 'second';
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();

      const groups = fixture.nativeElement.querySelectorAll('.test-group');
      expect(groups).toHaveLength(1);
      expect(groups[0].querySelectorAll('.test-item')).toHaveLength(3);
    }));

    it('throws once and renders without groups when an outlet is removed', fakeAsync(() => {
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
      TestBed.configureTestingModule({ imports: [GroupOutletInControlFlowTestComponent] });
      const fixture = TestBed.createComponent(GroupOutletInControlFlowTestComponent);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      fixture.componentInstance.outlet = 'none';
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();
      tick(16);

      const outletErrors = consoleError.mock.calls.filter((args) =>
        /needs an element with nxVirtualGroupOutlet/.test(
          (args[1] as Error | undefined)?.message ?? '',
        ),
      );
      expect(outletErrors).toHaveLength(1);
      expect(fixture.nativeElement.querySelectorAll('.test-group')).toHaveLength(0);
      expect(fixture.nativeElement.querySelectorAll('.test-item')).toHaveLength(3);
    }));

    it('throws a clear error for an outlet outside of a group template', () => {
      TestBed.configureTestingModule({ imports: [MisplacedGroupOutletTestComponent] });
      expect(() => TestBed.createComponent(MisplacedGroupOutletTestComponent)).toThrowError(
        /can only be used in the groupTemplate of nxVirtualFor/,
      );
    });

    it('warns about a group template that creates a containing block', fakeAsync(() => {
      const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
      TestBed.configureTestingModule({ imports: [PositionedGroupTestComponent] });
      const fixture = TestBed.createComponent(PositionedGroupTestComponent);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick(16);
      expect(consoleWarn).toHaveBeenCalledTimes(1);
      expect(consoleWarn).toHaveBeenCalledWith(expect.stringMatching(/containing block/));
    }));
  });

  describe('after measuring the real heights', () => {
    async function render(items: SizedItem[], overscan = 20) {
      TestBed.configureTestingModule({ imports: [SizedItemsTestComponent] });
      const fixture = TestBed.createComponent(SizedItemsTestComponent);
      fixture.componentInstance.items.set(items);
      fixture.componentInstance.overscan.set(overscan);
      fixture.autoDetectChanges();
      await fixture.whenStable();
      await animationFrames(5);
      return fixture;
    }

    function renderedRows(fixture: ComponentFixture<SizedItemsTestComponent>) {
      return Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('[data-virtual-index]'))
        .sort((a, b) => Number(a.dataset['virtualIndex']) - Number(b.dataset['virtualIndex']))
        .map((row) => ({
          index: Number(row.dataset['virtualIndex']),
          offset: Number(/translateY\((-?[\d.]+)px\)/.exec(row.style.transform)![1]),
          height: row.offsetHeight,
        }));
    }

    function expectRowsStacked(fixture: ComponentFixture<SizedItemsTestComponent>) {
      const rows = renderedRows(fixture);
      const virtualFor = fixture.componentInstance.virtualFor();
      expect(rows[0].offset).toBe(virtualFor.getOffsetForIndex(rows[0].index));
      rows.slice(1).forEach((row, i) => expect(row.offset).toBe(rows[i].offset + rows[i].height));
    }

    it('moves the rows to their measured offsets when the rendered range stays the same', async () => {
      // All six rows are rendered before and after measuring, so the range doesn't change.
      const fixture = await render([56, 44, 44, 44, 44, 44].map((height, id) => ({ id, height })));
      expect(renderedRows(fixture).map((row) => row.offset)).toEqual([0, 56, 100, 144, 188, 232]);
    });

    it('moves the rows to their measured offsets after keeping the scroll position', async () => {
      const fixture = await render(Array.from({ length: 200 }, (_, id) => ({ id, height: 50 })));
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      viewportEl.scrollTop = 2000;
      viewportEl.dispatchEvent(new Event('scroll'));
      await animationFrames(10);
      await fixture.whenStable();

      expectRowsStacked(fixture);
    });

    async function resizeRows(fixture: ComponentFixture<SizedItemsTestComponent>, height: number) {
      fixture.componentInstance.rowHeight.set(height);
      await fixture.whenStable();
      await animationFrames(10);
      await fixture.whenStable();
    }

    it('measures the rows that a resize brings into the range', async () => {
      const fixture = await render(
        Array.from({ length: 200 }, (_, id) => ({ id, height: 44 })),
        2,
      );
      await resizeRows(fixture, 20);

      expect(renderedRows(fixture).length).toBe(12);
      expectRowsStacked(fixture);
    });

    it('measures the rows that the scroll adjustment after a resize brings into the range', async () => {
      const fixture = await render(
        Array.from({ length: 200 }, (_, id) => ({ id, height: 44 })),
        2,
      );
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      viewportEl.scrollTop = viewportEl.scrollHeight;
      viewportEl.dispatchEvent(new Event('scroll'));
      await animationFrames(10);
      await fixture.whenStable();

      // Staying at the bottom pulls the scroll position up, onto rows that weren't rendered.
      await resizeRows(fixture, 20);

      const rows = renderedRows(fixture);
      expect(rows.at(-1)!.index).toBe(199);
      expectRowsStacked(fixture);
      expect(rows.at(-1)!.offset + rows.at(-1)!.height).toBe(viewportEl.scrollHeight);
    });
  });

  it('measures rows whose padding changes without changing their content box', async () => {
    TestBed.configureTestingModule({ imports: [PaddedItemsTestComponent] });
    const fixture = TestBed.createComponent(PaddedItemsTestComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    await animationFrames(10);

    fixture.componentInstance.items.update((rows) =>
      rows.map((row) => ({ ...row, selected: true })),
    );
    await fixture.whenStable();
    await animationFrames(10);

    const rows = Array.from<HTMLElement>(
      fixture.nativeElement.querySelectorAll('[data-virtual-index]'),
    ).sort((a, b) => Number(a.dataset['virtualIndex']) - Number(b.dataset['virtualIndex']));
    const top = (row: HTMLElement) =>
      Number(/translateY\((-?[\d.]+)px\)/.exec(row.style.transform)![1]);
    rows.slice(1).forEach((row, i) => expect(top(row)).toBe(top(rows[i]) + rows[i].offsetHeight));
  });

  it('stops measuring when rows with the same key differ in height', async () => {
    TestBed.configureTestingModule({ imports: [DuplicateKeysTestComponent] });
    const fixture = TestBed.createComponent(DuplicateKeysTestComponent);
    fixture.autoDetectChanges();
    await fixture.whenStable();
    await animationFrames(10);

    const measure = vi.spyOn(
      fixture.componentInstance.virtualFor() as any,
      '_measureRenderedItems',
    );
    await animationFrames(10);

    expect(measure).not.toHaveBeenCalled();
  });

  describe('with a root element that wraps control flow', () => {
    async function measureAfterScroll(): Promise<number> {
      const fixture = TestBed.createComponent(ControlFlowRootTestComponent);
      fixture.autoDetectChanges();
      await fixture.whenStable();
      await animationFrames(3);

      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');
      viewportEl.scrollTop = 1500;
      viewportEl.dispatchEvent(new Event('scroll'));
      await animationFrames(5);
      return fixture.componentInstance.virtualFor().getHeightForIndex(60);
    }

    it('measures the rendered content of items that change detection did not check yet', fakeAsync(() => {
      TestBed.configureTestingModule({ imports: [ControlFlowRootTestComponent] });
      const fixture = TestBed.createComponent(ControlFlowRootTestComponent);
      fixture.detectChanges();
      tick(16);
      fixture.detectChanges();

      const virtualFor = fixture.componentInstance.virtualFor();
      fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport').scrollTop = 1500;
      virtualFor.updateForScroll(1500, 200);
      tick(16);

      expect(virtualFor.getHeightForIndex(60)).toBe(30);
    }));

    it('measures the rendered content of items rendered by scrolling', async () => {
      TestBed.configureTestingModule({ imports: [ControlFlowRootTestComponent] });
      expect(await measureAfterScroll()).toBe(30);
    });

    it('measures the rendered content of items rendered by scrolling without zone.js', async () => {
      TestBed.configureTestingModule({
        imports: [ControlFlowRootTestComponent],
        providers: [provideZonelessChangeDetection()],
      });
      expect(await measureAfterScroll()).toBe(30);
    });
  });
});

import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { NxVirtualFor } from './virtual-for';
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
  template: `
    <nx-virtual-viewport [itemHeight]="40" [overscan]="2" style="height: 200px; display: block;">
      <div *nxVirtualFor="let item of items(); trackBy: 'id'" class="test-item">
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class BasicTestComponent {
  items = signal<TestItem[]>([]);
  viewport = viewChild.required(NxVirtualViewportComponent);
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <div *nxVirtualFor="let item of items(); trackBy: trackByFn" class="test-item">
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class FunctionTrackByTestComponent {
  items = signal<TestItem[]>([]);
  trackByFn = (_index: number, item: TestItem) => item.id;
  viewport = viewChild.required(NxVirtualViewportComponent);
  virtualFor = viewChild.required(NxVirtualFor);
}

@Component({
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
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class ContextTestComponent {
  items = signal<TestItem[]>([]);
  viewport = viewChild.required(NxVirtualViewportComponent);
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
      expect(firstItem.hasAttribute('data-virtual-index')).toBeTrue();
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
      spyOn(virtualFor, 'updateForScroll').and.callThrough();

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
});

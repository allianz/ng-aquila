import { Component, signal, viewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

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
class FunctionAccessorTestComponent {
  items = signal<TestItem[]>([]);
  trackByFn = (_index: number, item: TestItem) => item.id;
  viewport = viewChild.required(NxVirtualViewportComponent);
}

@Component({
  template: `
    <nx-virtual-viewport [itemHeight]="40" style="height: 200px; display: block;">
      <div
        *nxVirtualFor="let item of items(); let i = index"
        class="custom-item"
        [attr.data-index]="i"
      >
        Custom: {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class CustomTemplateTestComponent {
  items = signal<TestItem[]>([]);
  viewport = viewChild.required(NxVirtualViewportComponent);
}

@Component({
  template: `
    <nx-virtual-viewport
      [itemHeight]="40"
      [overscan]="2"
      style="height: 200px; display: block;"
      (visibleRangeChange)="onVisibleRangeChange($event)"
    >
      <div *nxVirtualFor="let item of items(); trackBy: 'id'" class="test-item">
        {{ item.name }}
      </div>
    </nx-virtual-viewport>
  `,
  imports: [NxVirtualViewportComponent, NxVirtualFor],
})
class VisibleRangeTestComponent {
  items = signal<TestItem[]>([]);
  viewport = viewChild.required(NxVirtualViewportComponent);
  rangeChanges: { start: number; end: number }[] = [];

  onVisibleRangeChange(event: { start: number; end: number }): void {
    this.rangeChanges.push(event);
  }
}

describe('NxVirtualViewportComponent', () => {
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

  describe('function accessors', () => {
    let fixture: ComponentFixture<FunctionAccessorTestComponent>;
    let component: FunctionAccessorTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [FunctionAccessorTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(FunctionAccessorTestComponent);
      component = fixture.componentInstance;
    });

    it('should use function accessor for trackBy', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const renderedItems = fixture.nativeElement.querySelectorAll('.test-item');
      expect(renderedItems.length).toBeGreaterThan(0);
    }));
  });

  describe('custom template', () => {
    let fixture: ComponentFixture<CustomTemplateTestComponent>;
    let component: CustomTemplateTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [CustomTemplateTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(CustomTemplateTestComponent);
      component = fixture.componentInstance;
    });

    it('should render custom template', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const customItem = fixture.nativeElement.querySelector('.custom-item');
      expect(customItem).toBeTruthy();
      expect(customItem.textContent.trim()).toBe('Custom: Item 0');
    }));

    it('should provide correct context to template', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const customItem = fixture.nativeElement.querySelector('.custom-item');
      expect(customItem.getAttribute('data-index')).toBe('0');
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

  describe('visibleRangeChange output', () => {
    let fixture: ComponentFixture<VisibleRangeTestComponent>;
    let component: VisibleRangeTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [VisibleRangeTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(VisibleRangeTestComponent);
      component = fixture.componentInstance;
    });

    it('should emit visibleRangeChange on initial render', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(component.rangeChanges.length).toBeGreaterThan(0);
      const lastRange = component.rangeChanges[component.rangeChanges.length - 1];
      expect(lastRange.start).toBe(0);
      expect(lastRange.end).toBeGreaterThan(0);
    }));

    it('should emit visibleRangeChange when scrolling', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const initialRangeCount = component.rangeChanges.length;
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      // Scroll down - need to scroll far enough to change visible range
      viewportEl.scrollTop = 800; // Scroll to item 20 (at 40px each)
      viewportEl.dispatchEvent(new Event('scroll'));

      // RAF processes the scroll, need tick(16) to simulate frame
      tick(16);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      expect(component.rangeChanges.length).toBeGreaterThan(initialRangeCount);
      const lastRange = component.rangeChanges[component.rangeChanges.length - 1];
      expect(lastRange.start).toBeGreaterThan(0);
    }));

    it('should include start and end indices in visibleRangeChange event', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const lastRange = component.rangeChanges[component.rangeChanges.length - 1];
      expect(lastRange).toEqual(
        jasmine.objectContaining({ start: jasmine.any(Number), end: jasmine.any(Number) }),
      );
      expect(lastRange.end).toBeGreaterThan(lastRange.start);
    }));
  });

  describe('scrollIntoView edge cases', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('scrollIntoView should scroll up to item above viewport', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      // First scroll down to index 50
      viewport.scrollToIndex(50);
      tick();
      fixture.detectChanges();

      expect(viewportEl.scrollTop).toBe(2000);

      // Now scrollIntoView to item 10, which is above current viewport
      viewport.scrollIntoView(10);
      tick();
      fixture.detectChanges();

      // Should scroll to bring item 10 to the top of viewport
      // Item 10 at 40px height = offset 400px
      expect(viewportEl.scrollTop).toBe(400);
    }));

    it('scrollToIndex should accept smooth behavior', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();

      // Just verify smooth behavior doesn't throw
      expect(() => viewport.scrollToIndex(50, 'smooth')).not.toThrow();
    }));
  });

  describe('DOM accessor methods', () => {
    let fixture: ComponentFixture<BasicTestComponent>;
    let component: BasicTestComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [BasicTestComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(BasicTestComponent);
      component = fixture.componentInstance;
    });

    it('getDomScrollTop should return current scroll position', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      expect(viewport.getDomScrollTop()).toBe(0);

      viewportEl.scrollTop = 500;
      expect(viewport.getDomScrollTop()).toBe(500);
    }));

    it('getDomViewportHeight should return viewport client height', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      expect(viewport.getDomViewportHeight()).toBe(viewportEl.clientHeight);
    }));

    it('setScrollTop should set the scroll position', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      viewport.setScrollTop(800);
      expect(viewportEl.scrollTop).toBe(800);
    }));

    it('isAtBottom should return true when scrolled to bottom', fakeAsync(() => {
      component.items.set(generateItems(100));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      const viewportEl = fixture.nativeElement.querySelector('.nx-virtual-viewport__viewport');

      // Initially at top
      expect(viewport.isAtBottom()).toBeFalse();

      // Scroll to bottom (4000px total - 200px viewport = 3800px max scroll)
      viewportEl.scrollTop = 3800;
      expect(viewport.isAtBottom()).toBeTrue();
    }));

    it('updateSpacerHeight should update sizer element directly', fakeAsync(() => {
      component.items.set(generateItems(10));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const viewport = component.viewport();
      const sizerEl = fixture.nativeElement.querySelector(
        '.nx-virtual-viewport__sizer',
      ) as HTMLElement;

      // Initial height is 400px (10 items * 40px)
      expect(sizerEl.style.height).toBe('400px');

      // Directly update via method
      viewport.updateSpacerHeight(600);
      expect(sizerEl.style.height).toBe('600px');
    }));
  });
});

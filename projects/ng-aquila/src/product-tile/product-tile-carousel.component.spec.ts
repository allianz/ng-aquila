import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxProductTileComponent } from './product-tile.component';
import { NxProductTileCarouselIntl } from './product-tile.intl';
import { NxProductTileCarouselComponent } from './product-tile-carousel.component';
import { NxProductTileTitleDirective } from './product-tile-content.directive';
import { NxProductTileGroupComponent } from './product-tile-group.component';

@Component({
  selector: 'test-product-tile-carousel',
  template: `<nx-product-tile-carousel style="width: 300px">
    @for (item of items(); track item) {
      <!-- Wide enough that the track has something to scroll without a theme's column tokens. -->
      <div class="carousel-item" style="height: 40px; width: 100px">{{ item }}</div>
    }
  </nx-product-tile-carousel>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileCarouselComponent],
})
class CarouselTestComponent {
  items = signal(['one', 'two', 'three', 'four']);
}

describe('NxProductTileCarouselComponent', () => {
  let fixture: ComponentFixture<CarouselTestComponent>;
  let host: CarouselTestComponent;

  const viewport = (): HTMLElement =>
    fixture.nativeElement.querySelector('.nx-product-tile-carousel__viewport');

  const arrows = (): HTMLButtonElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.nx-product-tile-carousel__arrow'));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CarouselTestComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('projects the tiles into the scroll viewport', () => {
    expect(viewport().querySelectorAll('.carousel-item').length).toBe(4);
  });

  it('renders both arrows with labels from the intl service', () => {
    const intl = TestBed.inject(NxProductTileCarouselIntl);
    expect(arrows().map((arrow) => arrow.getAttribute('aria-label'))).toEqual([
      intl.previousLabel(),
      intl.nextLabel(),
    ]);
  });

  it('keeps the arrows out of the tab order, being a shortcut for a scroll', () => {
    expect(arrows().map((arrow) => arrow.tabIndex)).toEqual([-1, -1]);
  });

  it('keeps the arrows out of sight while nothing points at the track', () => {
    const next = getComputedStyle(arrows()[1]);
    expect(next.opacity).toBe('0');
    // A hover cannot be synthesized, but an arrow that took no clicks while invisible is half of it.
    expect(next.pointerEvents).toBe('none');
  });

  it('drops the arrow at whichever end of the track the view sits', async () => {
    // The measurement the host classes come from lands after the first render.
    await fixture.whenStable();
    fixture.detectChanges();

    expect(arrows()[0].disabled).toBe(true);
    expect(getComputedStyle(arrows()[0]).display).toBe('none');
    expect(getComputedStyle(arrows()[1]).display).not.toBe('none');

    const element = viewport();
    element.scrollLeft = element.scrollWidth;
    element.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(arrows()[1].disabled).toBe(true);
    expect(getComputedStyle(arrows()[1]).display).toBe('none');
    expect(getComputedStyle(arrows()[0]).display).not.toBe('none');
  });

  it('advances the scroll position by one tile from the next arrow', async () => {
    // The measurement that enables the arrow lands after the first render.
    await fixture.whenStable();
    fixture.detectChanges();
    const element = viewport();
    // `behavior: 'smooth'` in the scroll options outranks any CSS, so the animation has to run out.
    const settled = new Promise<void>((resolve) =>
      element.addEventListener('scrollend', () => resolve(), { once: true }),
    );
    arrows()[1].click();
    await settled;

    expect(element.scrollLeft).toBeGreaterThan(0);
  });

  it('lifts the fade while the track moves and puts it back once it settles', async () => {
    const element = viewport();
    const carouselElement = fixture.nativeElement.querySelector('nx-product-tile-carousel');
    const outside = () =>
      element.querySelector<HTMLElement>('.nx-product-tile-carousel__item--outside');
    // The visibility observer reports a frame after layout.
    for (let attempt = 0; attempt < 20 && !outside(); attempt++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    const faded = outside()!;
    // Every step of this test reads an opacity the transition has to arrive at first.
    const settle = () => new Promise((resolve) => setTimeout(resolve, 500));
    await settle();
    expect(parseFloat(getComputedStyle(faded).opacity)).toBeLessThan(1);

    // A scroll comes as a stream of events. Only their timing matters here, so the position stays put
    // and the tile keeps the class the visibility observer gave it.
    for (let tick = 0; tick < 10; tick++) {
      element.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    expect(carouselElement.classList).toContain('is-scrolling');
    expect(parseFloat(getComputedStyle(faded).opacity)).toBeGreaterThan(0.99);

    // Past the settle timeout the fade comes back, one more transition to wait out.
    await new Promise((resolve) => setTimeout(resolve, 200));
    fixture.detectChanges();
    await settle();

    expect(carouselElement.classList).not.toContain('is-scrolling');
    expect(parseFloat(getComputedStyle(faded).opacity)).toBeLessThan(1);
  });

  // Clamping the track to a resized viewport raises one scroll event without the track moving. The
  // fade used to step aside for it, running the faded tiles up to full opacity and back.
  it('keeps the fade for a lone scroll event, the track having gone nowhere', async () => {
    const element = viewport();
    const carouselElement = fixture.nativeElement.querySelector('nx-product-tile-carousel');
    const outside = () =>
      element.querySelector<HTMLElement>('.nx-product-tile-carousel__item--outside');
    for (let attempt = 0; attempt < 20 && !outside(); attempt++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    const faded = outside()!;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const fadedOpacity = parseFloat(getComputedStyle(faded).opacity);
    expect(fadedOpacity).toBeLessThan(1);

    element.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();

    expect(carouselElement.classList).not.toContain('is-scrolling');
    // No transition to wait out: the opacity never started moving.
    expect(parseFloat(getComputedStyle(faded).opacity)).toBe(fadedOpacity);
  });

  it('has nothing to scroll when a single tile fits', async () => {
    host.items.set(['one']);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const carouselElement = fixture.nativeElement.querySelector('nx-product-tile-carousel');
    expect(carouselElement.classList).not.toContain('can-scroll-back');
    expect(carouselElement.classList).not.toContain('can-scroll-forward');
  });

  it('leaves the tab bar out for tiles that carry no label', () => {
    expect(fixture.nativeElement.querySelector('.nx-product-tile-carousel__tabs')).toBeNull();
  });
});

@Component({
  selector: 'test-product-tile-carousel-tabs',
  template: `<nx-product-tile-group style="width: 300px">
    @for (item of items(); track item) {
      <nx-product-tile [value]="item" [carouselLabel]="labelled() ? item : null">
        <span nxProductTileTitle>{{ item }}</span>
      </nx-product-tile>
    }
  </nx-product-tile-group>`,
  // One tile per view, so that a scroll moves the bar on by exactly one tab. The carousel is the
  // group's own, so the variable has to reach it past the one the carousel declares on itself.
  styles: [
    ':host ::ng-deep .nx-product-tile-carousel__track { --nx-product-tile-carousel-columns: 1; }',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileGroupComponent, NxProductTileComponent, NxProductTileTitleDirective],
})
class CarouselTabsTestComponent {
  items = signal(['one', 'two', 'three', 'four']);
  labelled = signal(true);
}

@Component({
  selector: 'test-product-tile-group-tabs',
  template: `<nx-product-tile-group style="width: 300px" [value]="value()">
    @for (item of items(); track item) {
      <nx-product-tile [carouselLabel]="item" [value]="item" style="width: 200px">
        <span nxProductTileTitle>{{ item }}</span>
      </nx-product-tile>
    }
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileGroupComponent, NxProductTileComponent, NxProductTileTitleDirective],
})
class GroupTabsTestComponent {
  items = signal(['one', 'two', 'three', 'four']);
  value = signal<string | null>(null);
}

describe('NxProductTileCarouselComponent tab bar', () => {
  let fixture: ComponentFixture<CarouselTabsTestComponent>;
  let host: CarouselTabsTestComponent;

  const tabs = (): HTMLButtonElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.nx-product-tile-carousel__tab'));

  const viewport = (): HTMLElement =>
    fixture.nativeElement.querySelector('.nx-product-tile-carousel__viewport');

  const activeTabs = (): boolean[] => tabs().map((tab) => tab.classList.contains('is-active'));

  /**
   * The tab bar only highlights once the visibility observer has reported, a frame after layout - and
   * after a scroll it reports the tiles that have left before the ones that have arrived, so waiting
   * for any highlight at all would settle on a state that is still on its way.
   */
  const settleVisibility = async (
    reached: (active: boolean[]) => boolean = (active) => active.some(Boolean),
  ) => {
    for (let attempt = 0; attempt < 20; attempt++) {
      await new Promise((resolve) => requestAnimationFrame(resolve));
      fixture.detectChanges();
      if (reached(activeTabs())) {
        return;
      }
    }
  };

  /** Two tiles per view, so that "into view" and "at the start of the view" are different places. */
  const twoPerView = async () => {
    fixture.nativeElement
      .querySelector('.nx-product-tile-carousel__track')
      .style.setProperty('--nx-product-tile-carousel-columns', '2');
    await settleVisibility((active) => active[0] && active[1]);
  };

  /** Clicks a tab and waits out the smooth scroll it starts, plus the highlight that follows it. */
  const clickTab = async (index: number, reached: (active: boolean[]) => boolean) => {
    const element = viewport();
    const settled = new Promise<void>((resolve) =>
      element.addEventListener('scrollend', () => resolve(), { once: true }),
    );
    tabs()[index].click();
    await settled;
    await settleVisibility(reached);
  };

  beforeEach(async () => {
    fixture = TestBed.createComponent(CarouselTabsTestComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('keeps the tabs out of the tab order, the track being reachable without them', () => {
    expect(tabs().map((tab) => tab.tabIndex)).toEqual([-1, -1, -1, -1]);
  });

  it('puts one tab per tile, labelled after it', () => {
    expect(tabs().map((tab) => tab.textContent?.trim())).toEqual(host.items());
  });

  it('drops the bar as soon as one tile has no label', () => {
    host.labelled.set(false);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.nx-product-tile-carousel__tabs')).toBeNull();
  });

  it('highlights the tabs of the tiles in view', async () => {
    await settleVisibility();

    const active = activeTabs();
    // Whichever tiles fit, they are the ones at the start of the track and they are contiguous.
    expect(active[0]).toBe(true);
    expect(active[active.length - 1]).toBe(false);
    expect(active.lastIndexOf(true)).toBe(active.indexOf(false) - 1);
  });

  it('lays the indicator over the labels of the highlighted tabs', async () => {
    await settleVisibility();
    // The indicator is measured off the rendered tabs, so it takes one more round to appear.
    await fixture.whenStable();
    fixture.detectChanges();

    const highlighted = tabs().filter((tab) => tab.classList.contains('is-active'));
    const indicator = fixture.nativeElement
      .querySelector('.nx-product-tile-carousel__tab-indicator')
      .getBoundingClientRect();
    const first = highlighted[0].getBoundingClientRect();
    const last = highlighted[highlighted.length - 1].getBoundingClientRect();

    expect(Math.abs(indicator.left - first.left)).toBeLessThan(1);
    expect(Math.abs(indicator.right - last.right)).toBeLessThan(1);
  });

  it('brings a tile into view when its tab is clicked', async () => {
    const element = viewport();
    // `behavior: 'smooth'` in the scroll options outranks any CSS, so the animation has to run out.
    const settled = new Promise<void>((resolve) =>
      element.addEventListener('scrollend', () => resolve(), { once: true }),
    );
    tabs()[host.items().length - 1].click();
    await settled;

    expect(element.scrollLeft).toBeGreaterThan(0);
  });

  it('moves the track no further than it takes to bring a tab into view', async () => {
    await twoPerView();
    await clickTab(3, (active) => active[3]);

    // The last tile comes in at the end of the view rather than being pulled to the start of it.
    expect(activeTabs()).toEqual([false, false, true, true]);
  });

  it('leaves the track where it is when a tab already in view is clicked', async () => {
    await twoPerView();
    await clickTab(3, (active) => active[3]);
    const element = viewport();
    const settledAt = element.scrollLeft;

    tabs()[2].click();
    // A scroll would have started within a frame or two; there is nothing else to wait for.
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(element.scrollLeft).toBe(settledAt);
    expect(activeTabs()).toEqual([false, false, true, true]);
  });

  it('follows the tiles: scrolling the track moves the highlight along', async () => {
    await settleVisibility();
    const element = viewport();
    const settled = new Promise<void>((resolve) =>
      element.addEventListener('scrollend', () => resolve(), { once: true }),
    );
    element.scrollTo({ left: element.scrollWidth, behavior: 'smooth' });
    await settled;
    await settleVisibility((active) => active[active.length - 1] && !active[0]);

    const active = activeTabs();
    expect(active[0]).toBe(false);
    expect(active[active.length - 1]).toBe(true);
  });

  it('opens the track on a tile picked before the first render', async () => {
    const groupFixture = TestBed.createComponent(GroupTabsTestComponent);
    groupFixture.componentInstance.value.set('four');
    groupFixture.detectChanges();
    await groupFixture.whenStable();
    groupFixture.detectChanges();

    const element: HTMLElement = groupFixture.nativeElement.querySelector(
      '.nx-product-tile-carousel__viewport',
    );
    const picked: HTMLElement = groupFixture.nativeElement.querySelectorAll('nx-product-tile')[3];
    const view = element.getBoundingClientRect();
    const tile = picked.getBoundingClientRect();

    expect(element.scrollLeft).toBeGreaterThan(0);
    expect(tile.left).toBeGreaterThanOrEqual(view.left - 1);
    expect(tile.right).toBeLessThanOrEqual(view.right + 1);
  });

  it('brings a tile only half in view into view when it is picked', async () => {
    const groupFixture = TestBed.createComponent(GroupTabsTestComponent);
    groupFixture.detectChanges();
    await groupFixture.whenStable();
    groupFixture.detectChanges();

    const element: HTMLElement = groupFixture.nativeElement.querySelector(
      '.nx-product-tile-carousel__viewport',
    );
    expect(element.scrollLeft).toBe(0);

    // The last tile is the one hanging off the end of a 300px track.
    groupFixture.componentInstance.value.set('four');
    groupFixture.detectChanges();
    await groupFixture.whenStable();
    const picked: HTMLElement = groupFixture.nativeElement.querySelectorAll('nx-product-tile')[3];
    // The reveal is smooth, so the track is still on its way when the position first moves.
    const arrived = () => {
      const v = element.getBoundingClientRect();
      const t = picked.getBoundingClientRect();
      return t.left >= v.left - 1 && t.right <= v.right + 1;
    };
    for (let attempt = 0; attempt < 60 && !arrived(); attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 25));
    }

    const view = element.getBoundingClientRect();
    const tile = picked.getBoundingClientRect();
    expect(element.scrollLeft).toBeGreaterThan(0);
    expect(tile.left).toBeGreaterThanOrEqual(view.left - 1);
    expect(tile.right).toBeLessThanOrEqual(view.right + 1);
  });

  it('leaves the track at its start when nothing is picked', async () => {
    const groupFixture = TestBed.createComponent(GroupTabsTestComponent);
    groupFixture.detectChanges();
    await groupFixture.whenStable();
    groupFixture.detectChanges();

    const element: HTMLElement = groupFixture.nativeElement.querySelector(
      '.nx-product-tile-carousel__viewport',
    );
    expect(element.scrollLeft).toBe(0);
  });

  it('picks the tiles of a group up through its carousel', async () => {
    const groupFixture = TestBed.createComponent(GroupTabsTestComponent);
    groupFixture.detectChanges();
    await groupFixture.whenStable();
    groupFixture.detectChanges();

    const groupTabs: HTMLElement[] = Array.from(
      groupFixture.nativeElement.querySelectorAll('.nx-product-tile-carousel__tab'),
    );
    expect(groupTabs.map((tab) => tab.textContent?.trim())).toEqual(
      groupFixture.componentInstance.items(),
    );
  });
});

import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxPriceComponent } from '@allianz/ng-aquila/price';
import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core';
import { outputToObservable } from '@angular/core/rxjs-interop';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NxProductTileColorScheme, NxProductTileComponent } from './product-tile.component';
import {
  NxProductTileEyebrowDirective,
  NxProductTileHeaderContentDirective,
  NxProductTilePriceDirective,
  NxProductTileSecondaryActionDirective,
  NxProductTileSublineDirective,
  NxProductTileTitleDirective,
} from './product-tile-content.directive';
import { NxProductTileGroupComponent } from './product-tile-group.component';
import { NxProductTileSelectButton } from './product-tile-select-button.component';

const CONTENT_DIRECTIVES = [
  NxProductTileSelectButton,
  NxProductTileEyebrowDirective,
  NxProductTileHeaderContentDirective,
  NxProductTilePriceDirective,
  NxProductTileSecondaryActionDirective,
  NxProductTileSublineDirective,
  NxProductTileTitleDirective,
];

@Component({
  selector: 'test-single-product-tile',
  template: `<nx-product-tile-group>
    <nx-product-tile value="comfort" [colorScheme]="colorScheme()" [promotion]="promotion()">
      @if (withEyebrow()) {
        <span nxProductTileEyebrow>Best value</span>
      }
      <span nxProductTileTitle>Comfort</span>
      @if (withSubline()) {
        <span nxProductTileSubline>Everyday cover</span>
      }
      @if (withPrice()) {
        <nx-price nxProductTilePrice [value]="42" />
      }
      <ul>
        <li>Third party liability</li>
      </ul>
      <nx-price size="s" [value]="9" />
      @if (withAction()) {
        <button nxProductTileSelectButton type="button" [position]="buttonPosition()"></button>
      }
      @if (withSecondaryAction()) {
        <a nxProductTileSecondaryAction href="#">Compare</a>
      }
    </nx-product-tile>
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxProductTileComponent,
    NxProductTileGroupComponent,
    NxPriceComponent,
    ...CONTENT_DIRECTIVES,
  ],
})
class SingleProductTileComponent {
  tile = viewChild.required(NxProductTileComponent);
  colorScheme = signal<NxProductTileColorScheme>('attention');
  buttonPosition = signal<'top' | 'bottom'>('bottom');
  promotion = signal<string | null>(null);
  withEyebrow = signal(true);
  withSubline = signal(true);
  withPrice = signal(true);
  withAction = signal(true);
  withSecondaryAction = signal(false);
}

@Component({
  selector: 'test-product-tile-custom-header',
  template: `<nx-product-tile-group>
    <nx-product-tile value="comfort" colorScheme="accent-attention" accentColor="green">
      @if (withHeaderContent()) {
        <div nxProductTileHeaderContent id="custom-header">
          <span class="custom-title">Comfort</span>
          <nx-price size="s" [value]="42" />
        </div>
      }
      <span nxProductTileTitle>Comfort</span>
      <nx-price nxProductTilePrice [value]="42" />
      <ul>
        <li>Third party liability</li>
      </ul>
    </nx-product-tile>
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxProductTileComponent,
    NxProductTileGroupComponent,
    NxPriceComponent,
    ...CONTENT_DIRECTIVES,
  ],
})
class CustomHeaderProductTileComponent {
  tile = viewChild.required(NxProductTileComponent);
  withHeaderContent = signal(true);
}

@Component({
  selector: 'test-product-tile-group',
  template: `<nx-product-tile-group aria-label="Pick a product" [(value)]="value">
    @for (product of products(); track product) {
      <nx-product-tile [value]="product">
        <span nxProductTileTitle>{{ product }}</span>
        <button nxProductTileSelectButton type="button"></button>
      </nx-product-tile>
    }
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileComponent, NxProductTileGroupComponent, ...CONTENT_DIRECTIVES],
})
class ProductTileGroupTestComponent {
  group = viewChild.required(NxProductTileGroupComponent);
  products = signal(['basic', 'comfort', 'premium']);
  value = signal<string | null>(null);
}

@Component({
  selector: 'test-product-tile-reactive-forms',
  template: `<nx-product-tile-group [formControl]="control">
    @for (product of products; track product) {
      <nx-product-tile [value]="product">
        <span nxProductTileTitle>{{ product }}</span>
      </nx-product-tile>
    }
    <nx-error>Pick a product</nx-error>
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    NxProductTileComponent,
    NxProductTileGroupComponent,
    NxErrorComponent,
    ReactiveFormsModule,
    ...CONTENT_DIRECTIVES,
  ],
})
class ProductTileReactiveFormsComponent {
  group = viewChild.required(NxProductTileGroupComponent);
  control = new FormControl<string | null>(null, Validators.required);
  products = ['basic', 'comfort'];
}

@Component({
  selector: 'test-product-tile-group-without-values',
  template: `<nx-product-tile-group>
    <nx-product-tile><span nxProductTileTitle>Basic</span></nx-product-tile>
    <nx-product-tile><span nxProductTileTitle>Comfort</span></nx-product-tile>
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileComponent, NxProductTileGroupComponent, ...CONTENT_DIRECTIVES],
})
class ProductTileGroupWithoutValuesComponent {}

@Component({
  selector: 'test-product-tile-group-labelled-by',
  template: `<h3 id="section-headline">Choose your cover</h3>
    <nx-product-tile-group aria-labelledby="section-headline">
      <nx-product-tile value="basic">
        <span nxProductTileTitle>Basic</span>
      </nx-product-tile>
    </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NxProductTileComponent, NxProductTileGroupComponent, ...CONTENT_DIRECTIVES],
})
class ProductTileGroupLabelledByComponent {
  group = viewChild.required(NxProductTileGroupComponent);
}

describe('NxProductTileComponent', () => {
  describe('on its own in a group', () => {
    let fixture: ComponentFixture<SingleProductTileComponent>;
    let host: SingleProductTileComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(SingleProductTileComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    // The body is a wildcard `<ng-content>` declared between the header's slots and the action's.
    // Angular defers wildcard matching, so the slots keep their content whatever the order is.
    it('puts undirected content in the body and leaves the slots alone', () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const body = tileElement.querySelector('.nx-product-tile__body');

      expect(body.querySelector('ul')).toBeTruthy();
      expect(body.querySelector('nx-price')).toBeTruthy();
      expect(body.querySelector('[nxProductTileTitle]')).toBeNull();
      expect(body.querySelector('[nxProductTileSelectButton]')).toBeNull();
      expect(tileElement.querySelector('.nx-product-tile__title')).toBeTruthy();
      expect(tileElement.querySelector('.nx-product-tile__action button')).toBeTruthy();
    });

    it('imposes its price size on the price slot only', () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');

      expect(tileElement.querySelector('.nx-product-tile__price nx-price').classList).toContain(
        'nx-price--2xl',
      );
      // Unmarked, so outside the slot that publishes the imposed size.
      expect(tileElement.querySelector('.nx-product-tile__body nx-price').classList).toContain(
        'nx-price--s',
      );
    });

    it('renders the projected slots', () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      expect(tileElement.querySelector('.nx-product-tile__eyebrow')).toBeTruthy();
      expect(tileElement.querySelector('.nx-product-tile__title')).toBeTruthy();
      expect(tileElement.querySelector('.nx-product-tile__subline')).toBeTruthy();
      expect(tileElement.querySelector('.nx-product-tile__price')).toBeTruthy();
      expect(tileElement.querySelector('.nx-product-tile__action')).toBeTruthy();
    });

    it('leaves out wrappers for slots that were not filled', async () => {
      host.withEyebrow.set(false);
      host.withSubline.set(false);
      host.withPrice.set(false);
      host.withSecondaryAction.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      expect(tileElement.querySelector('.nx-product-tile__eyebrow')).toBeNull();
      expect(tileElement.querySelector('.nx-product-tile__subline')).toBeNull();
      expect(tileElement.querySelector('.nx-product-tile__price')).toBeNull();
      expect(tileElement.querySelector('.nx-product-tile__secondary-action')).toBeNull();
    });

    it('keeps the selection of the only tile there is', async () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const input = tileElement.querySelector('.nx-product-tile__input') as HTMLInputElement;
      expect(input.type).toBe('radio');
      expect(host.tile().selected()).toBe(false);

      input.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.tile().selected()).toBe(true);
      expect(tileElement.classList).toContain('is-selected');

      // Radio semantics: a second click on the only tile there is must not unpick it.
      input.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.tile().selected()).toBe(true);
    });

    it('selects the tile when its primary action is clicked', async () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');

      (tileElement.querySelector('[nxProductTileSelectButton]') as HTMLButtonElement).click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.tile().selected()).toBe(true);
    });

    it('names the control by the title and the price', () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const input = tileElement.querySelector('.nx-product-tile__input') as HTMLInputElement;
      const title = tileElement.querySelector('.nx-product-tile__title') as HTMLElement;
      const price = tileElement.querySelector('.nx-product-tile__price') as HTMLElement;

      expect(input.getAttribute('aria-labelledby')).toBe(`${title.id} ${price.id}`);
    });

    it('selects the tile from a click anywhere in the header, not just the control', async () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const header = tileElement.querySelector('.nx-product-tile__header') as HTMLElement;

      (header.querySelector('.nx-product-tile__price') as HTMLElement).click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.tile().selected()).toBe(true);
    });

    it('moves focus to the control on a header click, so screen readers announce the selection', () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const input = tileElement.querySelector('.nx-product-tile__input') as HTMLInputElement;

      (tileElement.querySelector('.nx-product-tile__title') as HTMLElement).click();

      expect(document.activeElement).toBe(input);
    });

    it('imposes its own price size on a projected price', () => {
      const price = fixture.debugElement.query(By.directive(NxPriceComponent));
      expect(price.nativeElement.classList).toContain('nx-price--2xl');
    });

    it('reflects the color scheme on the host and the header surface', async () => {
      host.colorScheme.set('emphasis');
      fixture.detectChanges();
      await fixture.whenStable();

      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      expect(tileElement.getAttribute('data-color-scheme')).toBe('emphasis');
      expect(
        tileElement.querySelector('.nx-product-tile__header').getAttribute('data-nx-surface'),
      ).toBe('emphasis');
    });

    it('paints the plain scheme on the default surface and divides it from the body', async () => {
      host.colorScheme.set('plain');
      fixture.detectChanges();
      await fixture.whenStable();

      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const background = tileElement.querySelector('.nx-product-tile__header-background');
      expect(background.getAttribute('data-nx-surface')).toBe('default');
      expect(
        tileElement.querySelector('.nx-product-tile__header').getAttribute('data-nx-surface'),
      ).toBe('default');

      const divider = getComputedStyle(background, '::after');
      expect(divider.borderBottomStyle).toBe('solid');
      // The divider stops at the content's edges rather than the tile's.
      expect(parseFloat(divider.left)).toBeGreaterThan(0);
      expect(divider.left).toBe(
        getComputedStyle(tileElement.querySelector('.nx-product-tile__header')).paddingLeft,
      );
    });

    it('shows the promotion bar only when there is something to show', async () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      expect(tileElement.querySelector('.nx-product-tile__promotion')).toBeNull();

      host.promotion.set('Bestseller');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(tileElement.querySelector('.nx-product-tile__promotion').textContent).toContain(
        'Bestseller',
      );
    });

    it('keeps the selection ring clear of the promotion bar', async () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      const ringTopWidth = () => getComputedStyle(tileElement, '::before').borderTopWidth;

      expect(ringTopWidth()).not.toBe('0px');

      host.promotion.set('Bestseller');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(tileElement.classList).toContain('has-promotion');
      expect(ringTopWidth()).toBe('0px');
    });

    it('leaves the select button its own appearance when it moves into the header', async () => {
      const action = fixture.nativeElement.querySelector(
        '.nx-product-tile__action button',
      ) as HTMLElement;
      expect(action.classList).toContain('nx-button--secondary');

      host.buttonPosition.set('top');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(action.classList).toContain('nx-button--secondary');
    });

    it('marks the button position on the host', async () => {
      const tileElement = fixture.nativeElement.querySelector('nx-product-tile');
      expect(tileElement.classList).not.toContain('button-position-top');

      host.buttonPosition.set('top');
      fixture.detectChanges();
      await fixture.whenStable();

      expect(tileElement.classList).toContain('button-position-top');
    });
  });

  describe('with a custom header', () => {
    let fixture: ComponentFixture<CustomHeaderProductTileComponent>;
    let host: CustomHeaderProductTileComponent;

    function tileElement(): HTMLElement {
      return fixture.nativeElement.querySelector('nx-product-tile');
    }

    beforeEach(async () => {
      fixture = TestBed.createComponent(CustomHeaderProductTileComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('renders the container in the header and drops the slot wrappers', () => {
      const header = tileElement().querySelector('.nx-product-tile__header')!;

      expect(header.querySelector('.nx-product-tile__header-content')).toBeTruthy();
      expect(header.querySelector('.custom-title')).toBeTruthy();
      expect(header.querySelector('.nx-product-tile__headline')).toBeNull();
      expect(header.querySelector('.nx-product-tile__price')).toBeNull();
    });

    it('keeps showing the selection control', async () => {
      const input = tileElement().querySelector('.nx-product-tile__input') as HTMLInputElement;
      expect(tileElement().querySelector('nx-radio-indicator')).toBeTruthy();

      input.click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.tile().selected()).toBe(true);
    });

    it('names the control after the header wrapper, leaving the consumer their own id', () => {
      const input = tileElement().querySelector('.nx-product-tile__input')!;
      const wrapper = tileElement().querySelector('.nx-product-tile__header-content')!;
      const container = tileElement().querySelector('[nxProductTileHeaderContent]')!;

      expect(wrapper.id).toBe(`${input.id}-header`);
      expect(input.getAttribute('aria-labelledby')).toBe(wrapper.id);
      expect(container.id).toBe('custom-header');
    });

    it('leaves the price size to the container content', () => {
      const price = tileElement().querySelector('[nxProductTileHeaderContent] nx-price')!;

      expect(price.classList).toContain('nx-price--s');
      expect(price.classList).not.toContain('nx-price--2xl');
    });

    it('publishes the header surface to the container content', () => {
      const price = fixture.debugElement
        .query(By.directive(NxPriceComponent))
        .injector.get(NxPriceComponent);

      expect(price.colorScheme()).toBe('on-accent-attention');
      expect(price.inverse()).toBe(false);
    });

    it('falls back to the slots once the container is gone', async () => {
      host.withHeaderContent.set(false);
      fixture.detectChanges();
      await fixture.whenStable();

      const header = tileElement().querySelector('.nx-product-tile__header')!;
      const input = tileElement().querySelector('.nx-product-tile__input')!;

      expect(header.querySelector('.nx-product-tile__header-content')).toBeNull();
      expect(header.querySelector('.nx-product-tile__title')).toBeTruthy();
      expect(input.getAttribute('aria-labelledby')).toBe(`${input.id}-title ${input.id}-price`);
      // The slot price is back under the size the tile imposes tile-wide.
      expect(header.querySelector('.nx-product-tile__price nx-price')!.classList).toContain(
        'nx-price--2xl',
      );
    });
  });

  describe('in a group', () => {
    let fixture: ComponentFixture<ProductTileGroupTestComponent>;
    let host: ProductTileGroupTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ProductTileGroupTestComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    const tileElements = (): HTMLElement[] =>
      Array.from(fixture.nativeElement.querySelectorAll('nx-product-tile'));

    const inputs = (): HTMLInputElement[] =>
      Array.from(fixture.nativeElement.querySelectorAll('.nx-product-tile__input'));

    it('renders one radio input per tile', () => {
      expect(inputs().length).toBe(3);
      expect(inputs().every((input) => input.type === 'radio')).toBe(true);
      expect(new Set(inputs().map((input) => input.name)).size).toBe(1);
    });

    it('labels each input by its own tile title', () => {
      for (const input of inputs()) {
        const titleId = input.getAttribute('aria-labelledby')!;
        expect(fixture.nativeElement.querySelector(`#${titleId}`).textContent).toBeTruthy();
      }
    });

    it('replaces the value on selection', async () => {
      inputs()[1].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.value()).toBe('comfort');
      expect(tileElements()[1].classList).toContain('is-selected');

      inputs()[2].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.value()).toBe('premium');
      expect(tileElements()[1].classList).not.toContain('is-selected');
    });

    it('emits nothing when the tile that is already picked is picked again', async () => {
      const onChange = vi.fn();
      host.group().value.set('comfort');
      fixture.detectChanges();
      outputToObservable(host.group()._items()[1].selectionChange).subscribe(onChange);

      inputs()[1].click();
      tileElements()[1].querySelector<HTMLElement>('.nx-product-tile__header')!.click();

      expect(onChange).not.toHaveBeenCalled();
    });

    it('selects through the primary action, not just the control', async () => {
      const actions: HTMLButtonElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('[nxProductTileSelectButton]'),
      );

      actions[2].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.value()).toBe('premium');
      expect(tileElements()[2].classList).toContain('is-selected');
    });

    it('picks up tiles that appear later', async () => {
      host.products.set(['basic', 'comfort', 'premium', 'business']);
      fixture.detectChanges();
      await fixture.whenStable();

      inputs()[3].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.value()).toBe('business');
    });

    it('is a radiogroup named by its aria-label', () => {
      const group = fixture.nativeElement.querySelector('nx-product-tile-group');
      expect(group.getAttribute('role')).toBe('radiogroup');
      expect(group.getAttribute('aria-label')).toBe('Pick a product');
    });
  });

  describe('with tiles that carry no value', () => {
    it('picks none of them against the empty group value', async () => {
      const fixture = TestBed.createComponent(ProductTileGroupWithoutValuesComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const tiles: HTMLElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('nx-product-tile'),
      );
      const inputs: HTMLInputElement[] = Array.from(
        fixture.nativeElement.querySelectorAll('.nx-product-tile__input'),
      );

      expect(tiles.some((tile) => tile.classList.contains('is-selected'))).toBe(false);
      expect(inputs.some((input) => input.checked)).toBe(false);
    });

    it('leaves the group value alone when one of them is clicked', async () => {
      const fixture = TestBed.createComponent(ProductTileGroupWithoutValuesComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      const group = fixture.debugElement.query(By.directive(NxProductTileGroupComponent))
        .componentInstance as NxProductTileGroupComponent;
      group.value.set('basic');

      fixture.nativeElement.querySelector('.nx-product-tile__header').click();

      expect(group.value()).toBe('basic');
    });
  });

  describe('named by an element of the consumer', () => {
    let fixture: ComponentFixture<ProductTileGroupLabelledByComponent>;
    let host: ProductTileGroupLabelledByComponent;

    const groupElement = (): HTMLElement =>
      fixture.nativeElement.querySelector('nx-product-tile-group');

    beforeEach(async () => {
      fixture = TestBed.createComponent(ProductTileGroupLabelledByComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('keeps the aria-labelledby it was given', () => {
      expect(groupElement().getAttribute('aria-labelledby')).toBe('section-headline');
    });
  });

  describe('entering the group by keyboard', () => {
    let fixture: ComponentFixture<ProductTileGroupTestComponent>;

    function controls(): HTMLInputElement[] {
      return Array.from(fixture.nativeElement.querySelectorAll('.nx-product-tile__input'));
    }

    function actions(): HTMLElement[] {
      return Array.from(fixture.nativeElement.querySelectorAll('.nx-product-tile__action button'));
    }

    function groupElement(): HTMLElement {
      return fixture.nativeElement.querySelector('nx-product-tile-group');
    }

    beforeEach(async () => {
      fixture = TestBed.createComponent(ProductTileGroupTestComponent);
      fixture.componentInstance.value.set('premium');
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('lands on the picked tile rather than on the first one', async () => {
      // Tabbing in arrives at whatever the group holds first, ahead of the picked tile.
      actions()[0].focus();
      await fixture.whenStable();

      expect(document.activeElement).toBe(controls()[2]);
      expect((document.activeElement as HTMLInputElement).checked).toBe(true);
    });

    it('leaves a pointer with what it aimed at', async () => {
      groupElement().dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      actions()[0].focus();
      await fixture.whenStable();

      expect(document.activeElement).toBe(actions()[0]);
    });

    it('leaves shift-tab at the end of the group', async () => {
      // Coming backwards, focus lands behind the picked tile and belongs there.
      actions()[2].focus();
      await fixture.whenStable();
      const last = actions()[actions().length - 1];
      last.focus();
      await fixture.whenStable();

      expect(document.activeElement).toBe(last);
    });

    it('leaves the first tile alone when nothing is picked', async () => {
      fixture.componentInstance.value.set(null);
      fixture.detectChanges();
      await fixture.whenStable();

      actions()[0].focus();
      await fixture.whenStable();

      expect(document.activeElement).toBe(actions()[0]);
    });
  });

  describe('group layout', () => {
    let fixture: ComponentFixture<ProductTileGroupTestComponent>;
    let host: ProductTileGroupTestComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ProductTileGroupTestComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    const carousel = (): HTMLElement =>
      fixture.nativeElement.querySelector('nx-product-tile-carousel');

    const track = (): HTMLElement =>
      carousel().querySelector('.nx-product-tile-carousel__viewport')!;

    const tileElements = (): HTMLElement[] =>
      Array.from(fixture.nativeElement.querySelectorAll('nx-product-tile'));

    const tilesInView = (): HTMLElement[] =>
      tileElements().filter(
        (tile) => !tile.classList.contains('nx-product-tile-carousel__item--outside'),
      );

    /** The visibility observer reports a frame after layout, so poll rather than guess a delay. */
    const waitForTilesInView = async (expected: number): Promise<number> => {
      for (let attempt = 0; attempt < 20 && tilesInView().length !== expected; attempt++) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
      // What the carousel measured only reaches its host bindings on the next update pass.
      fixture.detectChanges();
      return tilesInView().length;
    };

    it('puts the tiles on one line inside the carousel track', async () => {
      viewport.set('mobile');
      host.products.set(['basic', 'comfort', 'premium', 'business', 'premium-plus']);
      fixture.detectChanges();
      await fixture.whenStable();

      expect(track().querySelectorAll(':scope > nx-product-tile').length).toBe(5);
      const tops = new Set(tileElements().map((tile) => tile.getBoundingClientRect().top));
      expect(tops.size).toBe(1);
    });

    it('lets the tiles share the full width while they all fit', async () => {
      viewport.set('desktop');
      await waitForTilesInView(3);

      const widths = tileElements().map((tile) => tile.getBoundingClientRect().width);
      const style = getComputedStyle(track());
      const gap = parseFloat(style.columnGap);
      const inset = parseFloat(style.paddingInlineStart);
      expect(widths[0]).toBeCloseTo(widths[2], 1);
      expect(
        Math.abs(widths[0] + widths[1] + widths[2] + 2 * gap - (track().clientWidth - 2 * inset)),
      ).toBeLessThan(1);
      expect(carousel().classList).not.toContain('can-scroll-forward');
    });

    it('scrolls once there are more tiles than fit', async () => {
      viewport.set('desktop');
      host.products.set(['basic', 'comfort', 'premium', 'business', 'premium-plus']);
      fixture.detectChanges();
      await fixture.whenStable();
      await waitForTilesInView(3);

      expect(carousel().classList).toContain('can-scroll-forward');
      expect(track().scrollWidth).toBeGreaterThan(track().clientWidth);
    });

    it('gives every tile the same height and the same header height', async () => {
      viewport.set('desktop');
      host.products.set([
        'basic',
        'a considerably longer product name that has to wrap',
        'premium',
      ]);
      fixture.detectChanges();
      await fixture.whenStable();
      await waitForTilesInView(3);

      const heightsOf = (selector: string) =>
        tileElements().map((tile) =>
          Math.round(tile.querySelector(selector)!.getBoundingClientRect().height),
        );

      // Without a wrapped title the rest of the assertions would hold trivially.
      const titles = heightsOf('.nx-product-tile__title');
      expect(titles[1]).toBeGreaterThan(titles[0]);

      expect(new Set(heightsOf('.nx-product-tile__header')).size).toBe(1);
      expect(
        new Set(tileElements().map((tile) => Math.round(tile.getBoundingClientRect().height))).size,
      ).toBe(1);
    });

    it('keeps the outer tiles flush with the group and their shadows inside the track', async () => {
      viewport.set('desktop');
      host.products.set(['basic', 'comfort', 'premium', 'business', 'premium-plus']);
      fixture.detectChanges();
      await fixture.whenStable();
      await waitForTilesInView(3);

      const group = fixture.nativeElement
        .querySelector('nx-product-tile-group')!
        .getBoundingClientRect();
      const inset = parseFloat(getComputedStyle(track()).paddingInlineStart);
      expect(inset).toBeGreaterThan(0);

      expect(tileElements()[0].getBoundingClientRect().left).toBeCloseTo(group.left, 0);
      expect(track().getBoundingClientRect().left).toBeCloseTo(group.left - inset, 0);

      track().scrollLeft = track().scrollWidth;
      expect(tileElements()[4].getBoundingClientRect().right).toBeCloseTo(group.right, 0);
      expect(track().getBoundingClientRect().right).toBeCloseTo(group.right + inset, 0);
    });

    it('peeks the tiles on whichever side is holding more of them', async () => {
      viewport.set('desktop');
      host.products.set(['basic', 'comfort', 'premium', 'business', 'premium-plus']);
      fixture.detectChanges();
      await fixture.whenStable();
      await waitForTilesInView(3);

      const style = getComputedStyle(track());
      const scrollport = () => {
        const box = track().getBoundingClientRect();
        return {
          left: box.left + parseFloat(style.paddingInlineStart),
          right: box.right - parseFloat(style.paddingInlineEnd),
        };
      };
      /** How much of each tile the scrollport shows. */
      const visible = () =>
        tileElements().map((tile) => {
          const box = tile.getBoundingClientRect();
          const port = scrollport();
          return Math.round(
            Math.max(0, Math.min(box.right, port.right) - Math.max(box.left, port.left)),
          );
        });

      const atStart = visible();
      expect(atStart[4]).toBe(0);
      expect(atStart[3]).toBeGreaterThan(0);

      const settled = new Promise<void>((resolve) =>
        track().addEventListener('scrollend', () => resolve(), { once: true }),
      );
      carousel()
        .querySelector<HTMLButtonElement>('.nx-product-tile-carousel__arrow--next')!
        .click();
      await settled;

      // Half the peek on each side, which is what the track's `scroll-padding` buys.
      const inTheMiddle = visible();
      expect(inTheMiddle[0]).toBeGreaterThan(0);
      expect(inTheMiddle[4]).toBeCloseTo(inTheMiddle[0], 0);

      track().scrollLeft = track().scrollWidth;
      const atEnd = visible();
      expect(atEnd[0]).toBe(0);
      expect(atEnd[1]).toBeGreaterThan(0);
    });

    it('shows one, two or three tiles depending on the viewport and fades the rest', async () => {
      host.products.set(['basic', 'comfort', 'premium', 'business', 'premium-plus']);
      fixture.detectChanges();
      await fixture.whenStable();

      viewport.set('mobile');
      expect(await waitForTilesInView(1)).toBe(1);

      viewport.set('tablet');
      expect(await waitForTilesInView(2)).toBe(2);

      viewport.set('desktop');
      expect(await waitForTilesInView(3)).toBe(3);

      const faded = tileElements()[4];
      expect(faded.classList).toContain('nx-product-tile-carousel__item--outside');
      // The class lands first and the opacity transitions down from 1 over 200ms, so reading it
      // straight away reads the value it is leaving.
      for (
        let attempt = 0;
        attempt < 40 && parseFloat(getComputedStyle(faded).opacity) === 1;
        attempt++
      ) {
        await new Promise((resolve) => setTimeout(resolve, 25));
      }
      expect(parseFloat(getComputedStyle(faded).opacity)).toBeLessThan(1);
    });
  });

  describe('with reactive forms', () => {
    let fixture: ComponentFixture<ProductTileReactiveFormsComponent>;
    let host: ProductTileReactiveFormsComponent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(ProductTileReactiveFormsComponent);
      host = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
    });

    it('writes the control value into the group', async () => {
      host.control.setValue('comfort');
      fixture.detectChanges();
      await fixture.whenStable();

      const tiles = fixture.nativeElement.querySelectorAll('nx-product-tile');
      expect(tiles[1].classList).toContain('is-selected');
    });

    it('writes a selection back into the control', async () => {
      fixture.nativeElement.querySelectorAll('.nx-product-tile__input')[0].click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(host.control.value).toBe('basic');
    });

    it('shows the error only once the control is touched and invalid', async () => {
      expect(fixture.nativeElement.querySelector('nx-error')).toBeNull();

      host.control.markAsTouched();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.nativeElement.querySelector('nx-error')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('nx-product-tile').classList).toContain(
        'has-error',
      );
    });
  });
});

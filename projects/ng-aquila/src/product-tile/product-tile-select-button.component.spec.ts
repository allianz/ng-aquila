import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NxProductTileSelectButtonIntl } from './product-tile.intl';
import { NX_PRODUCT_TILE_IMPORTS } from './product-tile-imports';

@Component({
  selector: 'test-product-tile-select-button',
  template: `<nx-product-tile-group [(value)]="value">
    @for (product of products; track product; let first = $first) {
      <nx-product-tile [value]="product">
        <span nxProductTileTitle>{{ product }}</span>
        <span nxProductTilePrice>42</span>
        <button
          nxProductTileSelectButton
          type="button"
          [position]="first ? buttonPosition() : 'bottom'"
          [selectedLabel]="selectedLabel()"
          [unselectedLabel]="unselectedLabel()"
        ></button>
      </nx-product-tile>
    }
  </nx-product-tile-group>`,
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [NX_PRODUCT_TILE_IMPORTS],
})
class SelectButtonTestComponent {
  readonly products = ['basic', 'comfort'];
  value = signal<string | null>(null);
  buttonPosition = signal<'top' | 'bottom'>('bottom');
  selectedLabel = signal<string | undefined>(undefined);
  unselectedLabel = signal<string | undefined>(undefined);
}

describe('NxProductTileSelectButton', () => {
  let fixture: ComponentFixture<SelectButtonTestComponent>;
  let host: SelectButtonTestComponent;

  function buttons(): HTMLButtonElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('button[nxProductTileSelectButton]'));
  }

  async function settle(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
  }

  beforeEach(async () => {
    fixture = TestBed.createComponent(SelectButtonTestComponent);
    host = fixture.componentInstance;
    await settle();
  });

  it('shows the intl labels and no check mark while unpicked', () => {
    expect(buttons()[0].textContent!.trim()).toBe('Select');
    expect(buttons()[0].querySelector('nx-icon')).toBeNull();
    expect(buttons()[0].getAttribute('aria-pressed')).toBe('false');
  });

  it('shows a check mark and the selected label once picked', async () => {
    buttons()[0].click();
    await settle();

    expect(host.value()).toBe('basic');
    expect(buttons()[0].textContent!.trim()).toBe('Selected');
    expect(buttons()[0].querySelector('nx-icon')!.getAttribute('name')).toBe('check');
    expect(buttons()[0].getAttribute('aria-pressed')).toBe('true');
    // The other tile in the group stays unpicked.
    expect(buttons()[1].textContent!.trim()).toBe('Select');
    expect(buttons()[1].querySelector('nx-icon')).toBeNull();
  });

  it('paints every header as tall as the tallest, whichever side its button is on', async () => {
    const headerHeights = () =>
      Array.from<HTMLElement>(
        fixture.nativeElement.querySelectorAll('.nx-product-tile__header-background'),
      ).map((background) => Math.round(background.getBoundingClientRect().height));

    host.buttonPosition.set('top');
    await settle();

    const [withButton, without] = headerHeights();
    expect(without).toBe(withButton);
  });

  it('is secondary while unpicked and primary once picked', async () => {
    expect(buttons()[0].classList).toContain('nx-button--secondary');

    buttons()[0].click();
    await settle();

    expect(buttons()[0].classList).toContain('nx-button--primary');
    expect(buttons()[0].classList).not.toContain('nx-button--secondary');
    expect(buttons()[1].classList).toContain('nx-button--secondary');
  });

  it('keeps that appearance in the header, where the action sits on the painted surface', async () => {
    host.buttonPosition.set('top');
    await settle();

    expect(fixture.nativeElement.querySelector('nx-product-tile')!.classList).toContain(
      'button-position-top',
    );
    expect(buttons()[0].classList).toContain('nx-button--secondary');

    buttons()[0].click();
    await settle();

    expect(buttons()[0].classList).toContain('nx-button--primary');
    expect(buttons()[0].classList).not.toContain('nx-button--secondary');
  });

  it("is described by its tile's title and price, like the radio input", () => {
    const tiles = fixture.nativeElement.querySelectorAll('nx-product-tile');
    buttons().forEach((button, i) => {
      const title = tiles[i].querySelector('.nx-product-tile__title') as HTMLElement;
      const price = tiles[i].querySelector('.nx-product-tile__price') as HTMLElement;
      const input = tiles[i].querySelector('.nx-product-tile__input') as HTMLInputElement;

      expect(button.getAttribute('aria-describedby')).toBe(`${title.id} ${price.id}`);
      expect(button.getAttribute('aria-describedby')).toBe(input.getAttribute('aria-labelledby'));
    });
  });

  it('stays in the tab order like a normal button', () => {
    expect(buttons().map((b) => b.tabIndex)).toEqual([0, 0]);
  });

  it('lets the labels be set per button, over the intl', async () => {
    host.unselectedLabel.set('Choose this');
    host.selectedLabel.set('Chosen');
    await settle();

    expect(buttons()[0].textContent!.trim()).toBe('Choose this');

    buttons()[0].click();
    await settle();

    expect(buttons()[0].textContent!.trim()).toBe('Chosen');
  });

  it('takes changed intl labels for every button in the group', async () => {
    TestBed.inject(NxProductTileSelectButtonIntl).unselectedLabel.set('Pick');
    await settle();

    expect(buttons().map((b) => b.textContent!.trim())).toEqual(['Pick', 'Pick']);
  });
});

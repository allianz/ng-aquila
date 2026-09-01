import { NxBadgeComponent } from '@allianz/ng-aquila/badge';
import { NxButtonModule } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxEyebrowModule } from '@allianz/ng-aquila/eyebrow';
import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxIconComponent, NxStatusIconComponent } from '@allianz/ng-aquila/icon';
import { NxPriceModule } from '@allianz/ng-aquila/price';
import { Component, signal, type Type } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NxSurface } from './surface';
import type { NxSurfaceAccentColor, NxSurfaceType } from './surface-types';

const A1_PROVIDERS = [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }];

// What each adopting component does on each surface. These mappings come from the design system,
// not from anything derivable in code, so they are pinned here.
describe('nxSurface adoption', () => {
  let fixture: ComponentFixture<AdoptersComponent | NonA1AdoptersComponent>;

  function createComponent(component: Type<AdoptersComponent | NonA1AdoptersComponent>): void {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
  }

  function setSurface(surface: NxSurfaceType): void {
    fixture.componentInstance.surface.set(surface);
    fixture.detectChanges();
  }

  function classesOf(selector: string): DOMTokenList {
    return (fixture.nativeElement.querySelector(selector) as HTMLElement).classList;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AdoptersComponent, NonA1AdoptersComponent],
    }).compileComponents();
  }));

  describe('plain-button', () => {
    // `on-brand` pairs with a brand-colored background, so on this surface it is near-invisible in
    // the dark color scheme.
    it('inverts on the attention surface, rather than taking the on-brand scheme', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#plain').contains('nx-plain-button--inverse')).toBe(true);
      expect(classesOf('#plain').contains('nx-plain-button--on-brand')).toBe(false);
    });

    it('never derives the on-brand scheme from any surface', () => {
      createComponent(AdoptersComponent);

      for (const surface of [
        'default',
        'attention',
        'emphasis',
        'accent-attention',
      ] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#plain').contains('nx-plain-button--on-brand')).toBe(false);
      }
    });

    it('uses the on-accent-attention scheme on an accent surface', () => {
      createComponent(AdoptersComponent);
      setSurface('accent-attention');

      expect(classesOf('#plain').contains('nx-plain-button--on-accent-attention')).toBe(true);
    });

    it('does not react to the emphasis surface', () => {
      createComponent(AdoptersComponent);
      setSurface('emphasis');

      expect(classesOf('#plain').contains('nx-plain-button--inverse')).toBe(false);
      expect(classesOf('#plain').contains('nx-plain-button--on-accent-attention')).toBe(false);
    });

    it('lets an explicit plain button inverse="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#plain-explicit').contains('nx-plain-button--inverse')).toBe(false);
    });

    it('lets an explicit scheme win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('accent-attention');

      expect(classesOf('#plain-explicit').contains('nx-plain-button--on-accent-attention')).toBe(
        false,
      );
    });
  });

  describe('badge', () => {
    it('switches the badge accent class to its inverse variant on the attention surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#badge').contains('nx-badge-accent-color-subtle-blue--inverse')).toBe(true);
    });

    it('keeps the plain badge accent class on the other surfaces', () => {
      createComponent(AdoptersComponent);

      for (const surface of ['default', 'emphasis', 'accent-attention'] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#badge').contains('nx-badge-accent-color-subtle-blue')).toBe(true);
        expect(classesOf('#badge').contains('nx-badge-accent-color-subtle-blue--inverse')).toBe(
          false,
        );
      }
    });

    it('lets an explicit badge inverse="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(
        classesOf('#badge-explicit').contains('nx-badge-accent-color-subtle-blue--inverse'),
      ).toBe(false);
    });
  });

  describe('status-icon', () => {
    it('inverts the status icon on the attention surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#status-icon').contains('nx-status-icon--inverse')).toBe(true);
    });

    it('does not invert the status icon on the other surfaces', () => {
      createComponent(AdoptersComponent);

      for (const surface of ['default', 'emphasis', 'accent-attention'] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#status-icon').contains('nx-status-icon--inverse')).toBe(false);
      }
    });

    it('lets an explicit status icon inverse="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#status-icon-explicit').contains('nx-status-icon--inverse')).toBe(false);
    });
  });

  // The icon resolves `(input ?? surface) || fill`; a regrouping of the `??` and `||` would change
  // behaviour without failing anything else.
  describe('icon', () => {
    it('inverts the icon on the attention surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#icon').contains('nx-icon--inverse')).toBe(true);
    });

    it('does not invert the icon on the other surfaces', () => {
      createComponent(AdoptersComponent);

      for (const surface of ['default', 'emphasis', 'accent-attention'] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#icon').contains('nx-icon--inverse')).toBe(false);
      }
    });

    it('lets an explicit icon inverse="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#icon-explicit').contains('nx-icon--inverse')).toBe(false);
    });

    it('still inverts when filled, even with an explicit inverse="false"', () => {
      createComponent(AdoptersComponent);
      setSurface('default');

      expect(classesOf('#icon-fill').contains('nx-icon--inverse')).toBe(true);
    });
  });

  describe('button', () => {
    it('goes negative on the attention surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#button').contains('nx-button--negative')).toBe(true);
    });

    it('does not go negative on the emphasis or accent surfaces', () => {
      createComponent(AdoptersComponent);

      setSurface('emphasis');
      expect(classesOf('#button').contains('nx-button--negative')).toBe(false);

      setSurface('accent-attention');
      expect(classesOf('#button').contains('nx-button--negative')).toBe(false);
    });

    // The button has no brand palette, so `attention` goes through `negative` instead.
    it('uses the on-accent-attention scheme on an accent surface', () => {
      createComponent(AdoptersComponent);
      setSurface('accent-attention');

      expect(classesOf('#button').contains('nx-button--on-accent-attention')).toBe(true);
    });

    it('takes the accent hue from the surface, rather than defaulting to blue', () => {
      createComponent(AdoptersComponent);
      fixture.componentInstance.accentColor.set('teal');
      setSurface('accent-attention');

      expect(
        (fixture.nativeElement.querySelector('#button') as HTMLElement).getAttribute(
          'data-accent-color',
        ),
      ).toBe('teal');
    });

    it('does not use a colour scheme on the attention surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#button').contains('nx-button--on-accent-attention')).toBe(false);
    });

    // Explicit author intent, so it must still win - but an absent `negative` must not read as an
    // explicit `false`, or the surface could never apply.
    it('still honours the legacy class string', () => {
      createComponent(AdoptersComponent);

      expect(classesOf('#button-legacy-negative').contains('nx-button--negative')).toBe(true);
    });

    it('lets an explicit negative="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#button-explicit').contains('nx-button--negative')).toBe(false);
    });
  });

  describe('price', () => {
    it('inverts on the attention surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#price').contains('nx-price--inverse')).toBe(true);
    });

    it('does not invert on the other surfaces', () => {
      createComponent(AdoptersComponent);

      for (const surface of ['default', 'emphasis', 'accent-attention'] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#price').contains('nx-price--inverse')).toBe(false);
      }
    });

    it('lets an explicit inverse="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#price-explicit').contains('nx-price--inverse')).toBe(false);
    });
  });

  // No on-accent-attention tokens yet, so unlike price these also invert on the accent surface.
  describe('headline and eyebrow', () => {
    it('invert on the attention and accent-attention surfaces', () => {
      createComponent(AdoptersComponent);

      for (const surface of ['attention', 'accent-attention'] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#headline').contains('nx-heading--inverse')).toBe(true);
        expect(classesOf('#eyebrow').contains('nx-eyebrow-inverse')).toBe(true);
      }
    });

    it('do not invert on the other surfaces', () => {
      createComponent(AdoptersComponent);

      for (const surface of ['default', 'emphasis'] as NxSurfaceType[]) {
        setSurface(surface);

        expect(classesOf('#headline').contains('nx-heading--inverse')).toBe(false);
        expect(classesOf('#eyebrow').contains('nx-eyebrow-inverse')).toBe(false);
      }
    });

    it('let an explicit inverse="false" win over the surface', () => {
      createComponent(AdoptersComponent);
      setSurface('attention');

      expect(classesOf('#headline-explicit').contains('nx-heading--inverse')).toBe(false);
      expect(classesOf('#eyebrow-explicit').contains('nx-eyebrow-inverse')).toBe(false);
    });
  });

  // The surface is not tied to a design system, so adopters react in every theme. The icon is left
  // out: it still gates its own inverse class on A1, see icon.component.ts.
  it('still adapts without an Allianz One provider', () => {
    createComponent(NonA1AdoptersComponent);
    setSurface('attention');

    expect(classesOf('#button').contains('nx-button--negative')).toBe(true);
    expect(classesOf('#plain').contains('nx-plain-button--inverse')).toBe(true);
    expect(classesOf('#price').contains('nx-price--inverse')).toBe(true);
    expect(classesOf('#eyebrow').contains('nx-eyebrow-inverse')).toBe(true);
    expect(classesOf('#headline').contains('nx-heading--inverse')).toBe(true);
    expect(classesOf('#status-icon').contains('nx-status-icon--inverse')).toBe(true);
  });
});

const TEMPLATE = `
  <div [nxSurface]="surface()" [nxSurfaceAccentColor]="accentColor()">
    <button id="plain" nxPlainButton>plain</button>
    <button id="plain-explicit" nxPlainButton colorScheme="default" [inverse]="false">plain</button>
    <nx-badge id="badge" accentColor="blue">badge</nx-badge>
    <nx-badge id="badge-explicit" accentColor="blue" [inverse]="false">badge</nx-badge>
    <nx-status-icon id="status-icon" type="error" />
    <nx-status-icon id="status-icon-explicit" type="error" [inverse]="false" />
    <nx-icon id="icon" name="product-heart" />
    <nx-icon id="icon-explicit" name="product-heart" [inverse]="false" />
    <nx-icon id="icon-fill" name="product-heart" fill [inverse]="false" />
    <button id="button" nxButton>button</button>
    <button id="button-explicit" nxButton [negative]="false">button</button>
    <button id="button-legacy-negative" nxButton="primary negative">button</button>
    <nx-price id="price" [value]="1" />
    <nx-price id="price-explicit" [value]="1" [inverse]="false" />
    <nx-eyebrow id="eyebrow">eyebrow</nx-eyebrow>
    <nx-eyebrow id="eyebrow-explicit" [inverse]="false">eyebrow</nx-eyebrow>
    <h2 id="headline" nxHeadline>headline</h2>
    <h2 id="headline-explicit" nxHeadline [inverse]="false">headline</h2>
  </div>
`;

@Component({
  template: TEMPLATE,
  standalone: true,
  imports: [
    NxSurface,
    NxButtonModule,
    NxPriceModule,
    NxEyebrowModule,
    NxHeadlineModule,
    NxBadgeComponent,
    NxIconComponent,
    NxStatusIconComponent,
  ],
  providers: A1_PROVIDERS,
})
class AdoptersComponent {
  readonly surface = signal<NxSurfaceType>('default');
  readonly accentColor = signal<NxSurfaceAccentColor | undefined>(undefined);
}

/** No ALLIANZ_ONE provider, so only the design-agnostic reactions are asserted. */
@Component({
  template: TEMPLATE,
  standalone: true,
  imports: [
    NxSurface,
    NxButtonModule,
    NxPriceModule,
    NxEyebrowModule,
    NxHeadlineModule,
    NxBadgeComponent,
    NxIconComponent,
    NxStatusIconComponent,
  ],
  host: { 'data-non-a1': '' },
})
class NonA1AdoptersComponent extends AdoptersComponent {}

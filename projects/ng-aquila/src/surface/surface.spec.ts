import { Component, inject, signal, type Type } from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NxSurface } from './surface';
import { SurfaceProbeComponent } from './surface.test-utils';
import { NX_SURFACE, type NxSurfaceInputValue, type NxSurfaceType } from './surface-types';

// No design-system provider anywhere in this file: the surface resolves in every theme.

describe('nxSurface', () => {
  // Loose on purpose: the specs reach into each host's own signals.
  let fixture: ComponentFixture<any>;

  function createComponent(component: Type<unknown>): void {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
  }

  function probe(): SurfaceProbeComponent {
    return fixture.debugElement.query(By.directive(SurfaceProbeComponent))
      .componentInstance as SurfaceProbeComponent;
  }

  function probeElement(): HTMLElement {
    return fixture.nativeElement.querySelector('nx-surface-probe') as HTMLElement;
  }

  /** Queried by directive, since `[nxSurface]` is a binding rather than an element. */
  function surfaceElement(): HTMLElement {
    return fixture.debugElement.query(By.directive(NxSurface)).nativeElement as HTMLElement;
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxSurface,
        SurfaceProbeComponent,
        BasicSurfaceComponent,
        NestedSurfaceComponent,
        InheritSurfaceComponent,
        BlockedSurfaceComponent,
        AccentSurfaceComponent,
        NestedAccentSurfaceComponent,
        InheritAccentSurfaceComponent,
        NoSurfaceComponent,
        NoBackgroundSurfaceComponent,
      ],
    }).compileComponents();
  }));

  describe('the directive', () => {
    it('publishes the surface to its content', () => {
      createComponent(BasicSurfaceComponent);

      expect(probe().surface()).toBe('attention');
    });

    it('renders the CSS contract attribute', () => {
      createComponent(BasicSurfaceComponent);

      expect(surfaceElement().getAttribute('data-nx-surface')).toBe('attention');
    });

    it('omits the attribute for the default surface', () => {
      createComponent(BasicSurfaceComponent);
      fixture.componentInstance.surface.set('default');
      fixture.detectChanges();

      expect(surfaceElement().hasAttribute('data-nx-surface')).toBe(false);
    });

    it('propagates a change to an OnPush child', () => {
      createComponent(BasicSurfaceComponent);
      expect(probeElement().getAttribute('data-resolved-surface')).toBe('attention');

      fixture.componentInstance.surface.set('emphasis');
      fixture.detectChanges();

      expect(probeElement().getAttribute('data-resolved-surface')).toBe('emphasis');
    });

    it('renders the accent hue only for an accent surface', () => {
      createComponent(AccentSurfaceComponent);
      const host = surfaceElement();

      expect(host.getAttribute('data-nx-accent-color')).toBe('yellow');
      expect(probe().surface()).toBe('accent-attention');
      expect(probe().accentColor()).toBe('yellow');

      fixture.componentInstance.surface.set('attention');
      fixture.detectChanges();

      expect(host.hasAttribute('data-nx-accent-color')).toBe(false);
      // Not just the attribute - the published context must drop the hue too.
      expect(probe().accentColor()).toBeUndefined();
    });

    it('falls back to blue when an accent surface names no hue', () => {
      createComponent(NestedSurfaceComponent);
      fixture.componentInstance.inner.set('accent-attention');
      fixture.detectChanges();

      expect(probe().accentColor()).toBe('blue');
    });

    it('does not leak the enclosing hue onto a non-accent nested surface', () => {
      createComponent(NestedAccentSurfaceComponent);

      expect(probe().surface()).toBe('emphasis');
      expect(probe().accentColor()).toBeUndefined();
    });

    it('inherits the enclosing hue through an "inherit" accent surface', () => {
      createComponent(InheritAccentSurfaceComponent);

      expect(probe().surface()).toBe('accent-attention');
      expect(probe().accentColor()).toBe('teal');
    });
  });

  describe('the background', () => {
    it('paints the attention background by default', () => {
      createComponent(BasicSurfaceComponent);

      expect(surfaceElement().style.backgroundColor).toBe(
        'var(--nx-surface-attention-background-color)',
      );
    });

    it('paints the default background for the default surface', () => {
      createComponent(BasicSurfaceComponent);
      fixture.componentInstance.surface.set('default');
      fixture.detectChanges();

      expect(surfaceElement().style.backgroundColor).toBe(
        'var(--nx-surface-default-background-color)',
      );
    });

    it('paints the chosen accent hue for an accent-attention surface', () => {
      createComponent(AccentSurfaceComponent);

      expect(surfaceElement().style.backgroundColor).toBe('var(--color-attention-yellow)');
    });

    it('can be opted out of', () => {
      createComponent(NoBackgroundSurfaceComponent);

      expect(surfaceElement().style.backgroundColor).toBe('');
      // The paint is off, but descendants must still react to the declared surface.
      expect(probe().surface()).toBe('attention');
    });
  });

  describe('nesting', () => {
    it('lets a nested surface shadow the outer one', () => {
      createComponent(NestedSurfaceComponent);

      expect(probe().surface()).toBe('emphasis');
    });

    it('resets an inherited surface with "default"', () => {
      createComponent(NestedSurfaceComponent);
      fixture.componentInstance.inner.set('default');
      fixture.detectChanges();

      expect(probe().surface()).toBe('default');
    });

    it('keeps the enclosing surface with "inherit"', () => {
      createComponent(InheritSurfaceComponent);

      expect(probe().surface()).toBe('attention');
    });
  });

  it('is blocked by a container that provides the token as undefined', () => {
    createComponent(BlockedSurfaceComponent);

    expect(probe().surface()).toBe('default');
  });

  it('resolves to the default surface with no surface at all', () => {
    createComponent(NoSurfaceComponent);

    expect(probe().surface()).toBe('default');
  });
});

@Component({
  template: ` <div [nxSurface]="surface()"><nx-surface-probe /></div> `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class BasicSurfaceComponent {
  readonly surface = signal<NxSurfaceType>('attention');
}

@Component({
  template: `
    <div nxSurface="attention">
      <div [nxSurface]="inner()"><nx-surface-probe /></div>
    </div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class NestedSurfaceComponent {
  readonly inner = signal<NxSurfaceInputValue>('emphasis');
}

@Component({
  template: `
    <div nxSurface="attention">
      <div nxSurface="inherit"><nx-surface-probe /></div>
    </div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class InheritSurfaceComponent {}

/** Stands in for an overlay panel, which paints its own background. */
@Component({
  selector: 'nx-blocking-panel',
  standalone: true,
  template: '<ng-content />',
  providers: [{ provide: NX_SURFACE, useValue: undefined }],
})
class BlockingPanelComponent {
  /** A blocker that needs the enclosing surface has to skip its own provider. */
  readonly enclosing = inject(NX_SURFACE, { optional: true, skipSelf: true });
}

@Component({
  template: `
    <div nxSurface="attention">
      <nx-blocking-panel><nx-surface-probe /></nx-blocking-panel>
    </div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent, BlockingPanelComponent],
})
class BlockedSurfaceComponent {}

@Component({
  template: `
    <div [nxSurface]="surface()" nxSurfaceAccentColor="yellow"><nx-surface-probe /></div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class AccentSurfaceComponent {
  readonly surface = signal<NxSurfaceType>('accent-attention');
}

@Component({
  template: `
    <div nxSurface="accent-attention" nxSurfaceAccentColor="teal">
      <div nxSurface="emphasis"><nx-surface-probe /></div>
    </div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class NestedAccentSurfaceComponent {}

@Component({
  template: `
    <div nxSurface="accent-attention" nxSurfaceAccentColor="teal">
      <div nxSurface="inherit"><nx-surface-probe /></div>
    </div>
  `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class InheritAccentSurfaceComponent {}

@Component({
  template: '<nx-surface-probe />',
  standalone: true,
  imports: [SurfaceProbeComponent],
})
class NoSurfaceComponent {}

@Component({
  template: ` <div nxSurface="attention" [nxSurfaceBackground]="false"><nx-surface-probe /></div> `,
  standalone: true,
  imports: [NxSurface, SurfaceProbeComponent],
})
class NoBackgroundSurfaceComponent {}

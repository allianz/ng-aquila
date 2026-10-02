import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { injectSurface, type NxSurfaceAccentColor } from '@allianz/ng-aquila/surface';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  type Type,
  type WritableSignal,
} from '@angular/core';
import { type ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import type {
  NxComparisonTableColorScheme,
  NxComparisonTableViewType,
} from './comparison-table.models';
import { NxComparisonTableModule } from './comparison-table.module';

// Provided at COMPONENT scope so the non-A1 host in this file really has no A1 token. Importing the
// module would hoist it into the shared TestBed and enable A1 everywhere.
const A1_PROVIDERS = [{ provide: ALLIANZ_ONE, useValue: { enabled: signal(true) } }];

/** Stands in for arbitrary user content projected into a cell. */
@Component({
  selector: 'nx-content-probe',
  standalone: true,
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-surface]': 'surface()',
    '[attr.data-accent]': 'accentColor() ?? null',
  },
})
class ContentProbeComponent {
  private readonly _resolved = injectSurface();

  readonly surface = computed(() => this._resolved().surface);

  readonly accentColor = computed(() => {
    const resolved = this._resolved();
    return resolved.surface === 'accent-attention' ? resolved.accentColor : undefined;
  });
}

const TEMPLATE = `
  <nx-comparison-table [colorScheme]="colorScheme()" [accentColor]="accentColor()" [view]="view()">
    <ng-container nxComparisonTableRow type="header">
      <nx-comparison-table-intersection-cell></nx-comparison-table-intersection-cell>
      <nx-comparison-table-popular-cell [forColumn]="1" [accentColor]="popularAccent()">
        <nx-content-probe id="popular"></nx-content-probe>
      </nx-comparison-table-popular-cell>
      <nx-comparison-table-cell type="header">
        <nx-content-probe id="header"></nx-content-probe>
        <!-- The radio indicator only renders in a header cell that has a select button. -->
        <button nxComparisonTableSelectButton>Select</button>
      </nx-comparison-table-cell>
    </ng-container>
    <ng-container nxComparisonTableRow>
      <nx-comparison-table-description-cell>Description</nx-comparison-table-description-cell>
      <nx-comparison-table-cell>
        <nx-content-probe id="content"></nx-content-probe>
      </nx-comparison-table-cell>
    </ng-container>
    <ng-container nxComparisonTableRow type="footer">
      <nx-comparison-table-cell type="footer">
        <nx-content-probe id="footer"></nx-content-probe>
      </nx-comparison-table-cell>
    </ng-container>
  </nx-comparison-table>
`;

describe('NxComparisonTable surface', () => {
  let fixture: ComponentFixture<SurfaceTableComponent | NonA1TableComponent>;

  function createComponent(component: Type<SurfaceTableComponent | NonA1TableComponent>): void {
    fixture = TestBed.createComponent(component);
    fixture.detectChanges();
  }

  /** What the projected content of the named cell resolved to. */
  function resolved(id: string): string | null {
    const probe = fixture.nativeElement.querySelector(`#${id}`) as HTMLElement | null;
    return probe?.getAttribute('data-surface') ?? null;
  }

  function accent(id: string): string | null {
    return (
      (fixture.nativeElement.querySelector(`#${id}`) as HTMLElement | null)?.getAttribute(
        'data-accent',
      ) ?? null
    );
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NxComparisonTableModule,
        ContentProbeComponent,
        SurfaceTableComponent,
        NonA1TableComponent,
        DefaultAccentTableComponent,
      ],
    }).compileComponents();
  }));

  // The load-bearing assumption of the whole design: the table does not render
  // <nx-comparison-table-cell> where the consumer wrote it, but element injectors follow the lexical
  // declaration tree, so projected content still resolves the cell's token.
  describe('reaches projected content despite the ngTemplateOutlet stamping', () => {
    const viewTypes: NxComparisonTableViewType[] = ['desktop', 'tablet', 'mobile'];

    for (const view of viewTypes) {
      it(`in the ${view} view`, () => {
        createComponent(SurfaceTableComponent);
        fixture.componentInstance.view.set(view);
        fixture.componentInstance.colorScheme.set('attention');
        fixture.detectChanges();

        expect(resolved('header')).toBe('attention');
      });
    }
  });

  it('publishes the scheme to header cells', () => {
    createComponent(SurfaceTableComponent);
    fixture.componentInstance.colorScheme.set('attention');
    fixture.detectChanges();

    expect(resolved('header')).toBe('attention');
  });

  it('publishes the scheme to footer cells too', () => {
    createComponent(SurfaceTableComponent);
    fixture.componentInstance.colorScheme.set('attention');
    fixture.detectChanges();

    expect(resolved('footer')).toBe('attention');
  });

  it('never publishes it to content cells', () => {
    createComponent(SurfaceTableComponent);
    fixture.componentInstance.colorScheme.set('attention');
    fixture.detectChanges();

    expect(resolved('content')).toBe('default');
  });

  it('treats the deprecated "plain" as the default surface', () => {
    createComponent(SurfaceTableComponent);
    fixture.componentInstance.colorScheme.set('plain');
    fixture.detectChanges();

    expect(resolved('header')).toBe('default');
    expect(
      (
        fixture.nativeElement.querySelector('.nx-comparison-table__header-cell') as HTMLElement
      ).hasAttribute('data-nx-surface'),
    ).toBe(false);
  });

  it('renders the CSS contract attribute on the header cell and its card', () => {
    createComponent(SurfaceTableComponent);
    fixture.componentInstance.colorScheme.set('emphasis');
    fixture.detectChanges();

    const cell = fixture.nativeElement.querySelector(
      '.nx-comparison-table__header-cell',
    ) as HTMLElement;
    const card = cell.querySelector('.nx-comparison-table__cell-inner') as HTMLElement;

    expect(cell.getAttribute('data-nx-surface')).toBe('emphasis');
    expect(card.getAttribute('data-nx-surface')).toBe('emphasis');
  });

  it('passes the accent hue through for an accent-attention scheme only', () => {
    createComponent(SurfaceTableComponent);
    fixture.componentInstance.colorScheme.set('accent-attention');
    fixture.componentInstance.accentColor.set('teal');
    fixture.detectChanges();

    expect(resolved('header')).toBe('accent-attention');
    expect(accent('header')).toBe('teal');

    fixture.componentInstance.colorScheme.set('attention');
    fixture.detectChanges();

    expect(accent('header')).toBeNull();
  });

  it('falls back to the default hue when accentColor is left unset', () => {
    const defaultAccentFixture = TestBed.createComponent(DefaultAccentTableComponent);
    defaultAccentFixture.detectChanges();

    const probe = defaultAccentFixture.nativeElement.querySelector('#header') as HTMLElement;
    expect(probe.getAttribute('data-surface')).toBe('accent-attention');
    expect(probe.getAttribute('data-accent')).toBe('blue');
  });

  it('stays inert outside the Allianz One design', () => {
    createComponent(NonA1TableComponent);
    fixture.componentInstance.colorScheme.set('attention');
    fixture.detectChanges();

    expect(resolved('header')).toBe('default');
  });

  it('ignores colorScheme on the legacy mobile view', () => {
    // Outside A1 the mobile view is reachable (A1 is what forces mobile to promote to
    // tablet, see comparison-table-base.ts), so this is the one host/view combination
    // that actually exercises the mobile branch of the cell template.
    createComponent(NonA1TableComponent);
    fixture.componentInstance.colorScheme.set('accent-attention');
    fixture.componentInstance.accentColor.set('teal');
    fixture.componentInstance.view.set('mobile');
    fixture.detectChanges();

    expect(resolved('header')).toBe('default');
    const cell = fixture.nativeElement.querySelector(
      '.nx-comparison-table__mobile-header-cell',
    ) as HTMLElement;
    expect(cell.hasAttribute('data-nx-surface')).toBe(false);
    expect(cell.hasAttribute('data-nx-accent-color')).toBe(false);
  });

  describe('the header radio indicator', () => {
    /** The scheme class the indicator renders with, or null for the default scheme. */
    function indicatorScheme(): string | null {
      const indicator = fixture.nativeElement.querySelector('nx-radio-indicator') as HTMLElement;
      return (
        ['on-brand-static', 'on-accent-attention', 'on-selection'].find((scheme) =>
          indicator.classList.contains(scheme),
        ) ?? null
      );
    }

    const cases: [NxComparisonTableColorScheme, string | null][] = [
      ['plain', null],
      ['default', null],
      ['emphasis', null],
      ['attention', 'on-brand-static'],
      ['accent-attention', 'on-accent-attention'],
    ];

    for (const [colorScheme, expected] of cases) {
      it(`uses ${expected ?? 'the default scheme'} on a "${colorScheme}" header`, () => {
        createComponent(SurfaceTableComponent);
        fixture.componentInstance.colorScheme.set(colorScheme);
        fixture.detectChanges();

        expect(indicatorScheme()).toBe(expected);
      });
    }

    it('follows a scheme change', () => {
      createComponent(SurfaceTableComponent);
      fixture.componentInstance.colorScheme.set('attention');
      fixture.detectChanges();

      expect(indicatorScheme()).toBe('on-brand-static');

      fixture.componentInstance.colorScheme.set('accent-attention');
      fixture.detectChanges();

      expect(indicatorScheme()).toBe('on-accent-attention');
    });
  });

  describe('the popular cell', () => {
    it('is always an accent surface, with its own hue', () => {
      createComponent(SurfaceTableComponent);
      fixture.componentInstance.colorScheme.set('attention');
      fixture.componentInstance.popularAccent.set('green');
      fixture.detectChanges();

      // Independent of the header: the header is on `attention`, the popular cell on its own accent.
      expect(resolved('popular')).toBe('accent-attention');
      expect(accent('popular')).toBe('green');
      expect(resolved('header')).toBe('attention');
    });

    it('defaults to the hue it has always been', () => {
      createComponent(SurfaceTableComponent);

      expect(accent('popular')).toBe('purple');
    });
  });
});

@Component({
  template: TEMPLATE,
  standalone: true,
  imports: [NxComparisonTableModule, ContentProbeComponent],
  providers: A1_PROVIDERS,
})
class SurfaceTableComponent {
  readonly colorScheme: WritableSignal<NxComparisonTableColorScheme> = signal('plain');
  readonly accentColor = signal<NxSurfaceAccentColor>('teal');
  readonly popularAccent = signal<'purple' | 'green'>('purple');
  readonly view = signal<NxComparisonTableViewType>('desktop');
}

/** No ALLIANZ_ONE provider: the colour scheme must have no effect at all. */
@Component({
  template: TEMPLATE,
  standalone: true,
  imports: [NxComparisonTableModule, ContentProbeComponent],
  // Distinguishes it from the host above, which is otherwise identical (NG0912).
  host: { 'data-non-a1': '' },
})
class NonA1TableComponent extends SurfaceTableComponent {}

/** Leaves `accentColor` unbound, so the table's own default hue is what takes effect. */
@Component({
  template: `
    <nx-comparison-table colorScheme="accent-attention">
      <ng-container nxComparisonTableRow type="header">
        <nx-comparison-table-cell type="header">
          <nx-content-probe id="header"></nx-content-probe>
        </nx-comparison-table-cell>
      </ng-container>
    </nx-comparison-table>
  `,
  standalone: true,
  imports: [NxComparisonTableModule, ContentProbeComponent],
  providers: A1_PROVIDERS,
})
class DefaultAccentTableComponent {}

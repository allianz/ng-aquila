import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { injectSurface } from '@allianz/ng-aquila/surface';
import { nxOptionalBooleanAttribute } from '@allianz/ng-aquila/utils';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  input,
  signal,
  viewChild,
} from '@angular/core';
/**
 * Possible badge types. `accent` is the non-signal badge colored by `accentColor`.
 * `active` and `negative` are deprecated NDBX names for `info` and `warning`.
 */
export type NxBadgeType =
  'accent' | 'info' | 'warning' | 'positive' | 'critical' | 'active' | 'negative' | '';
type NxBadgeSignalType = 'info' | 'warning' | 'positive' | 'critical';

const LEGACY_TYPE_CLASSES: { [key in NxBadgeSignalType]: string } = {
  info: 'nx-badge--active',
  warning: 'nx-badge--negative',
  positive: 'nx-badge--positive',
  critical: 'nx-badge--critical',
};

export type NxBadgeAccentColor =
  'brand' | 'yellow' | 'orange' | 'red' | 'purple' | 'aqua' | 'blue' | 'teal' | 'green' | 'gray';
export type NxBadgeProminence = 'subtle' | 'attention';

@Component({
  selector: 'nx-badge',
  template: '<span #content><ng-content></ng-content></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./badge.component.scss'],
  host: {
    '[class.single-letter]': 'this.content()?.nativeElement?.innerText?.length === 1',
    '[class]': '_bagdeClass()',
  },
  standalone: true,
})
export class NxBadgeComponent {
  private readonly _allianzOneOptions = inject(ALLIANZ_ONE, {
    optional: true,
  }) as AllianzOneOptions | null;

  private readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  /**
   * Sets the type of the badge. `accent` is the A1 default; an empty value
   * is the NDBX default (gray). With the A1 theme, a signal type takes precedence over `accentColor`.
   */
  @Input() set type(value: NxBadgeType | string | null | undefined) {
    this._type.set((value as NxBadgeType) || '');
  }
  get type(): NxBadgeType {
    return this._type();
  }
  private readonly _type = signal<NxBadgeType>('');

  private readonly _signalType = computed<NxBadgeSignalType | null>(() => {
    switch (this._type()) {
      case 'info':
      case 'active':
        return 'info';
      case 'warning':
      case 'negative':
        return 'warning';
      case 'positive':
      case 'critical':
        return this._type() as NxBadgeSignalType;
      default:
        return null;
    }
  });

  /** Change badge style to vibrant. */
  @Input({ transform: booleanAttribute }) set vibrant(value: boolean) {
    this._vibrant.set(value);
  }
  get vibrant(): boolean {
    return this._vibrant();
  }
  protected _vibrant = signal(false);

  content = viewChild<ElementRef>('content');

  readonly accentColor = input<NxBadgeAccentColor>();

  readonly prominence = input<NxBadgeProminence>('subtle');

  /**
   * Whether to use the inverse colors. When not set, it follows the surface the
   * badge is placed on (see `nxSurface`).
   */
  readonly inverseInput = input<boolean | undefined, unknown>(undefined, {
    transform: nxOptionalBooleanAttribute,
    alias: 'inverse',
  });

  private readonly _surface = injectSurface();

  /** Resolved inverse: an explicit input wins, then the surface the component sits on. */
  readonly inverse = computed(() => this.inverseInput() ?? this._surface().surface === 'attention');

  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly _bagdeClass = computed(() => {
    const signalType = this._signalType();

    // NDBX approach: a signal type outside A1, or vibrant without a signal type, ignores the newer inputs.
    if (signalType ? !this._isA1() : this._vibrant()) {
      const legacyClasses = [
        signalType && LEGACY_TYPE_CLASSES[signalType],
        this._vibrant() && 'nx-badge--vibrant',
      ];
      return legacyClasses.filter(Boolean).join(' ');
    }

    // Keeps `type` + `vibrant` NDBX badges at their attention colors when migrated to A1.
    const prominence = this._vibrant() ? 'attention' : this.prominence();
    const inverse = this.inverse() ? '--inverse' : '';

    // Handle signal type badges as a first priority.
    if (signalType) {
      return this.disabled()
        ? `nx-badge-signal-${prominence}--disabled${inverse}`
        : `nx-badge-signal-${prominence}-${signalType}${inverse}`;
    }

    if (this.disabled()) {
      const disabledProminence =
        prominence === 'attention' || this.accentColor() === 'brand' ? 'attention' : 'subtle';
      return `nx-badge-${disabledProminence}--disabled${inverse}`;
    }

    if (!this.accentColor()) {
      return '';
    }

    if (this.accentColor() === 'brand') {
      return `nx-badge-accent-color-brand${inverse}`;
    }

    return `nx-badge-accent-color-${this.prominence()}-${this.accentColor()}${inverse}`;
  });
}

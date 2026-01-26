import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  Input,
  input,
  signal,
  viewChild,
} from '@angular/core';
/** Possible badge types. */
export type NxBadgeType = 'active' | 'positive' | 'critical' | 'negative' | '';
export type NxBadgeColorScheme =
  | 'brand'
  | 'yellow'
  | 'orange'
  | 'red'
  | 'purple'
  | 'aqua'
  | 'blue'
  | 'teal'
  | 'green'
  | 'gray';
export type NxBadgeProminence = 'subtle' | 'attention';

@Component({
  selector: 'nx-badge',
  template: '<span #content><ng-content></ng-content></span>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./badge.component.scss'],
  host: {
    '[class.nx-badge--active]': '_type() === "active"',
    '[class.nx-badge--positive]': '_type() === "positive"',
    '[class.nx-badge--critical]': '_type() === "critical"',
    '[class.nx-badge--negative]': '_type() === "negative"',
    '[class.nx-badge--vibrant]': '_vibrant()',
    '[class.single-letter]': 'this.content()?.nativeElement?.innerText?.length === 1',
    '[class]': '_bagdeClass()',
  },
  standalone: true,
})
export class NxBadgeComponent {
  /** Sets the class name for the badge element.  */
  @Input() set type(value: NxBadgeType | string | null | undefined) {
    this._type.set((value as NxBadgeType) || '');
  }
  get type(): NxBadgeType {
    return this._type();
  }
  protected _type = signal<NxBadgeType>('');

  /** Change badge style to vibrant. */
  @Input({ transform: booleanAttribute }) set vibrant(value: boolean) {
    this._vibrant.set(value);
  }
  get vibrant(): boolean {
    return this._vibrant();
  }
  protected _vibrant = signal(false);

  content = viewChild<ElementRef>('content');

  readonly colorScheme = input<NxBadgeColorScheme>();

  readonly prominence = input<NxBadgeProminence>('subtle');

  readonly inverse = input(false, { transform: booleanAttribute });

  readonly disabled = input(false, { transform: booleanAttribute });

  protected readonly _bagdeClass = computed(() => {
    // Legacy approach: type or vibrant takes priority
    if (this._type() !== '' || this._vibrant()) {
      return '';
    }

    if (this.disabled()) {
      if (this.prominence() === 'attention' || this.colorScheme() === 'brand') {
        return 'nx-badge-attention--disabled';
      }
      return 'nx-badge-subtle--disabled';
    }

    if (!this.colorScheme()) {
      return '';
    }

    if (this.colorScheme() === 'brand') {
      return `nx-badge-scheme-brand${this.inverse() ? '--inverse' : ''}`;
    }

    return `nx-badge-scheme-color-${this.prominence()}-${this.colorScheme()}${this.inverse() ? '--inverse' : ''}`;
  });
}

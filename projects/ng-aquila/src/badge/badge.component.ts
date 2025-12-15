import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  signal,
  viewChild,
} from '@angular/core';
/** Possible badge types. */
export type NxBadgeType = 'active' | 'positive' | 'critical' | 'negative' | '';

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
}

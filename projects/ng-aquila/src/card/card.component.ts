import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, Attribute} from '@angular/core';
import {coerceBooleanProperty, BooleanInput} from '@angular/cdk/coercion';

@Component({
  template: '<ng-content></ng-content>',
  styleUrls: ['card.scss'],
  selector: 'nx-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nx-card',
    '[class.is-selectable]': 'selectable',
    '[class.is-selected]': 'selected',
    '[class.is-disabled]': 'disabled',
    '[attr.aria-disabled]': 'disabled',
    '(click)': '_toggleSelected()',
    '(keydown.enter)': '_toggleSelected()',
    '[attr.tabindex]': '_getTabindex()'
  }
})
export class NxCardComponent {
  _tabindex: string;

  /**
   * Whether this card is selectable or not.
   *
   * The selectable property of the card is deprecated.
   * Please use the selectable card component instead.
   *
   * @deprecated
   * @deletion-target 10.0.0
   */
  @Input()
  set selectable(value: boolean) {
    this._selectable = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }

  get selectable(): boolean {
    return this._selectable;
  }

  private _selectable: boolean;

  /**
   * Whether this card is selected or not.
   *
   * The selected property of the card is deprecated.
   * Please use the selectable card component instead.
   *
   * @deprecated
   * @deletion-target 10.0.0
  */
  @Input()
  set selected(value: boolean) {
    this._selected = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }

  get selected(): boolean {
    return this._selected;
  }

  private _selected: boolean;

  /**
   * Whether a selectable card is disabled or not.
   *
   * The disabled property of the card will be deprecated,
   * as its selectable properties are deprecated as well.
   * Please use the selectable card component instead.
   *
   * @deprecated
   * @deletion-target 10.0.0
  */
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }

  get disabled(): boolean {
    return this._disabled;
  }

  private _disabled: boolean = false;

  /**
   * Event emitted when the selected value has changed.
   *
   * This output  property of the card is deprecated,
   * as its selectable properties are deprecated as well.
   * Please use the selectable card component instead.
   *
   * @deprecated
   * @deletion-target 10.0.0
  */
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(
      private _changeDetectorRef: ChangeDetectorRef,
      @Attribute('tabindex') tabindex: string) {
    this._tabindex = tabindex;
  }

  _toggleSelected(): void {
    if (this.selectable && !this.disabled) {
      this.selected = !this.selected;
      this.selectedChange.emit(this.selected);
    }
  }

  _getTabindex(): string {
    if (this.disabled) {
      return '-1';
    }

    if (this.selectable) {
      return this._tabindex || '0';
    }

    return this._tabindex || '';
  }

  static ngAcceptInputType_selectable: BooleanInput;
  static ngAcceptInputType_selected: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;
}

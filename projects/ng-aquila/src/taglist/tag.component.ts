import { coerceBooleanProperty, coerceNumberProperty, NumberInput, BooleanInput } from '@angular/cdk/coercion';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DELETE, BACKSPACE, ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'nx-tag',
  templateUrl: 'tag.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['tag.component.scss'],
  host: {
    '(click)': 'tagClickHandler()',
    '(keydown)': 'removeKeyHandler($event)',
    '[attr.tabindex]': 'tabindex'
  }
})
export class NxTagComponent {
  private _removable: boolean;

  /** Whether the tag is removeable. */
  @Input()
  set removable(value: boolean) {
    this._removable = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  get removable() {
    return this._removable;
  }

  private _tabindex: number = -1;
  /**
   * Sets the tab-index of a tag. Default value: -1.
   *
   * If `nxAllowTagDeletion` of the taglist is set to true, the default value is 0.
   */
  @Input()
  set tabindex(value: number) {
    this._tabindex = coerceNumberProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  get tabindex(): number {
    return this.removable ? 0 : this._tabindex;
  }

  private _value: string;
  /** Sets the value of the tag. */
  @Input()
  set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this._changeDetectorRef.markForCheck();
    }
  }
  get value(): string {
    return this._value;
  }

  /** An event is dispatched each time when the tag is clicked. */
  @Output() readonly clicked: EventEmitter<any> = new EventEmitter<any>();
  /** An event is dispatched each time when the tag is removed. */
  @Output() readonly removed: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef) { }

  /** @docs-private */
  // Emit the removed event that the parent can remove the value
  removeClickHandler(event: MouseEvent) {
    event.stopPropagation();
    this.removed.emit(this.value);
  }

  /** @docs-private */
  removeKeyHandler(event: KeyboardEvent) {
    if (this.removable && (event.keyCode === DELETE || event.keyCode === BACKSPACE)) {
      event.preventDefault();
      event.stopPropagation();
      this.removed.emit(this.value);
    }

    if (event.keyCode === ENTER) {
      this.clicked.emit(this.value);
    }
  }

  /** @docs-private */
  tagClickHandler() {
    this.clicked.emit(this.value);
  }

  static ngAcceptInputType_removable: BooleanInput;
  static ngAcceptInputType_tabindex: NumberInput;
}

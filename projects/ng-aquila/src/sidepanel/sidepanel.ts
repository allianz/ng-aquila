import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  ContentChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { NxSidepanelHeaderComponent } from './sidepanel-header';

/** Type for the available position values. */
export type PositionType = 'floating' | 'static';

@Component({
  selector: 'nx-sidepanel',
  templateUrl: './sidepanel.html',
  styleUrls: ['./sidepanel.scss'],
  host: {
    '[class.is-closed]': '!opened',
    '[class.is-static]': 'position === "static"',
    '[class.is-floating]': 'position === "floating"',
    'role': 'complementary'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSidepanelComponent {

  private _opened: boolean = true;

  @ContentChild(NxSidepanelHeaderComponent, { read: ElementRef, static: false }) _header: ElementRef;

  /** Whether the sidepanel should be opened and visible. */
  @Input()
  set opened(value: boolean) {
    this._opened = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  get opened(): boolean {
    return this._opened;
  }

  /**
   * An event emitted when the opened value has changed.
   *
   * Emits the boolean value.
   */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _position: PositionType = 'floating';

  /** Sets the position of the sidepanel. */
  @Input()
  set position(value: PositionType) {
    this._position = value;
    this._changeDetectorRef.markForCheck();
  }
  get position(): PositionType {
    return this._position;
  }

  /** Toggles the opened state of the sidepanel. */
  toggle() {
    this.opened = !this.opened;
    this.openedChange.emit(this._opened);
  }

  /** Sets the opened state of the sidepanel to true. */
  open() {
    if (!this.opened) {
      this.toggle();
    }
  }

  /** Sets the opened state of the sidepanel to false. */
  close() {
    if (this.opened) {
      this.toggle();
    }
  }

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    protected _elementRef: ElementRef,
  ) {}

  _getContentHeight() {
    if (this._header) {
      return this._elementRef.nativeElement.offsetHeight - this._header.nativeElement.offsetHeight;
    }
    return this._elementRef.nativeElement.offsetHeight;
  }

  static ngAcceptInputType_opened: BooleanInput;
}

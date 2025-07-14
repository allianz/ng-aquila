import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  forwardRef,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxRadioToggleComponent } from './radio-toggle.component';
import { NxRadioToggleButtonBaseComponent } from './radio-toggle-button-base.component';

/** @docs-private */
export class NxRadioToggleButtonChange {
  constructor(
    readonly source: NxRadioToggleButtonComponent,
    readonly value: any,
  ) {}
}

@Component({
  selector: 'nx-radio-toggle-button',
  styleUrls: ['radio-toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'radio-toggle-button.component.html',
  providers: [
    {
      provide: NxRadioToggleButtonBaseComponent,
      useExisting: forwardRef(() => NxRadioToggleButtonComponent),
    },
    {
      provide: NxAbstractControl,
      useExisting: forwardRef(() => NxRadioToggleButtonComponent),
    },
  ],
  host: {
    '[class.has-error]': 'controlInvalid()',
    '(focus)': '_forwardFocusToInput()',
    '[class.is-readonly]': 'readonly',
  },
  imports: [NxIconModule, NgClass],
})
export class NxRadioToggleButtonComponent
  extends NxRadioToggleButtonBaseComponent
  implements AfterViewInit, OnDestroy
{
  /** @docs-private */
  // emits when the button is checked to notify the group
  readonly onChecked = new Subject<NxRadioToggleButtonChange>();

  @Input({ transform: booleanAttribute }) disableMobile = false;

  /** @docs-private */
  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get disabled(): boolean {
    return this._disabled || this.radioToggle?.disabled;
  }
  private _disabled = false;

  @Input({ transform: booleanAttribute }) set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get readonly(): boolean {
    return this._readonly || this.radioToggle?.readonly;
  }
  private _readonly = false;

  /** Aria label for screen reader users */
  @Input() set ariaLabel(value: string | null) {
    this._ariaLabel = value;
  }
  get ariaLabel(): string | null {
    return this._ariaLabel;
  }
  private _ariaLabel: string | null = null;

  /** @docs-private */
  controlInvalid = computed(() => this.radioToggle?.errorState() || null);

  /** Sets the checked state and notify siblings and the parent group about the change */
  // Only use this if you want the onChecked event to be fired, this will inform the parent about the change!
  // To select a button without firing the event use the select() function
  @Input() set selected(value: boolean) {
    if (this._selected !== value) {
      this._selected = value;
      if (this._selected) {
        this._notifySiblings();
        this._emitCheckedEvent();
      }

      this._cdr.markForCheck();
    }
  }
  get selected(): boolean {
    return this._selected;
  }
  private _selected = false;

  private readonly _destroyed = new Subject<void>();

  /** Unregister function for _expansionDispatcher. */
  private _removeUniqueSelectionListener: () => void = () => {};

  errorMessageId = computed(() => this.radioToggle?.errorMessageId() || null);

  constructor(
    @Inject(forwardRef(() => NxRadioToggleComponent))
    private readonly radioToggle: NxRadioToggleComponent,
    /** @docs-private */ renderer: Renderer2,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _toggleDispatcher: UniqueSelectionDispatcher,
    private readonly _focusMonitor: FocusMonitor,
  ) {
    super(renderer);

    this._removeUniqueSelectionListener = this._toggleDispatcher.listen(
      (id: string, radioToggleId: string) => {
        if (this.radioToggle && this.radioToggle.id === radioToggleId && this.id !== id) {
          this._selected = false;
          // need to let change detector know in case that the select() function was called on another button
          this._cdr.markForCheck();
        }
      },
    );

    this.radioToggle._disableChange.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this.toggleInput);
  }

  ngOnDestroy(): void {
    this._removeUniqueSelectionListener();
    this._destroyed.next();
    this._destroyed.complete();
    this._focusMonitor.stopMonitoring(this.toggleInput);
  }

  setReadonly(value: boolean): void {
    this.readonly = value;
    this._cdr.markForCheck();
  }

  /** @docs-private */
  get toggleId(): string {
    return this.radioToggle.id;
  }

  /** @docs-private */
  get id(): string {
    return this.toggleButtonId;
  }

  private _notifySiblings() {
    const toggleId = this.radioToggle ? this.radioToggle.id : this.id;
    this._toggleDispatcher.notify(this.id, toggleId);
  }

  private _emitCheckedEvent() {
    this.onChecked.next(new NxRadioToggleButtonChange(this, this.value));
  }

  // Does NOT emit the onChecked event. Useful when you need to set initial
  // state. Used by the parent to set checked states on initialization and during
  // writeValue() changes.
  /** @docs-private */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._notifySiblings();
    }

    this._cdr.markForCheck();
  }

  /** @docs-private */
  deselect() {
    if (this._selected) {
      this._selected = false;
    }

    this._cdr.markForCheck();
  }

  /** @docs-private */
  @HostListener('keyup.space')
  onKeyupSpace(): void {
    this._selected = false;
    this._notifySiblings();
  }

  /** Forward focus from host to hidden input field */
  _forwardFocusToInput() {
    this.toggleInput.nativeElement.focus();
  }

  _onInputClick(event: MouseEvent) {
    if (this.readonly) {
      event.preventDefault();
      return;
    }
    this.selected = true;
  }
}

import { NxLabelInfoDirective } from '@allianz/ng-aquila/base';
import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { CONTEXT, NxMessageComponent } from '@allianz/ng-aquila/message';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentChecked,
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  contentChild,
  ContentChildren,
  effect,
  ElementRef,
  Inject,
  inject,
  InjectionToken,
  Input,
  input,
  OnDestroy,
  Optional,
  QueryList,
  Renderer2,
  type Signal,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { asapScheduler, merge, Subject } from 'rxjs';
import { observeOn, startWith, takeUntil } from 'rxjs/operators';

import { NxFormfieldAppendixDirective } from './appendix.directive';
import { NxFormfieldErrorDirective } from './error.directive';
import { NxFormfieldControl, NxFormfieldUpdateEventType } from './formfield-control';
import { NxFormfieldHintDirective } from './hint.directive';
import { NxFormfieldLabelDirective } from './label.directive';
import { NxFormfieldNoteDirective } from './note.directive';
import { NxFormfieldPrefixDirective } from './prefix.directive';
import { NxFormfieldSuffixDirective } from './suffix.directive';

/**
 * Represents the default options for the form field that can be configured
 * using the `FORMFIELD_DEFAULT_OPTIONS` injection token.
 */
export interface FormfieldDefaultOptions {
  /** Sets the default appearance. (optional) */
  appearance?: AppearanceType;

  /** Sets the default float label type. (optional) */
  nxFloatLabel?: FloatLabelType;

  /** Sets the default change detection trigger event. (optional) */
  updateOn?: NxFormfieldUpdateEventType;

  /**
   * A string representing the default optional label or signal that returns the optional label string.
   */
  nxOptionalLabel?: string | Signal<string>;
}

export const FORMFIELD_DEFAULT_OPTIONS = new InjectionToken<FormfieldDefaultOptions>(
  'FORMFIELD_DEFAULT_OPTIONS',
);

/** Type for the available floatLabel values. */
export type FloatLabelType = 'always' | 'auto';

/** Type for the appearance of the formfield. */
export type AppearanceType = 'outline' | 'auto';

/** Type for the size of the formfield. */
export type NxFormfieldSize = 's' | 'm';

/** Type for the signal status of the formfield. No `critical` value: an invalid control drives the error look instead. */
export type NxFormfieldStatus = 'positive' | 'warning' | 'info';

/** Maps a formfield status onto the vocabulary of `nx-message` (`positive` -> `success`). */
const STATUS_MESSAGE_CONTEXT: Record<NxFormfieldStatus, CONTEXT> = {
  positive: 'success',
  warning: 'warning',
  info: 'info',
};

@Component({
  selector: 'nx-formfield',
  templateUrl: 'formfield.component.html',
  styleUrls: ['formfield.scss', '../input/input.scss'],
  host: {
    '[class.nx-formfield]': 'true',
    '[class.is-disabled]': 'this._control.disabled',
    '[class.is-readonly]': 'this._control.readonly',
    '[class.is-filled]': 'this._control.empty === false',
    '[class.is-focused]': 'this._control.focused',
    '[class.is-floating]': 'this.shouldLabelFloat',
    '[class.is-auto-floating]': 'this.floatLabel === "auto"',
    '[class.size-s]': 'this.size() === "s"',
    '[class.has-error]': 'this._control.errorState',
    '[class.has-outline]': 'this.appearance === "outline"',
    '[class.nx-formfield--status-positive]':
      'this._isStatusVisible() && this._effectiveStatus() === "positive"',
    '[class.nx-formfield--status-warning]':
      'this._isStatusVisible() && this._effectiveStatus() === "warning"',
    '[class.nx-formfield--status-info]':
      'this._isStatusVisible() && this._effectiveStatus() === "info"',
    '[class.has-hint]': 'this._hintChildren?.length && this._hintChildren?.length! > 0',
    '[class.nx-formfield--negative]': 'this._negative',
    '[class.nx-formfield--inline]': 'inline()',
    '(focusout)': '_onBlur()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NxTooltipModule, NgTemplateOutlet, NxMessageComponent],
})
export class NxFormfieldComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
  protected _negative = false;
  private _styles = '';

  /** Html id of the formfield label */
  readonly labelId: string = inject(IdGenerationService).nextId('nx-formfield-label');

  /** Html id of the status message, owned by the formfield since it renders that element. */
  protected readonly _statusMessageId: string = inject(IdGenerationService).nextId(
    'nx-formfield-status-message',
  );
  @ContentChild(NxFormfieldControl) _control!: NxFormfieldControl<any>;

  private readonly _allianzOne = inject<AllianzOneOptions | null>(ALLIANZ_ONE, { optional: true });

  protected readonly _isAllianzOne = computed(() => this._allianzOne?.enabled?.() ?? false);

  /**
   * Sets the label which will act as a floating label.
   * In addition, the component uses input and label to properly support accessibility.
   */
  readonly label = input<string | null>();

  /**
   * Whether the form field is rendered inline. When enabled the reserved space
   * around the field (top floating-label space and bottom hint/error/note
   * space) is removed and the label as well as the hints, errors, notes and
   * status message are visually hidden. They are kept in the accessibility
   * tree, so the control still references them via `aria-describedby` and a
   * screen reader still announces them. Surface anything a sighted user needs
   * to see some other way, for example with a `nx-signal-button` in the
   * `nxFormfieldSuffix` slot.
   */
  readonly inline = input(false, { transform: booleanAttribute });

  /**
   * Colors the border of the formfield in the given signal color and renders a plain
   * message below the field. Mark the message content with the
   * `nxFormfieldStatusMessage` attribute — always provide it, as a status without a
   * message leaves a colored border with no explanation of why.
   *
   * Only supported for `appearance="outline"`. An error (an invalid, touched form
   * control together with a `nxFormfieldError`) takes precedence over the status.
   */
  readonly status = input<NxFormfieldStatus | null>(null);

  /**
   * Set optional text, which will additionally show in label if a field is not mandatory.
   */
  optionalLabelInput = input<string>(undefined, { alias: 'optionalLabel' });

  protected readonly _optionalLabel = computed(
    (): string =>
      this.optionalLabelInput() ||
      (typeof this._defaultOptions?.nxOptionalLabel === 'function'
        ? this._defaultOptions.nxOptionalLabel()
        : (this._defaultOptions?.nxOptionalLabel ?? '')),
  );

  @ContentChild(NxFormfieldLabelDirective) _labelChild!: NxFormfieldLabelDirective;

  protected readonly _labelInfoChild = contentChild(NxLabelInfoDirective);

  @ContentChildren(NxFormfieldHintDirective) _hintChildren!: QueryList<NxFormfieldHintDirective>;
  @ContentChildren(NxFormfieldNoteDirective) _noteChildren!: QueryList<NxFormfieldNoteDirective>;
  @ContentChildren(NxFormfieldErrorDirective) _errorChildren!: QueryList<NxFormfieldErrorDirective>;
  @ContentChildren(NxFormfieldSuffixDirective)
  _suffixChildren!: QueryList<NxFormfieldSuffixDirective>;
  @ContentChildren(NxFormfieldPrefixDirective)
  _prefixChildren!: QueryList<NxFormfieldPrefixDirective>;
  @ContentChildren(NxFormfieldAppendixDirective)
  _appendixChildren!: QueryList<NxFormfieldAppendixDirective>;

  @ViewChild('connectionContainer', { static: true }) _connectionContainerRef!: ElementRef;

  /**
   * Whether the label should float once the input is focused or filled (auto, default)
   * or force it to always float with a value of always to simulate a more static form.
   * Can be changed for NDBX only. A1 enforces always floating labels.
   */
  @Input() set floatLabel(value: FloatLabelType) {
    if (value !== this._floatLabel) {
      this._floatLabel = value || 'auto';
      this._cdr.markForCheck();
    }
  }
  get floatLabel(): FloatLabelType {
    return (
      (this._isAllianzOne() && 'always') ||
      this._floatLabel ||
      this._defaultOptions?.nxFloatLabel ||
      'auto'
    );
  }
  private _floatLabel!: FloatLabelType;

  /**
   * Sets the styling of the formfield.
   * If 'negative', a negative set of stylings is used.
   */
  @Input('negative') set styles(value: string) {
    this._negative = !!value.match(/negative/);
    this._styles = value;
  }
  get styles() {
    return this._styles;
  }

  /**
   * **Expert option**
   *
   * Sets the appearance of the formfield. Can be changed for NDBX only. A1 enforces outline appearance.
   */
  @Input() set appearance(value: AppearanceType) {
    this._appearanceSignal.set(value);
  }
  get appearance(): AppearanceType {
    return (
      (this._isAllianzOne() && 'outline') ||
      this._appearanceSignal() ||
      this._defaultOptions?.appearance ||
      'auto'
    );
  }
  private readonly _appearanceSignal = signal<AppearanceType | undefined>(undefined);

  /**
   * Sets the size of the formfield.
   *
   * Only supported under A1.
   */
  readonly size = input<NxFormfieldSize>('m');

  /**
   *
   * Sets the event that triggers change detection in the formfield.
   */
  @Input() set updateOn(value: NxFormfieldUpdateEventType) {
    this._updateOn = value;
  }
  get updateOn(): NxFormfieldUpdateEventType {
    return this._updateOn || this._defaultOptions?.updateOn || 'change';
  }
  private _updateOn!: NxFormfieldUpdateEventType;

  get _shouldAlwaysFloat(): boolean {
    return this.floatLabel === 'always';
  }

  /** @docs-private */
  get shouldLabelFloat(): boolean {
    return this._control.shouldLabelFloat || this._shouldAlwaysFloat;
  }

  /** @docs-private */
  get control() {
    return this._control;
  }

  private readonly _destroyed = new Subject<void>();

  // Neither the `stateChanges` nor `focusout` subscriptions fire for a programmatic status change, so re-sync explicitly here.
  private readonly _syncDescribedByOnStatusChange = effect(() => {
    this._effectiveStatus();

    if (!this._control || !this._hintChildren) {
      return;
    }

    this._syncDescribedByIds();
    this._cdr.markForCheck();
  });

  constructor(
    /** @docs-private */ readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly _cdr: ChangeDetectorRef,
    @Optional()
    @Inject(FORMFIELD_DEFAULT_OPTIONS)
    private readonly _defaultOptions: FormfieldDefaultOptions | null,
  ) {}

  ngAfterContentInit(): void {
    this._validateControlChild();

    if (this._control.controlType) {
      this.elementRef.nativeElement.classList.add(
        `nx-formfield--type-${this._control.controlType}`,
      );

      if (this._control.updateOn) {
        this._control.updateOn = this.updateOn;
      }
    }

    if (this.updateOn === 'change') {
      // Subscribe to changes in the child control state in order to update the form field UI.
      this._control.stateChanges
        .pipe(startWith(null), observeOn(asapScheduler), takeUntil(this._destroyed))
        .subscribe(() => {
          this._syncDescribedByIds();
          this._cdr.markForCheck();
        });

      merge(
        this._hintChildren.changes,
        this._appendixChildren.changes,
        this._prefixChildren.changes,
        this._suffixChildren.changes,
        this._noteChildren.changes,
      )
        .pipe(startWith(null), takeUntil(this._destroyed))
        .subscribe(() => {
          this._cdr.markForCheck();
        });

      // Update the aria-described by when the number of errors changes.
      this._errorChildren.changes
        .pipe(startWith(null), observeOn(asapScheduler), takeUntil(this._destroyed))
        .subscribe(() => {
          this._syncDescribedByIds();
          this._cdr.markForCheck();
        });
    }

    // Whenever there are updates to ngControl, it's necessary to trigger change detection to ensure the view reflects these changes
    this._control.ngControl?.valueChanges?.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  ngAfterContentChecked(): void {
    this._validateControlChild();
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** The status that is actually applied; null outside `appearance="outline"`, where the styling isn't defined. @docs-private */
  readonly _effectiveStatus = computed<NxFormfieldStatus | null>(() => {
    const status = this.status();

    if (!status) {
      return null;
    }

    if (!this._isOutline()) {
      return null;
    }

    return status;
  });

  /**
   * Whether the status border/message is currently shown. Kept out of `_effectiveStatus`
   * so `disabled` — a plain property on the control, not a signal — is re-read on every
   * check instead of being baked into the memoized computed. @docs-private
   */
  _isStatusVisible(): boolean {
    return !!this._effectiveStatus() && !this._control.disabled;
  }

  /** @docs-private */
  readonly _statusMessageContext = computed<CONTEXT | null>(() => {
    const status = this._effectiveStatus();
    return status ? STATUS_MESSAGE_CONTEXT[status] : null;
  });

  /** @docs-private */
  getDisplayedMessage(): 'note' | 'error' | 'status' | '' {
    if (this._control.errorState && this._errorChildren && this._errorChildren.length > 0) {
      return 'error';
    }
    if (this._isStatusVisible()) {
      return 'status';
    }
    if (this._noteChildren && this._noteChildren.length > 0) {
      return 'note';
    }

    return '';
  }

  private _syncDescribedByIds() {
    if (this._control) {
      let ids: string[] = [];
      ids = this._hintChildren.map((hint) => hint.id());

      const displayedMessage = this.getDisplayedMessage();

      if (displayedMessage === 'status') {
        ids = [this._statusMessageId, ...ids];
      } else if (displayedMessage === 'note') {
        ids = [...this._noteChildren.map((hint) => hint.id()), ...ids];
      } else if (this._errorChildren) {
        ids = [...this._errorChildren.map((error) => error.id()), ...ids];
      }

      this._control.setDescribedByIds(ids);
    }
  }

  // Fail if the required control is missing.
  protected _validateControlChild() {
    if (!this._control) {
      throw new Error(
        'Formfield must contain a NxFormfieldControl like input[nxInput] or a custom implementation',
      );
    }
  }

  /** Returns an element that overlays can attach to. */
  getConnectedOverlayOrigin(): ElementRef {
    return this._connectionContainerRef || this.elementRef;
  }

  /** @docs-private */
  _hasLabel() {
    return !!this._labelChild || !!this.label();
  }

  /**
   * The placeholder is hidden when
   * - the control is not empty
   * - The label is not floated
   * @docs-private
   */
  _hideControlPlaceholder() {
    return (!this.shouldLabelFloat && this._hasLabel()) || !this._control.empty;
  }

  _getTitle(): string {
    if (!this._labelChild) {
      return this.label() ?? '';
    }
    return this._labelChild.el.nativeElement?.innerText;
  }

  _onBlur() {
    if (this.updateOn === 'blur') {
      this._validateControlChild();
      this._syncDescribedByIds();
      this._cdr.markForCheck();
    }
  }

  _isRequired() {
    return this._control.ngControl?.control?.hasValidator(Validators.required) || false;
  }

  _isOutline() {
    return this.appearance === 'outline';
  }

  _isNxInput() {
    return (
      this._control.elementRef.nativeElement.tagName === 'INPUT' &&
      this._control.elementRef.nativeElement.hasAttribute('nxInput')
    );
  }

  /** @docs-private */
  get inputValueText() {
    if (!this._control.readonly && !this._control.disabled) {
      return;
    }
    return (this._control.elementRef.nativeElement.value || '').trim();
  }

  _isEllipsisActive() {
    return (
      this._control.elementRef.nativeElement.offsetWidth <
      this._control.elementRef.nativeElement.scrollWidth
    );
  }
}

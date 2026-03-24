import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import { NxFormfieldComponent, NxFormfieldControl } from '@allianz/ng-aquila/formfield';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxAbstractControl } from '@allianz/ng-aquila/shared';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { ErrorStateMatcher, IdGenerationService } from '@allianz/ng-aquila/utils';
import { NxVirtualFor, NxVirtualViewportComponent } from '@allianz/ng-aquila/virtual-scroll';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Dir, Direction, Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import {
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  RIGHT_ARROW,
  SHIFT,
  SPACE,
  TAB,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  Attribute,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  contentChild,
  ContentChildren,
  DoCheck,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Injectable,
  InjectionToken,
  Input,
  input,
  isDevMode,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  signal,
  TemplateRef,
  ViewChild,
  viewChild,
  ViewChildren,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroupDirective,
  FormsModule,
  NgControl,
  NgForm,
} from '@angular/forms';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { filter, map, startWith, take, takeUntil } from 'rxjs/operators';

import { NxDropdownClosedLabelDirective } from './closed-label.directive';
import { NxDropdownControl } from './dropdown.control';
import { getNxDropdownNonArrayValueError } from './dropdown-errors';
import {
  getOverlayOffsetYForNonOutlineAppearance,
  getOverlayOffsetYForOutlineAppearance,
  getPositions,
} from './dropdown-position';
import { NxDropdownGroupComponent } from './group/dropdown-group';
import { NxDropdownItemChange, NxDropdownItemComponent } from './item/dropdown-item';

/**
 * An option of the dropdown.
 * Contains a value and an optional label.
 * If no label is specified, the value will be displayed instead.
 */
export interface NxDropdownOption {
  value: any;
  label?: string;
}

/**
 * Context provided to custom item templates.
 * Use with `#nxDropdownItemTemplate` template reference.
 */
export interface NxDropdownItemTemplateContext<T = unknown> {
  /** The option value (use `let-item` to access directly) */
  $implicit: T;
  /** Index in the filtered options array */
  index: number;
  /** Whether the item is currently selected */
  selected: boolean;
}

export type NxDropdownPanelMinWidth = 'trigger' | 'none';

/** Vertical alignment of dropdown checkmark */
export type VerticalAlignCheckmark = 'top' | 'center';

/** Dropdown data that requires internationalization. */
@Injectable({ providedIn: 'root' })
export class NxDropdownIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes = new Subject<void>();
  /** A label for the multi-select component. */
  selectAll = 'Select all';
  /**
   * A label for the multi-select component.
   * @deprecated No longer used.
   * @deletion-target 18.0.0
   */
  clearAll = 'Clear all';
}

/** Change event object that is emitted when the select value has changed. */
export class NxDropdownSelectChange<T = any> {
  constructor(
    /** Reference to the select that emitted the change event. */
    readonly source: NxDropdownComponent,
    /** Current value of the select that emitted the event. */
    readonly value: T,
  ) {}
}

/** Injection token that determines the scroll handling while a dropdown is open. */
export const NX_DROPDOWN_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'nx-dropdown-scroll-strategy',
  {
    providedIn: 'root',
    factory: () => {
      const overlay = inject(Overlay);
      return () => overlay.scrollStrategies.reposition();
    },
  },
);

/**
 * @docs-private
 * @deprecated No longer used.
 * @deletion-target 18.0.0
 */
export function NX_DROPDOWN_SCROLL_STRATEGY_PROVIDER_FACTORY(
  overlay: Overlay,
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/**
 * @docs-private
 * @deprecated No longer used.
 * @deletion-target 18.0.0
 */
export const NX_DROPDOWN_SCROLL_STRATEGY_PROVIDER = {
  provide: NX_DROPDOWN_SCROLL_STRATEGY,
  useFactory: NX_DROPDOWN_SCROLL_STRATEGY_PROVIDER_FACTORY,
  deps: [Overlay],
};

/** Default options for dropdown that can be overridden globally. */
export interface NxDropdownDefaultOptions {
  /** Enable virtual scrolling for all dropdowns (default: false) */
  virtualScroll?: boolean;
}

/** Injection token to be used to override the default options for dropdown. */
export const DROPDOWN_DEFAULT_OPTIONS = new InjectionToken<NxDropdownDefaultOptions>(
  'DROPDOWN_DEFAULT_OPTIONS',
);

export type FilterInputType =
  | 'text'
  | 'number'
  | 'tel'
  | 'search'
  | 'date'
  | 'datetime'
  | 'month'
  | 'email';

export type NxDropdownFilterFn = (query: string, label: string) => boolean;

const _defaultFilterFn: NxDropdownFilterFn = (query, label) =>
  label.toLocaleLowerCase().includes(query.toLocaleLowerCase()); // TODO why not `toLowerCase()` as in multi-select?

export type NxDropdownCompareWithFn = (o1: any, o2: any) => boolean;

const _defaultCompareWithFn: NxDropdownCompareWithFn = (o1, o2) => o1 === o2;

export type NxDropdownValueFormatterFn = (value: any) => any; // TODO why not return a string?

const _defaultValueFormatterFn: NxDropdownValueFormatterFn = (value) =>
  value == null ? '' : value.toString();

@Component({
  selector: 'nx-dropdown',
  templateUrl: 'dropdown.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dropdown.scss'],
  providers: [
    { provide: NxDropdownControl, useExisting: NxDropdownComponent },
    { provide: NxFormfieldControl, useExisting: NxDropdownComponent },
    { provide: NxAbstractControl, useExisting: NxDropdownComponent },
  ],
  host: {
    role: 'combobox',
    '[class.nx-dropdown]': 'true',
    '[class.is-filled]': 'hasValue',
    '[class.is-readonly]': 'readonly',
    '[class.has-focus]': 'focused',
    '[class.nx-dropdown--negative]': '_negative',
    '[class.nx-dropdown--disabled]': 'disabled',
    '[attr.aria-describedby]': 'ariaDescribedby || null',
    '[attr.aria-required]': 'required',
    '[attr.aria-labelledby]': '_getAriaLabelledBy() || null',
    '[attr.aria-controls]': 'modalId',
    '[attr.aria-invalid]': 'errorState',
    'aria-haspopup': 'listbox',
    '[attr.aria-expanded]': 'panelOpen && !isClosing',
    '[attr.readonly]': 'readonly || null',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-disabled]': 'disabled || readonly',
    '[attr.tabindex]': 'tabIndex',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
    '(click)': 'openedByKeyboard = false; openPanel($event)',
  },
  imports: [
    FormsModule,
    CdkOverlayOrigin,
    NgTemplateOutlet,
    NxIconModule,
    CdkConnectedOverlay,
    Dir,
    NxDropdownItemComponent,
    NxTooltipModule,
    NxVirtualViewportComponent,
    NxVirtualFor,
    NxCheckboxModule,
  ],
})
export class NxDropdownComponent
  implements
    NxAbstractControl,
    NxDropdownControl,
    ControlValueAccessor,
    OnInit,
    AfterViewInit,
    AfterContentInit,
    OnDestroy,
    DoCheck
{
  private readonly _defaultOptions = inject(DROPDOWN_DEFAULT_OPTIONS, { optional: true });

  /** Whether the dropdown is readonly. */
  @Input() set readonly(value: BooleanInput) {
    this._readonly = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  get readonly(): boolean {
    return this._readonly;
  }
  private _readonly = false;

  /** set readonly state */
  setReadonly(value: boolean) {
    this.readonly = value;
  }

  readonly ariaLabelledBy = input<string | null>(null);

  /**
   * @docs-private
   * Internal writable signal for programmatic override of aria-labelledby
   */
  private readonly _ariaLabelledSignal = signal<string | null>(null);

  /**
   * @docs-private
   * Set the aria-labelledby attribute value programmatically from another component
   */
  _setAriaLabelledBy(value: string | null): void {
    this._ariaLabelledSignal.set(value);
  }

  /** @docs-private */
  protected readonly _getAriaLabelledBy = computed(() => {
    // Read all signals first to ensure they are tracked
    const programmaticLabel = this._ariaLabelledSignal();
    const inputLabel = this.ariaLabelledBy();

    return (
      programmaticLabel ?? inputLabel ?? this.formFieldComponent?.labelId ?? this.renderedValueId
    );
  });

  readonly verticalAlignCheckmark = input<VerticalAlignCheckmark>('top');

  private _selectionModel!: SelectionModel<NxDropdownOption>;

  /** The ID of rendered dropdown html element. */
  readonly renderedValueId: string = inject(IdGenerationService).nextId('nx-dropdown-rendered');
  readonly modalId: string = inject(IdGenerationService).nextId('nx-dropdown-modal');

  private _focused = false;

  /** Whether or not the overlay panel is open. */
  private _panelOpen = false;

  /** Whether the overlay is currently animating out. */
  protected isClosing = false;

  private _closeAnimationTimeoutId: ReturnType<typeof setTimeout> | null = null;

  /** @docs-private */
  errorState = false;

  _tooltipText = signal<string>('');

  /** Width of the overlay panel. */
  _overlayWidth: string | number = '';

  /** Min-width of the overlay panel. */
  _overlayMinWidth: string | number = '';

  /**
   * Name of this control that is used inside the formfield component.
   * @docs-private
   */
  controlType = 'nx-dropdown';

  /** The minimal space between the viewport and the overlay */
  _overlayViewportMargin: number = this.dir === 'rtl' ? 0 : 16;

  /** Holds the panelWidth after panel was attached. */
  _panelWidth?: number;

  _positions: ConnectionPositionPair[] = getPositions('auto', 0);

  /**
   * Emits when internal state changes to inform formfield about it.
   * @docs-private
   */
  readonly stateChanges = new Subject<void>();

  /** @docs-private */
  ariaDescribedby?: string;

  /**
   * Array of options for the dropdown.
   */
  @Input() set options(value: NxDropdownOption[]) {
    this._options.next(value);
  }
  get options(): NxDropdownOption[] {
    return this._options.value;
  }
  // @ts-expect-error TODO: refactor to be TS compatible
  private readonly _options = new BehaviorSubject<NxDropdownOption[]>(null);

  /**
   * Type of filter input (default: text).
   */
  @Input() set filterInputType(value: FilterInputType) {
    this._filterInputType = value;
  }
  get filterInputType(): FilterInputType {
    return this._filterInputType;
  }
  private _filterInputType: FilterInputType = 'text';

  @Input() set tabIndex(value: number) {
    // If the specified tabIndex value is null or undefined, fall back to the default value.
    this._tabIndex = value != null ? value : 0;
  }
  get tabIndex(): number {
    return this.disabled ? -1 : this._tabIndex;
  }
  private _tabIndex = 0;

  /** Selected value */
  @Input() set value(newValue: any) {
    if (newValue !== this._value) {
      this.writeValue(newValue);
      this._value = newValue;
      this._onChange(newValue);
    }
  }
  get value(): any {
    return this._value;
  }
  /** Holds the value from nxValue. */
  private _value: any;

  /** Whether the dropdown is disabled. */
  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    return this._disabled;
  }
  protected _disabled = false;

  /**
   * Whether the dropdown should allow multi selection and additional checkboxes are shown.
   * Note: Please make sure the value you bind is an array.
   * @throws Error if true and the bound value is not an array.
   * @deprecated Please use the new `<nx-multi-select>` component instead.
   */
  readonly isMultiSelect = input(false);

  /** The id of the input. */
  get id() {
    return this.renderedValueId;
  }

  /** Whether the component is required. This adds an aria-required label to the component. */
  @Input() set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
  }
  get required(): boolean {
    return this._required;
  }

  protected _required = false;

  private _style = '';
  /** Whether the dropdown should render in its negative style or not. */
  _negative = false;

  /** If set to 'negative', the component is displayed with the negative set of styles. */
  @Input('variant') set styles(value: string) {
    if (this._style === value) {
      return;
    }

    this._style = value;
    this._negative = !!this._style.match(/negative/);
  }

  /** Placeholder to be shown if no value has been selected. */
  @Input() set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  get placeholder(): string {
    return this._placeholder;
  }
  private _placeholder = '';

  /**
   * Disable truncation of long item texts.
   * We recommend following UX guidelines and always truncating long items.
   * Please only disable truncation if it's impossible to use short descriptions.
   * @deprecated
   */
  @Input() set ignoreItemTruncation(value: BooleanInput) {
    this._ignoreItemTruncation = coerceBooleanProperty(value);

    if (this._ignoreItemTruncation) {
      this.ignoreItemTruncationWasSet = true;
    }
  }
  get ignoreItemTruncation(): boolean {
    return this._ignoreItemTruncation;
  }
  private _ignoreItemTruncation = false;

  /** Whether the dropdown should be shown with an additional filter input. */
  readonly showFilter = input(false);

  /**
   * Enable virtual scrolling.
   * Requires using the `options` input (data-driven mode).
   */
  readonly virtualScroll = input(this._defaultOptions?.virtualScroll ?? false, {
    transform: booleanAttribute,
  });

  /** Text displayed as placeholder for the filter. */
  readonly filterPlaceholder = input('');

  /** Text that is displayed at the top of the overlay. If not set the formfield label is used by default. */
  readonly overlayLabel = input('');

  /** Can be used as a fallback to the CdkOverlayOrigin */
  readonly overlayFallbackOrigin = input<NxDropdownComponent>();

  /* panelMaxWidth accepts a number for pixel values or a string for any css value */
  readonly panelMaxWidth = input<string | number>();

  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange = new EventEmitter<boolean>();

  /** Event emitted when the select panel has been focus out. */
  @Output() readonly focusOut = new EventEmitter<boolean>();

  /** Event emitted when the dropdown items get filtered. Returns the currently visible dropdown items. */
  @Output('filterResult') readonly filterResultChange = new EventEmitter<
    NxDropdownItemComponent[]
  >();

  /** Event emitted when the select has been opened. */
  @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(
    filter((o) => o),
    map(() => {}),
  );

  /** Event emitted when the select has been closed. */
  @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(
    filter((o) => !o),
    map(() => {}),
  );

  /** Event emitted when the user types in the filter input. */
  @Output('filterInput') readonly filterChanges = new EventEmitter<any>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   * @docs-private
   */
  @Output() readonly valueChange = new EventEmitter<any>();

  /** Event emitted when the selected value has been changed. */
  @Output() readonly selectionChange = new EventEmitter<NxDropdownSelectChange>();

  /**
   * Panel containing the select options.
   * @docs-private
   */
  @ViewChild('panel') panel?: ElementRef;

  /** @docs-private */
  @ViewChild('panelBody') panelBody?: ElementRef;

  /** @docs-private */
  @ViewChild('trigger', { static: true }) trigger!: ElementRef;

  /** @docs-private */
  @ViewChild('fallbackOrigin') fallbackOrigin!: ElementRef | CdkOverlayOrigin;

  /** @docs-private */
  @ViewChild('filterInput') filterInput?: ElementRef;

  /** @docs-private */
  readonly _filterValue = signal('');

  /** @docs-private - getter for template binding compatibility */
  get filterValue(): string {
    return this._filterValue();
  }

  /** @docs-private - setter for template binding compatibility */
  set filterValue(value: string) {
    this._filterValue.set(value);
  }

  /**
   * Overlay pane containing the options.
   * @docs-private
   */
  @ViewChild(CdkConnectedOverlay, { static: true }) overlayDir!: CdkConnectedOverlay;

  @ContentChildren(NxDropdownItemComponent, { descendants: true })
  _contentDropdownItems!: QueryList<NxDropdownItemComponent>;

  /** @docs-private */
  @ContentChildren(NxDropdownGroupComponent) groups: any;

  @ContentChild(NxDropdownClosedLabelDirective)
  _customClosedDropdownLabel!: NxDropdownClosedLabelDirective;

  /**
   * Custom template for rendering items when using the `options` array.
   * Use `#nxDropdownItemTemplate` as the template reference name.
   */
  readonly _itemTemplate =
    contentChild<TemplateRef<NxDropdownItemTemplateContext>>('nxDropdownItemTemplate');

  @ViewChild('defaultClosedDropdownLabel', { static: true })
  private readonly _defaultClosedDropdownLabel!: TemplateRef<any>;

  @ViewChildren(NxDropdownItemComponent) _lazyDropdownItems!: QueryList<NxDropdownItemComponent>;

  get dropdownItems(): QueryList<NxDropdownItemComponent> {
    return this._isLazy ? this._lazyDropdownItems : this._contentDropdownItems;
  }

  /** @docs-private */
  get closedDropdownLabel(): TemplateRef<any> {
    return this._closedDropdownLabel;
  }
  private _closedDropdownLabel!: TemplateRef<any>;

  private readonly _destroyed = new Subject<void>();

  private _keyManager!: ActiveDescendantKeyManager<NxDropdownItemComponent>;

  private panelMinWidthWasSet = false;

  private panelGrowWasSet = false;

  private ignoreItemTruncationWasSet = false;

  set panelOpen(value: boolean) {
    this._panelOpen = value;
  }
  /** @docs-private */
  get panelOpen(): boolean {
    return this._panelOpen;
  }

  /** Strategy factory that will be used to handle scrolling while the dropdown panel is open. */
  private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

  /** Strategy that will be used to handle scrolling while the dropdown panel is open. */
  _scrollStrategy = this._scrollStrategyFactory();

  /** @docs-private */
  get label(): string {
    if (this._isInOutlineField) {
      return '';
    }

    const overlayLabel = this.overlayLabel();
    return overlayLabel ? overlayLabel : (this.formFieldComponent?.label() ?? '');
  }

  /**
   * Sets how the panel min width will be determined.
   * 'trigger' will set the panels min-width to the trigger width.
   * 'none' will not set a min-width and will let the panel grow naturally with its content so it can be smaller than the trigger.
   * This is mostly for special use cases like the country code dropdown in the phone input.
   * @deprecated Use `panelGrow` instead.
   */
  @Input() set panelMinWidth(value: NxDropdownPanelMinWidth) {
    this.panelMinWidthWasSet = true;
    this._panelMinWidth = value;
  }
  get panelMinWidth(): NxDropdownPanelMinWidth {
    return this._panelMinWidth;
  }
  _panelMinWidth: NxDropdownPanelMinWidth = 'trigger';

  /**
   * panelGrow: true means the overlay can grow larger than the trigger and grows with the longest label
   * panelGrow: false means the overlay is the size of the trigger
   */
  @Input({ transform: booleanAttribute }) set panelGrow(value) {
    this.panelGrowWasSet = true;
    this._panelGrow = value;
  }
  get panelGrow(): boolean {
    return this._panelGrow;
  }
  _panelGrow: boolean = false;

  /**
   * Function that transforms the value into a string.
   * This function is used for displaying and filtering the content.
   *
   * Default: `(value: any) => value == null ? '' : value.toString()`.
   */
  @Input() set valueFormatter(value: NxDropdownValueFormatterFn | null | undefined) {
    this.#valueFormatter = value;
  }
  get valueFormatter(): NxDropdownValueFormatterFn {
    return this.#valueFormatter ?? _defaultValueFormatterFn;
  }
  #valueFormatter?: NxDropdownValueFormatterFn | null;

  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   *
   * Defaults to object equality.
   */
  @Input() set compareWith(value: NxDropdownCompareWithFn | null | undefined) {
    this.#compareWith = value;
    if (this._selectionModel) {
      // A different comparator means the selection could change.
      this._initializeSelection();
    }
  }
  get compareWith(): NxDropdownCompareWithFn {
    return this.#compareWith ?? _defaultCompareWithFn;
  }
  #compareWith?: NxDropdownCompareWithFn | null;

  /**
   * Function to be used when the user types into the search filter. The first argument is the user input,
   * the second argument is the dropdown item value as displayed. The dropdown items will use this function
   * to set their visibility state. A boolean should be returned.
   *
   * Defaults to lower case inclusion.
   */
  @Input() set filterFn(value: NxDropdownFilterFn | null | undefined) {
    this.#filterFn = value;
  }
  get filterFn(): NxDropdownFilterFn {
    return this.#filterFn ?? _defaultFilterFn;
  }
  #filterFn?: NxDropdownFilterFn | null;

  /**
   * Whether the select is focused.
   * @docs-private
   */
  get focused(): boolean {
    return this._focused || this.panelOpen;
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {};

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => {};

  /** @docs-private */
  get elementRef(): ElementRef {
    return this._elementRef;
  }

  /** The text direction of the containing app. */
  get dir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Active value from key manager (traditional mode) */
  protected readonly _keyManagerActiveValue = signal<unknown>(null);

  /** ViewChild reference to virtual viewport component */
  readonly virtualViewport = viewChild<NxVirtualViewportComponent>('virtualViewport');

  /** Active index in virtual scroll mode (index in filtered options array) */
  protected readonly _virtualActiveIndex = signal<number>(-1);

  /** Active value in virtual mode - computed from index */
  protected readonly _virtualActiveValue = computed(() => {
    const index = this._virtualActiveIndex();
    const options = this._filteredOptions();
    return index >= 0 && index < options.length ? options[index].value : null;
  });

  /** Unified active value - switches based on mode */
  protected readonly _activeValue = computed(() =>
    this.virtualScroll() ? this._virtualActiveValue() : this._keyManagerActiveValue(),
  );

  /** Computed ID for aria-activedescendant, works for both modes */
  protected readonly activeDescendantId = computed(() => {
    const value = this._activeValue();
    if (value === null) {
      return null;
    }

    if (this.virtualScroll()) {
      const index = this._filteredOptions().findIndex((opt) => this.compareWith(opt.value, value));
      return index >= 0 ? `${this.modalId}-option-${index}` : null;
    }

    const item = this.dropdownItems?.find((i) => this.compareWith(i.value, value));
    return item?.id ?? null;
  });

  /** Filtered options for virtual mode (respects filter) */
  protected readonly _filteredOptions = computed(() => {
    const filterValue = this._filterValue();
    if (!this.virtualScroll() || !this.options) {
      return [];
    }
    if (!filterValue || !this.showFilter()) {
      return this.options;
    }
    return this.options.filter((opt) => this.filterFn(filterValue, this._getLabel(opt)));
  });

  /** Typeahead buffer (shared) */
  private _typeaheadBuffer = '';

  /** Typeahead timeout ID */
  private _typeaheadTimeout: ReturnType<typeof setTimeout> | null = null;

  private _clearTypeahead(): void {
    this._typeaheadBuffer = '';
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
      this._typeaheadTimeout = null;
    }
  }

  constructor(
    private readonly _cdr: ChangeDetectorRef,
    private readonly _elementRef: ElementRef,
    private readonly _ngZone: NgZone,
    @Attribute('tabindex') tabIndex: string,
    @Optional() private readonly formFieldComponent: NxFormfieldComponent | null,
    private readonly _errorStateMatcher: ErrorStateMatcher,
    /** @docs-private */ @Optional() @Self() readonly ngControl: NgControl | null,
    @Optional() private readonly _parentForm: NgForm | null,
    @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
    @Optional() private readonly _dir: Directionality | null,
    @Inject(NX_DROPDOWN_SCROLL_STRATEGY)
    private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
  ) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    this.tabIndex = parseInt(tabIndex, 10) || 0;
  }

  ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorState();
    }
  }

  ngOnInit(): void {
    this._selectionModel = new SelectionModel(this.isMultiSelect());
  }

  ngAfterViewInit(): void {
    this._initKeyManager();
    // initial tooltip evaluation after first render
    this._scheduleTooltipUpdate();
  }

  ngAfterContentInit(): void {
    this._closedDropdownLabel =
      this._customClosedDropdownLabel?.templateRef || this._defaultClosedDropdownLabel;

    this._selectionModel.changed.pipe(takeUntil(this._destroyed)).subscribe((event) => {
      event.added.forEach(({ value }) => {
        this.dropdownItems
          .filter((option) => option.value === value)
          .forEach((option) => option.select());
      });

      event.removed.forEach(({ value }) => {
        this.dropdownItems
          .filter((option) => option.value === value)
          .forEach((option) => option.deselect());
      });
    });

    if (this._isLazy) {
      this._options.pipe(takeUntil(this._destroyed)).subscribe(() => {
        this._initializeSelection();
      });
    } else {
      this.dropdownItems.changes
        .pipe(startWith<any, any>(null), takeUntil(this._destroyed))
        .subscribe(() => {
          this._subscribeToOptionChanges();
          this._initializeSelection();
        });
    }
  }

  ngOnDestroy(): void {
    if (this._tooltipUpdateTimeoutId) {
      clearTimeout(this._tooltipUpdateTimeoutId);
      this._tooltipUpdateTimeoutId = null;
    }
    this._clearCloseAnimationTimeout();
    this._destroyed.next();
    this._destroyed.complete();
  }

  /** @docs-private */
  updateErrorState() {
    const oldState = this.errorState;
    const parent = this._parentFormGroup || this._parentForm;
    const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
    const newState = this._errorStateMatcher.isErrorState(control, parent);

    if (newState !== oldState) {
      this.errorState = newState;
      this.stateChanges.next();
    }
  }

  private _updateTooltipText() {
    if (!this.trigger) {
      return;
    }
    const [label, icon] = this.trigger.nativeElement.children;
    const { paddingLeft, paddingRight } = getComputedStyle(this.trigger.nativeElement);
    const triggerContentWidth =
      this.trigger.nativeElement.clientWidth -
      parseInt(paddingLeft, 10) -
      parseInt(paddingRight, 10);

    let newTooltipText: string;
    if (triggerContentWidth - icon.offsetWidth < label.scrollWidth) {
      newTooltipText = this.triggerValue;
    } else {
      newTooltipText = '';
    }

    if (this._tooltipText() !== newTooltipText) {
      this._tooltipText.set(newTooltipText);
    }
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<NxDropdownItemComponent>(this.dropdownItems)
      .withTypeAhead(200)
      .withHomeAndEnd()
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr')
      .skipPredicate((item) => item._hidden || item.disabled);

    this._keyManager.tabOut
      .pipe(takeUntil(this._closedStream), takeUntil(this._destroyed))
      .subscribe(() => {
        // Restore focus to the trigger before closing. Ensures that the focus
        // position won't be lost if the user got focus into the overlay.
        this.closePanel();
      });

    this._keyManager.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
      if (this._panelOpen && this.panel) {
        this._scrollActiveOptionIntoView();
      } else if (!this._panelOpen && !this.isMultiSelect() && this._keyManager.activeItem) {
        this._keyManager.activeItem._selectViaInteraction();
      }
      this._keyManagerActiveValue.set(this._keyManager.activeItem?.value ?? null);
    });
  }

  openedByKeyboard = true;

  private _initActiveItem() {
    if (!this.isMultiSelect() && this._selectionModel.selected[0]) {
      const option = this.dropdownItems.find(
        (o) => o.value === this._selectionModel.selected[0].value,
      );

      if (option) {
        this._keyManager.setActiveItem(option);
        this._scrollActiveOptionIntoCenter();
      }
    } else {
      this._keyManager.setFirstItemActive();
    }
  }

  private _subscribeToOptionChanges(): void {
    merge(...this.dropdownItems.map((option) => option.onSelectionChange))
      .pipe(takeUntil(this.dropdownItems.changes), takeUntil(this._destroyed))
      .subscribe((event) => {
        this._onSelect(event.item, event.isUserInput);
      });

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.dropdownItems.map((option) => option._stateChanges))
      .pipe(takeUntil(this.dropdownItems.changes), takeUntil(this._destroyed))
      .subscribe(() => {
        // defer it for the next cycle to not run in changed after checked errors
        // the combination of dropdown-item notifying parent and when the parent
        // tries to fetch the triggerValue from the child throws these errors
        Promise.resolve().then(() => {
          if (this._panelOpen) {
            this._initActiveItem();
          }
          this._cdr.markForCheck();
          this.stateChanges.next();
        });
      });
  }

  /** Invoked when an option is clicked. */
  _onSelect(option: NxDropdownItemComponent, isUserInput: boolean, item?: NxDropdownOption): void {
    const wasSelected = this._selectionModel.isSelected(option);
    const selectedOption = item || option;

    const isMultiSelect = this.isMultiSelect();
    if (option.value === null && !isMultiSelect) {
      option.deselect();
      this._selectionModel.clear();
      this._propagateChanges(selectedOption.value);
    } else {
      if (option.selected) {
        this._selectionModel.select(selectedOption);
      } else {
        this._selectionModel.deselect(selectedOption);
      }

      if (isUserInput) {
        this._keyManager?.setActiveItem(option);
      }

      if (isMultiSelect) {
        this._sortValues();
      }
    }

    const isSelected = this._selectionModel.isSelected(selectedOption);

    if (wasSelected !== isSelected) {
      this._propagateChanges();

      this._tooltipText.set('');
      this._scheduleTooltipUpdate();
    }

    this.stateChanges.next();

    if (isUserInput && !isMultiSelect && this._panelOpen) {
      this.closePanel();
    }
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    if (!this._selectionModel) {
      return;
    }

    this._selectionModel.clear();

    if (this.isMultiSelect() && value) {
      if (!Array.isArray(value)) {
        throw getNxDropdownNonArrayValueError();
      }

      value.forEach((v) => this._selectValue(v));
      this._sortValues();
    } else {
      this._selectValue(value);
    }

    this._cdr.markForCheck();
    this._scheduleTooltipUpdate();
  }

  /**
   * Finds and selects and option based on its value.
   */
  private _selectValue(value: any) {
    const filterFn = (o: NxDropdownOption) => {
      try {
        // Treat null as a special reset value.
        return o.value !== null && this.compareWith(o.value, value);
      } catch (error) {
        if (isDevMode()) {
          // Notify developers of errors in their comparator.
          console.warn(error);
        }
        return false;
      }
    };

    const options = this._isLazy ? this.options : this.dropdownItems.toArray();
    const option = options.find(filterFn);

    if (option) {
      this._selectionModel.select(option);
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.isMultiSelect()) {
      valueToEmit = this._selectionModel.selected.map((option) => option.value);
    } else {
      const selectedOption = this._selectionModel.selected[0];
      valueToEmit = selectedOption ? selectedOption.value : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new NxDropdownSelectChange(this, valueToEmit));
    this._cdr.markForCheck();
  }

  /** Sorts the selected values in the selected based on their order in the panel. */
  private _sortValues() {
    if (this.isMultiSelect()) {
      const options = this._isLazy ? this.options : this.dropdownItems.toArray();
      this._selectionModel.sort(
        (a, b) =>
          options.findIndex((o) => o.value === a.value) -
          options.findIndex((o) => o.value === b.value),
      );
      this.stateChanges.next();
    }
  }

  private _updatePosition(): void {
    if (this.formFieldComponent) {
      const panelHeader = this.overlayDir.overlayRef.overlayElement.querySelector(
        '.nx-dropdown__panel-header',
      );
      let offsetY;
      if (this.formFieldComponent?.appearance !== 'outline') {
        // Adds an offset to the overlay position, so the formfield label and the dropdown panel header are vertically aligned.
        offsetY = getOverlayOffsetYForNonOutlineAppearance(
          this._elementRef.nativeElement,
          this.formFieldComponent.elementRef.nativeElement,
          panelHeader,
        );
      } else {
        // Adds an offset via '--dropdown-panel-offset-y' CSS custom property, so there's a small gap between input and overlay
        offsetY = getOverlayOffsetYForOutlineAppearance(this.overlayOrigin);
      }
      this._positions = getPositions(this.formFieldComponent.appearance, offsetY);
    }
  }

  /** Focuses the select element. */
  focus() {
    this._elementRef.nativeElement.focus();
  }

  /**
   * Scrolls to the option at the specified index.
   * Works for both virtual and non-virtual scroll modes.
   * @param index The zero-based index of the option to scroll to
   * @param behavior Scroll behavior ('auto' or 'smooth'). Default: 'auto'
   */
  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto'): void {
    if (!this.panelOpen) {
      return;
    }
    if (this.virtualScroll()) {
      this.virtualViewport()?.scrollToIndex(index, behavior);
    } else {
      const items = this.dropdownItems?.toArray() ?? [];
      if (index >= 0 && index < items.length) {
        const item = items[index];
        item.containerElement.nativeElement.scrollIntoView({
          block: 'nearest',
          behavior,
        });
      }
    }
  }

  /**
   * Scrolls to the option with the specified value.
   * Uses the compareWith function to match values.
   * @param value The value of the option to scroll to
   * @param behavior Scroll behavior ('auto' or 'smooth'). Default: 'auto'
   */
  scrollToValue(value: unknown, behavior: ScrollBehavior = 'auto'): void {
    const index = this._findIndexByValue(value);
    if (index !== -1) {
      this.scrollToIndex(index, behavior);
    }
  }

  private _findIndexByValue(value: unknown): number {
    if (this.virtualScroll()) {
      return this._filteredOptions().findIndex((opt) => this.compareWith(opt.value, value));
    }
    const items = this.dropdownItems?.toArray() ?? [];
    return items.findIndex((item) => this.compareWith(item.value, value));
  }

  get overlayOrigin() {
    const overlayFallbackOrigin = this.overlayFallbackOrigin();
    if (overlayFallbackOrigin) {
      return overlayFallbackOrigin.elementRef;
    }
    return this.formFieldComponent
      ? this.formFieldComponent.getConnectedOverlayOrigin()
      : this.fallbackOrigin;
  }

  /** Opens the panel of the dropdown. */
  openPanel($event: Event) {
    if (
      this.disabled ||
      this.readonly ||
      !(this.dropdownItems?.length || this.options?.length) ||
      this._panelOpen
    ) {
      return;
    }

    this._clearCloseAnimationTimeout();
    this.isClosing = false;
    $event.preventDefault();
    this._panelOpen = true;

    setTimeout(() => {
      if (this.virtualScroll()) {
        // Initialize virtual scroll mode
        this._initVirtualScrollMode();
      } else {
        // Standard mode initialization
        this._selectionModel.selected.forEach((selectedOption) => {
          const option = this.dropdownItems.find((o) => o.value === selectedOption.value);
          if (option) {
            option._initSelected(true);
          }
        });
        this._initActiveItem();
      }
      this._cdr.markForCheck();
    });

    // If panelMinWidth or ignoreTruncation have been set, they will be mapped to panelGrow
    // If panelGrow has been set, panelMinWidth and ignoreTruncation will be ignored
    if (
      (this.panelMinWidthWasSet && !this.panelGrowWasSet) ||
      (this.ignoreItemTruncationWasSet && !this.panelGrowWasSet)
    ) {
      this.panelGrow = true;
    }

    this.getOverlayWidth();
    this._cdr.markForCheck();
  }

  private getOverlayWidth() {
    const origin = this.overlayOrigin;
    const ref = origin instanceof CdkOverlayOrigin ? origin.elementRef : origin;
    const triggerWidth = ref.nativeElement.getBoundingClientRect().width;

    if (this.panelGrow) {
      // If panelGrow is set to true, the overlay will receive a
      // min-width the size of the trigger to be able to grow
      this._overlayMinWidth = triggerWidth;
    } else if (!this.panelGrow) {
      // If panelGrow is set to false, the overlay will receive a
      // fixed width the size of the trigger
      this._overlayWidth = triggerWidth;
    }
  }

  /** Closes the panel of the dropdown. */
  closePanel() {
    if (!this._panelOpen || this.isClosing) {
      return;
    }

    this.isClosing = true;
    this._clearCloseAnimationTimeout();

    const duration = this._getOverlayAnimationDuration();
    const doClose = () => {
      this._panelOpen = false;
      this.isClosing = false;
      this._closeAnimationTimeoutId = null;
      this._cdr.markForCheck();
      this._onTouched();
      this.openedChange.emit(false);
      // defer the focus if the dropdown triggers actions that detach
      // a template/view from the DOM to prevent changed after checked errors
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => this.focus());
      });
    };
    if (duration > 0) {
      this._closeAnimationTimeoutId = setTimeout(doClose, duration);
    } else {
      doClose();
    }
  }

  private _clearCloseAnimationTimeout() {
    if (this._closeAnimationTimeoutId) {
      clearTimeout(this._closeAnimationTimeoutId);
      this._closeAnimationTimeoutId = null;
    }
  }

  private _getOverlayAnimationDuration(): number {
    const duration =
      parseFloat(
        getComputedStyle(this._elementRef.nativeElement).getPropertyValue(
          '--dropdown-anim-duration',
        ),
      ) || 0;
    return duration * 1000;
  }

  private _scrollActiveOptionIntoCenter() {
    if (!this.panelBody) {
      return;
    }
    // reset the scrolltop to make calculation easier
    this.panelBody.nativeElement.scrollTop = 0;

    if (!this.empty) {
      const offset = this._getItemOffset(this._keyManager.activeItem);
      const panelHeight = this.panelBody.nativeElement.offsetHeight;
      const panelRect = this.panelBody.nativeElement.getBoundingClientRect();
      const middleOfPanel = panelRect.top + panelHeight / 2;

      if (offset > middleOfPanel) {
        // because we reset the scrollTop to 0 at the top we can simply take the middleOfPanel which is our
        // target position for the item and subtract it from the offset (which is now always relative to the viewport)
        this.panelBody.nativeElement.scrollTop = offset - middleOfPanel;
      }
    }
  }

  /** Scrolls the active option into view. */
  private _scrollActiveOptionIntoView(): void {
    if (!this.panelBody || !this.panelOpen || !this._keyManager.activeItem) {
      return;
    }

    const activeItem = this._keyManager.activeItem.containerElement.nativeElement;
    activeItem.scrollIntoView({ block: 'nearest' });
  }

  private _getItemOffset(item: NxDropdownItemComponent | null): number {
    if (!item) {
      return 0;
    }

    const itemRect = item.containerElement.nativeElement.getBoundingClientRect();
    return itemRect.top + itemRect.height / 2; // get position of the item's center
  }

  /**
   * Formfield implementation.
   * @docs-private
   */
  setDescribedByIds(ids: string[]): void {
    this.ariaDescribedby = ids.join(' ');
  }

  /**
   * Support for aria-label removed in favor of aria-labelledby
   * The NxFormfieldControl abstract class requires implementation
   * of below method.
   * @docs-private
   */
  setAriaLabel(value: string) {
    return value;
  }

  get _isInOutlineField(): boolean {
    return this.formFieldComponent !== null && this.formFieldComponent.appearance === 'outline';
  }

  /**
   * Whether the select has a value.
   * @docs-private
   */
  get empty(): boolean {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }

  /** @docs-private */
  get hasValue() {
    return this._selectionModel.hasValue();
  }

  /** @docs-private */
  get shouldLabelFloat(): boolean {
    return this.focused || !this.empty || !!(this.placeholder && this.placeholder.length > 0);
  }
  /** End Formfield */

  /** ControlValueAccessor */
  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * Function `setTimeout()` allows to write value after ngOnInit (happens before it right now),
   * so that we have the input `options` set, and it's shown properly in the dropdown
   * https://github.com/angular/angular/issues/29218#issuecomment-592015773
   * It can be removed after the Angular issue is resolved
   * @param value New value to be written to the model.
   */
  writeValue(value: any): void {
    Promise.resolve().then(() => {
      this._setSelectionByValue(value);
    });
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  /**
   * Disables the select. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   * @param isDisabled Sets whether the component is disabled.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
    this.stateChanges.next();
  }
  /** End ControlValueAccessor */

  _handleKeydown(event: KeyboardEvent) {
    this.openedByKeyboard = true;

    // Common handling for both modes when panel is open
    if (this.panelOpen && event.keyCode === TAB) {
      this.closePanel();
      return;
    }

    // Mode-specific handling
    if (this.virtualScroll() && this.panelOpen) {
      this._handleVirtualKeydown(event);
    } else {
      this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }
  }

  private get _isLazy(): boolean {
    return Array.isArray(this.options);
  }

  private _handleClosedKeydown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    // TODO use event.code after removing IE11 support
    const keyCode = event.keyCode;
    const isCharacterKey =
      event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;
    const isArrowKey =
      keyCode === DOWN_ARROW ||
      keyCode === UP_ARROW ||
      keyCode === LEFT_ARROW ||
      keyCode === RIGHT_ARROW;
    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    // Open the select on ALT + arrow key to match the native <select>
    const isMultiSelect = this.isMultiSelect();
    if (isOpenKey || ((isMultiSelect || event.altKey) && isArrowKey)) {
      event.preventDefault(); // prevents the page from scrolling down when pressing space
      this.openPanel(event);
    } else if (!isMultiSelect) {
      switch (keyCode) {
        case DOWN_ARROW:
        case UP_ARROW:
          this.openPanel(event);

          event.preventDefault();
          break;
        case HOME:
          this.openPanel(event);
          setTimeout(() => {
            this._keyManager.setFirstItemActive();
            this._cdr.markForCheck();
          });
          event.preventDefault();
          break;
        case END:
          this.openPanel(event);
          setTimeout(() => {
            this._keyManager.setLastItemActive();
            this._cdr.markForCheck();
          });
          event.preventDefault();
          break;
        default:
          if (isCharacterKey) {
            this.openPanel(event);

            setTimeout(() => {
              if (this.showFilter()) {
                this.filterValue = event.key;
                this._onFilter(event.key);
              } else {
                this._keyManager.onKeydown(event);
              }
            });
          }
      }
    }
  }

  private _handleOpenKeydown(event: KeyboardEvent) {
    // TODO use event.code after removing IE11 support
    const keyCode = event.keyCode;
    // if has filter all events other than the listed ones should be ignored or handled in _onFilter()
    const showFilter = this.showFilter();
    if (
      ![
        DOWN_ARROW,
        UP_ARROW,
        HOME,
        END,
        ENTER,
        LEFT_ARROW,
        RIGHT_ARROW,
        SHIFT,
        SPACE,
        TAB,
      ].includes(keyCode) &&
      showFilter
    ) {
      return;
    }

    const isUpDown = keyCode === DOWN_ARROW || keyCode === UP_ARROW;
    const isLeftRight = keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW;
    const isHomeEnd = keyCode === HOME || keyCode === END;
    const manager = this._keyManager;

    const allHidden = this.dropdownItems
      .map((option) => option._hidden)
      .every((option) => Boolean(option));

    // navigate filter input field
    if ((isLeftRight || isHomeEnd) && showFilter) {
      return;
    }

    if (isHomeEnd) {
      event.preventDefault();
      keyCode === HOME ? manager.setFirstItemActive() : manager.setLastItemActive();
    } else if (isUpDown && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.closePanel();
    } else if (keyCode === ENTER && manager.activeItem && !allHidden) {
      event.preventDefault();

      manager.activeItem._selectViaInteraction();
    } else if (keyCode === ENTER && allHidden) {
      event.preventDefault();

      this.closePanel();
    } else if (!showFilter && keyCode === SPACE && manager.activeItem) {
      event.preventDefault();
      manager.activeItem._selectViaInteraction();
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;
      manager.onKeydown(event);

      if (
        this.isMultiSelect() &&
        isUpDown &&
        event.shiftKey &&
        manager.activeItem &&
        manager.activeItemIndex !== previouslyFocusedIndex
      ) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }

  /** @docs-private */
  formatValue(value: any): string {
    return this.valueFormatter(value);
  }

  /** Called when the user types in the filter input */
  _onFilter(query: string) {
    // Handle virtual scroll mode separately
    if (this.virtualScroll()) {
      this._onVirtualFilter(query);
      return;
    }

    this.filterChanges.next(query);
    const allHidden = this.dropdownItems.toArray().every((option) => option._hidden);
    if (allHidden) {
      // @ts-expect-error: not possible according to TS, but has been working already
      this._keyManager.setActiveItem(null);
    } else {
      this._keyManager.setFirstItemActive();
    }

    const visibleItems = this.dropdownItems.filter((option) => !option._hidden);
    this.filterResultChange.next(visibleItems);
  }

  /**
   * The value displayed in the trigger.
   * @docs-private
   */
  get triggerValue(): string {
    if (this.empty) {
      return '';
    }

    if (this.isMultiSelect()) {
      return this._selectionModel.selected.map((option) => this._getLabel(option)).join(', ');
    }
    return this._getLabel(this._selectionModel.selected[0]);
  }

  _getLabel(option: NxDropdownOption) {
    return option.label || this.formatValue(option.value);
  }

  /** Creates the context object for custom item templates */
  _createItemTemplateContext(
    option: NxDropdownOption,
    index: number,
  ): NxDropdownItemTemplateContext {
    return {
      $implicit: option.value,
      index,
      selected: this._isValueSelected(option.value),
    };
  }

  /** Extract value from NxDropdownOption for virtual scroll component */
  readonly _getOptionValue = (option: NxDropdownOption): unknown => option.value;

  /** Extract label from NxDropdownOption for virtual scroll component */
  readonly _getOptionLabel = (option: NxDropdownOption): string => this._getLabel(option);

  /** Check if a value is currently selected */
  _isValueSelected(value: unknown): boolean {
    return this._selectionModel.selected.some((s) => this.compareWith(s.value, value));
  }

  /** Handle selection change from nx-dropdown-item in virtual scroll mode */
  _onVirtualSelect(event: NxDropdownItemChange, item: NxDropdownOption, index: number): void {
    if (event.isUserInput) {
      this._selectVirtualItem(item, index);
    }
  }

  /** Select/toggle a virtual item */
  private _selectVirtualItem(option: NxDropdownOption, index: number): void {
    const isSelected = this._isValueSelected(option.value);
    const isMultiSelect = this.isMultiSelect();

    if (option.value === null && !isMultiSelect) {
      this._selectionModel.clear();
      this._propagateChanges(option.value);
    } else if (isMultiSelect) {
      if (isSelected) {
        this._selectionModel.deselect(option);
      } else {
        this._selectionModel.select(option);
      }
      this._sortValues();
      this._propagateChanges();
    } else {
      this._selectionModel.clear();
      this._selectionModel.select(option);
      this._propagateChanges();
    }

    // Update active index and sync _activeValue
    this._virtualActiveIndex.set(index);

    this._tooltipText.set('');
    this._scheduleTooltipUpdate();
    this.stateChanges.next();

    if (!isMultiSelect && this._panelOpen) {
      this.closePanel();
    }
  }

  /** Initialize virtual scroll mode when panel opens */
  private _initVirtualScrollMode(): void {
    const options = this._filteredOptions();
    if (options.length === 0) {
      this._virtualActiveIndex.set(-1);
      return;
    }

    // Find the index of the first selected item
    let activeIndex = 0;
    if (!this.isMultiSelect() && this._selectionModel.selected[0]) {
      const selectedValue = this._selectionModel.selected[0].value;
      const foundIndex = options.findIndex((opt) => this.compareWith(opt.value, selectedValue));
      if (foundIndex >= 0) {
        activeIndex = foundIndex;
      }
    }

    this._virtualActiveIndex.set(activeIndex);

    // Scroll to the active item after viewport is ready
    setTimeout(() => {
      this.virtualViewport()?.scrollIntoView(activeIndex);
    });
  }

  /** Handle keyboard events in virtual scroll mode */
  private _handleVirtualKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    const options = this._filteredOptions();

    // TAB is handled in _handleKeydown
    if (options.length === 0) {
      return;
    }

    switch (keyCode) {
      case DOWN_ARROW:
        this._clearTypeahead();
        this._virtualArrowDown();
        event.preventDefault();
        break;
      case UP_ARROW:
        this._clearTypeahead();
        this._virtualArrowUp();
        event.preventDefault();
        break;
      case HOME:
        this._clearTypeahead();
        this._virtualHome();
        event.preventDefault();
        break;
      case END:
        this._clearTypeahead();
        this._virtualEnd();
        event.preventDefault();
        break;
      case ENTER:
        this._virtualSelect();
        event.preventDefault();
        break;
      case SPACE:
        if (!this.showFilter()) {
          this._virtualSelect();
          event.preventDefault();
        }
        break;
      default:
        // Typeahead for character keys when filter is not shown
        if (
          !this.showFilter() &&
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          this._handleVirtualTypeahead(event.key);
        }
        break;
    }
  }

  private _virtualArrowDown(): void {
    const options = this._filteredOptions();
    const currentIndex = this._virtualActiveIndex();
    const newIndex = Math.min(currentIndex + 1, options.length - 1);

    if (newIndex !== currentIndex) {
      this.virtualViewport()?.scrollIntoView(newIndex);
      this._virtualActiveIndex.set(newIndex);
    }
  }

  private _virtualArrowUp(): void {
    const options = this._filteredOptions();
    const currentIndex = this._virtualActiveIndex();
    const newIndex = Math.max(currentIndex - 1, 0);

    if (newIndex !== currentIndex) {
      this.virtualViewport()?.scrollIntoView(newIndex);
      this._virtualActiveIndex.set(newIndex);
    }
  }

  private _virtualHome(): void {
    const options = this._filteredOptions();
    this.virtualViewport()?.scrollToIndex(0);
    this._virtualActiveIndex.set(0);
  }

  private _virtualEnd(): void {
    const options = this._filteredOptions();
    const lastIndex = options.length - 1;
    this.virtualViewport()?.scrollToIndex(lastIndex);
    this._virtualActiveIndex.set(lastIndex);
  }

  private _virtualSelect(): void {
    const index = this._virtualActiveIndex();
    const options = this._filteredOptions();

    if (index >= 0 && index < options.length) {
      this._selectVirtualItem(options[index], index);
    }
  }

  private _handleVirtualTypeahead(char: string): void {
    this._typeaheadBuffer += char.toLowerCase();

    // Clear any pending search
    if (this._typeaheadTimeout) {
      clearTimeout(this._typeaheadTimeout);
    }

    // Debounce: wait 200ms for typing to pause before searching
    this._typeaheadTimeout = setTimeout(() => {
      this._executeTypeaheadSearch();
    }, 200);
  }

  private _executeTypeaheadSearch(): void {
    const searchString = this._typeaheadBuffer.toLocaleUpperCase();

    // Clear state
    this._typeaheadBuffer = '';
    this._typeaheadTimeout = null;

    if (!searchString) {
      return;
    }

    const options = this._filteredOptions();
    const startIndex = this._virtualActiveIndex() ?? -1;

    // Search for prefix match first, starting from current position + 1
    let matchIndex = this._findTypeaheadMatch(options, searchString, startIndex, true);

    // Fallback to substring match if no prefix match found
    if (matchIndex === -1) {
      matchIndex = this._findTypeaheadMatch(options, searchString, startIndex, false);
    }

    if (matchIndex >= 0) {
      this.virtualViewport()?.scrollIntoView(matchIndex);
      this._virtualActiveIndex.set(matchIndex);
    }
  }

  /**
   * Find a typeahead match in the options list.
   * Searches starting from startIndex + 1 and wraps around.
   */
  private _findTypeaheadMatch(
    options: NxDropdownOption[],
    searchString: string,
    startIndex: number,
    prefixOnly: boolean,
  ): number {
    const len = options.length;

    // Start from next item after current, wrap around
    for (let i = 1; i <= len; i++) {
      const index = (startIndex + i) % len;
      const option = options[index];

      // Skip disabled items
      if (this._isOptionDisabled(option)) {
        continue;
      }

      const label = this._getLabel(option).toLocaleUpperCase().trim();

      if (prefixOnly) {
        if (label.indexOf(searchString) === 0) {
          return index;
        }
      } else if (label.includes(searchString)) {
        return index;
      }
    }

    return -1;
  }

  /** Check if an option is disabled */
  private _isOptionDisabled(option: NxDropdownOption): boolean {
    // Options passed via the options input don't have a disabled property
    // This is a safeguard for future extensibility
    return (option as any).disabled === true;
  }

  /** Handle filter changes in virtual scroll mode */
  _onVirtualFilter(query: string): void {
    this.filterChanges.next(query);

    // Reset active index when filter changes
    const options = this._filteredOptions();
    if (options.length > 0) {
      this._virtualActiveIndex.set(0);
      this.virtualViewport()?.scrollToIndex(0);
    } else {
      this._virtualActiveIndex.set(-1);
    }
  }

  /**
   * Callback that is invoked when the overlay panel has been attached.
   */
  _onAttached(): void {
    this.overlayDir.positionChange.pipe(take(1)).subscribe(() => {
      const overlayRef = this.overlayDir.overlayRef;
      const positionStrategy = overlayRef.getConfig()
        .positionStrategy as FlexibleConnectedPositionStrategy;

      overlayRef.updateSize({ maxWidth: this.panelMaxWidth() });
      this._updatePosition();
      positionStrategy.withPositions(this._positions);
      overlayRef.updatePosition();

      this._cdr.markForCheck();
      this.openedChange.emit(true);

      if (this.showFilter()) {
        this.filterInput?.nativeElement.focus();
      } else {
        this.panelBody?.nativeElement.focus();
      }
    });
  }

  _onFocus() {
    if (!this.disabled) {
      this._focused = true;
      this.stateChanges.next();
    }
  }

  /**
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  _onBlur() {
    this._focused = false;

    if (this.filterInput && this.showFilter()) {
      this._clearFilter();
    }

    if (!this.disabled && !this.panelOpen) {
      this._onTouched();
      this._cdr.markForCheck();
      this.focusOut.emit(true);
      this.stateChanges.next();
    }
  }

  /** @docs-private */
  get isFilterEmpty() {
    return this.filterValue.length === 0;
  }

  _clearFilter() {
    if (!this.filterInput) {
      return;
    }
    this.filterValue = '';
    this.filterChanges.next('');
  }

  /** Determines the `aria-activedescendant` to be set on the host. */
  _getAriaActiveDescendant(): string | null {
    if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
      return this._keyManager.activeItem.id;
    }

    return null;
  }

  private _tooltipUpdateTimeoutId: any;

  private _scheduleTooltipUpdate() {
    if (this._tooltipUpdateTimeoutId) {
      clearTimeout(this._tooltipUpdateTimeoutId);
    }
    this._tooltipUpdateTimeoutId = setTimeout(() => {
      this._tooltipUpdateTimeoutId = null;
      if (this._destroyed.closed) {
        return;
      }
      this._updateTooltipText();
    }, 0);
  }
}

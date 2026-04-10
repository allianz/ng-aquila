import { NxCheckboxModule } from '@allianz/ng-aquila/checkbox';
import type { AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxRadioIndicatorComponent } from '@allianz/ng-aquila/selection';
import { NxTooltipModule } from '@allianz/ng-aquila/tooltip';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { Highlightable } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkObserveContent } from '@angular/cdk/observers';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  afterRenderEffect,
  AfterViewChecked,
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Input,
  input,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxDropdownControl } from '../dropdown.control';
import { NxDropdownGroupComponent } from '../group/dropdown-group';

export class NxDropdownItemChange {
  constructor(
    /** Reference to the option that emitted the event. */
    readonly item: NxDropdownItemComponent,
    /** Whether the change in the option's value was a result of a user action. */
    readonly isUserInput = false,
  ) {}
}

@Component({
  selector: 'nx-dropdown-item',
  templateUrl: 'dropdown-item.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['dropdown-item.scss'],
  host: {
    role: 'option',
    '[class.nx-hidden]': '_hidden',
    '(click)': '_onClick($event)',
  },
  imports: [
    NgClass,
    NxCheckboxModule,
    NgTemplateOutlet,
    NxIconModule,
    NxTooltipModule,
    CdkObserveContent,
    NxRadioIndicatorComponent,
  ],
})
export class NxDropdownItemComponent
  implements Highlightable, OnDestroy, AfterViewChecked, AfterViewInit
{
  _hidden = false;

  private _mostRecentViewValue = '';

  /** Signal to track whether the projected content is empty. */
  protected readonly _contentEmpty = signal(false);

  private readonly _generatedId: string = inject(IdGenerationService).nextId('nx-dropdown-item');

  /** Optional ID input. If not provided, an auto-generated ID is used. */
  readonly idInput = input<string | undefined>(undefined, { alias: 'id' });

  /**
   * The value of the dropdown item.
   * You can't use undefined, null and '' (empty strings)
   * as they are sentinel values signalling empty data.
   */
  @Input() value: any;

  get label(): string {
    return this._mostRecentViewValue || this.viewValue;
  }

  /** The unique ID of the option. Returns the input ID if provided, otherwise auto-generated. */
  get id(): string {
    return this.idInput() ?? this._generatedId;
  }

  readonly idSignal = computed(() => this.idInput() ?? this._generatedId);

  protected readonly _disabled = signal(false);

  /** Whether the dropdown item is disabled. */
  @Input() set disabled(value: BooleanInput) {
    const newValue = coerceBooleanProperty(value);
    if (this._disabled() !== newValue) {
      this._disabled.set(newValue);
    }
  }

  get disabled(): boolean {
    return this._disabled();
  }

  protected readonly _selectedFromInteraction = signal(false);
  protected readonly _selected = computed(
    () => this._selectedFromInteraction() || this.selectedInput(),
  );

  /** Whether the item is selected. */
  get selected(): boolean {
    return this._selected();
  }

  /** Whether the item is selected (reactive input for virtual scroll). */
  readonly selectedInput = input(false, { alias: 'selected', transform: booleanAttribute });

  /** Whether the item is active (reactive input for virtual scroll). */
  readonly activeInput = input(false, { alias: 'active', transform: booleanAttribute });

  /** Internal active state set by setActiveStyles/setInactiveStyles. */
  private readonly _activeFromStyles = signal(false);

  /** Computed active state combining input and internal styles. */
  readonly isActive = computed(() => this._activeFromStyles() || this.activeInput());

  /**
   * Whether the parent dropdown is in multiselect mode.
   * @docs-private
   */
  get multiselect(): boolean {
    return this._dropdown?.isMultiSelect();
  }

  protected readonly multiSelectSignal = computed(() => this._dropdown?.isMultiSelect());

  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });

  protected readonly showRadioIndicator = computed(
    () => this._allianzOneOptions?.enabled?.() ?? false,
  );

  /** Emits whenever the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  /** Event emitted when the option is selected or deselected. */
  @Output() readonly onSelectionChange = new EventEmitter<NxDropdownItemChange>();

  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  /**
   * The wrapping div in the template. Used by dropdown to use the container height for scrolling.
   * @docs-private
   */
  @ViewChild('container', { static: true }) containerElement: any;

  /** Reference to the content element for checking emptiness. */
  @ViewChild('content', { static: false })
  private readonly contentElement!: ElementRef<HTMLElement>;
  private readonly _renderer = inject(Renderer2);

  constructor(
    @Inject(NxDropdownControl) private readonly _dropdown: NxDropdownControl,
    /** @docs-private */ @Optional() readonly group: NxDropdownGroupComponent | null,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _elementRef: ElementRef,
  ) {
    // workaround because of https://github.com/angular/angular/issues/67454
    // that added significant performance regressions when signals are read in host bindings
    // TODO: remove this workaround once the issue is resolved by Angular
    afterRenderEffect({
      write: () => {
        this._updateHostAttribute('id', this.idSignal());
        this._updateHostAttribute('tabindex', this._getTabIndex());
        this._updateHostAttribute('aria-disabled', this._disabled().toString());
        this._updateHostAttribute('aria-selected', this._getAriaSelected());
        this._updateClass('nx-dropdown-item--active', this.isActive());
        this._updateClass('nx-dropdown-item--disabled', this._disabled());
        this._updateClass('nx-selected', this._selected());
        this._updateClass('nx-multiselect', this.multiSelectSignal());
      },
    });

    this._dropdown.filterChanges.pipe(takeUntil(this._destroyed)).subscribe((value) => {
      this._showOrHideByFilter(value);
    });
    // reset the hidden state when dropdown closes that on next open the user is seeing the full list again
    this._dropdown._closedStream.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._hidden = false;
    });
  }

  private readonly _updateHostAttribute = (name: string, value: unknown) => {
    if (value == null) {
      this._renderer.removeAttribute(this._elementRef.nativeElement, name);
    } else {
      this._renderer.setAttribute(this._elementRef.nativeElement, name, value as string);
    }
  };

  private readonly _updateClass = (className: string, add: boolean) => {
    if (add) {
      this._renderer.addClass(this._elementRef.nativeElement, className);
    } else {
      this._renderer.removeClass(this._elementRef.nativeElement, className);
    }
  };

  ngAfterViewInit(): void {
    // Initialize content empty state after view is ready
    this._updateContentEmptyState();
  }

  ngAfterViewChecked(): void {
    // Since the parent dropdown component could be using the item's label to display the selected values
    // and it doesn't have a way of knowing if the item's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    this._updateViewValue();

    // Update content empty state during change detection to handle deferred content
    // that may arrive after async operations (e.g., async pipe)
    this._updateContentEmptyState();
  }

  private _updateViewValue() {
    if (this._selected()) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }
    }
  }

  private _updateContentEmptyState(): void {
    if (this.contentElement) {
      const isEmpty = this._isContentEmpty(this.contentElement.nativeElement);
      if (isEmpty !== this._contentEmpty()) {
        this._contentEmpty.set(isEmpty);
      }
    }
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this._stateChanges.complete();
  }

  _onClick(event: Event) {
    /* preventDefault to stop triggering the event twice when you click on the checkbox or the label inside the item */
    event.preventDefault();
    event.stopPropagation();
    this._selectViaInteraction();
  }

  /**
   * Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.
   */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      const nextSelected = this.multiselect ? !this._selectedFromInteraction() : true;
      this._selectedFromInteraction.set(nextSelected);
      this._updateViewValue();
      this._cdr.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /**
   * Gets the `aria-selected` value for the option.
   * For multiselect: returns true/false for all items
   * For single-select: returns true only for selected item, null for others
   * (Including aria-selected="false" on all unselected items adds noise for screen-reader users)
   * @docs-private
   */
  _getAriaSelected(): boolean | null {
    if (this.multiselect) {
      return this.selected;
    }
    return this.selected ? true : null;
  }

  /** @docs-private */
  show() {
    this._hidden = false;
    this._cdr.markForCheck();
  }

  /** @docs-private */
  hide() {
    this._hidden = true;
    this._cdr.markForCheck();
  }

  private _showOrHideByFilter(search: string) {
    const constraint = this._dropdown.filterFn(search, this.viewValue);
    this._hidden = !constraint;
    this._cdr.markForCheck();
  }

  get _formattedValue() {
    return this._dropdown.valueFormatter(this.value);
  }

  /** @docs-private */
  get viewValue() {
    return (this._elementRef.nativeElement.textContent || '').trim();
  }

  /** @docs-private */
  get elementRef() {
    return this._elementRef;
  }

  select() {
    if (!this._selectedFromInteraction() && !this.disabled) {
      this._selectedFromInteraction.set(true);
      this._emitSelectionChangeEvent();
    }
  }

  /** @docs-private */
  deselect() {
    if (this._selectedFromInteraction()) {
      this._selectedFromInteraction.set(false);
      this._emitSelectionChangeEvent();
    }
  }

  _initSelected(selected: boolean) {
    this._selectedFromInteraction.set(selected);
  }

  /** @docs-private */
  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  private _emitSelectionChangeEvent(isUserInput = false) {
    this.onSelectionChange.emit(new NxDropdownItemChange(this, isUserInput));
  }

  /** @docs-private */
  setActiveStyles(): void {
    this._activeFromStyles.set(true);
  }

  /** @docs-private */
  setInactiveStyles(): void {
    this._activeFromStyles.set(false);
  }

  /**
   * Returns the list item's text label. Implemented as a part of the ListKeyManagerOption.
   * @docs-private
   */
  getLabel(): string {
    return this.viewValue;
  }

  _isContentEmpty(element: Element) {
    return element.children.length === 0 && !element.textContent?.trim();
  }

  _onLabelChange() {
    // trigger change detection when the label content changes for the case that ng-content was empty before.
    // this is also important when the label comes in deferred, e.g. by a delayed observable,
    // then first the default label derived from the value is shown
    // and after the value from the async observable is ready we need to trigger change detection that the derived label
    // gets hidden again.
    // Notice(!): the event of (cdkObserveContent) is run outside of the ngZone
    // We run detectChanges directly here as markForCheck wasn't enough to always trigger change detection correctly
    this._updateContentEmptyState();
    this._cdr.detectChanges();
  }

  /** Returns the correct tabindex for the option depending on disabled state. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }
}

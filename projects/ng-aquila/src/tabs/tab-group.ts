import {
  NxAccordionDirective,
  NxAccordionModule,
  NxExpansionPanelComponent,
} from '@allianz/ng-aquila/accordion';
import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { ALLIANZ_ONE, AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { IdGenerationService, NxBreakpoints, NxViewportService } from '@allianz/ng-aquila/utils';
import { FocusMonitor, InteractivityChecker, LiveAnnouncer } from '@angular/cdk/a11y';
import {
  BooleanInput,
  coerceBooleanProperty,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChildren,
  effect,
  ElementRef,
  EventEmitter,
  Inject,
  inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxTabComponent } from './tab';
import { NxTabBodyComponent } from './tab-body';
import { NxTabGroupBase } from './tab-group-base';
import { NxTabHeaderComponent } from './tab-header';
import { NxTabHeaderOutletComponent } from './tab-header-outlet';
import { NxTabLabelWrapperDirective } from './tab-label-wrapper';
import { NxTabsAppearance, TAB_GROUP_DEFAULT_OPTIONS, TabGroupDefaultOptions } from './tabs.models';
import { NxTabsIntl } from './tabs-intl';

export class NxTabChangeEvent {
  /** The index of the selected or focused tab. */
  index!: number;

  /** The component instance of the selected or focused tab. */
  tab!: NxTabComponent;
}

@Component({
  selector: 'nx-tab-group',
  templateUrl: 'tab-group.html',
  styleUrls: ['./tab-group.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-negative]': 'negative',
    '[class.is-disabled]': 'disabled',
    '[class.is-expert]': 'appearance === "expert"',
  },
  providers: [{ provide: NxTabGroupBase, useExisting: NxTabGroupComponent }],
  imports: [
    NxTabHeaderComponent,
    NxTabLabelWrapperDirective,
    NxTabHeaderOutletComponent,
    NxTabBodyComponent,
    NxAccordionModule,
    NxPlainButtonComponent,
    NxIconComponent,
  ],
})
export class NxTabGroupComponent
  implements NxTabGroupBase, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked
{
  private _indexToSelect: number | null = 0;
  _showAccordion = false;

  /** @docs-private */
  @ContentChildren(NxTabComponent) tabs!: QueryList<NxTabComponent>;

  /** @docs-private */
  @ViewChildren(NxTabBodyComponent) tabBodyChildren!: QueryList<NxTabBodyComponent>;

  /** @docs-private */
  @ViewChild('tabHeader') tabHeader!: NxTabHeaderComponent;

  /** @docs-private */
  @ViewChildren(NxExpansionPanelComponent) panels!: QueryList<NxExpansionPanelComponent>;

  /** @docs-private */
  @ViewChild('accordion', { read: NxAccordionDirective }) accordion!: NxAccordionDirective;

  @ViewChildren('tabButton') _tabButtons!: QueryList<ElementRef>;

  /** Preserves the current value of the _tabButtons ViewChildren in case it changes. */
  private _tabButtonsPrevious!: QueryList<ElementRef>;

  /** Sets the selected tab. */
  @Input() set selectedIndex(value: NumberInput) {
    this._indexToSelect = coerceNumberProperty(value, null);
  }
  get selectedIndex(): number {
    return this._selectedIndex!;
  }
  private _selectedIndex: number | null = null;

  /** Whether the negative set of styling should be used. */
  @Input() set negative(value: BooleanInput) {
    if (value !== this._negative) {
      this._negative = coerceBooleanProperty(value);
      this._cdr.markForCheck();
    }
  }
  get negative(): boolean {
    return this._negative;
  }
  private _negative = false;

  /** Whether the tab group is disabled. Default: false. */
  @Input() set disabled(value: BooleanInput) {
    if (value !== this._disabled) {
      this._disabled = coerceBooleanProperty(value);
      this._cdr.markForCheck();
    }
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Whether the tab should be immediately selected on focus. */
  @Input() set autoselect(value: BooleanInput) {
    this._autoselect = coerceBooleanProperty(value);
  }
  get autoselect(): boolean {
    return this._autoselect;
  }
  private _autoselect = true;

  /**
   * Whether the tabs should to accordion on mobile viewports.
   * Under A1 the accordion is never shown, regardless of this input.
   */
  @Input() set mobileAccordion(value: BooleanInput) {
    this._mobileAccordion = coerceBooleanProperty(value);
  }
  get mobileAccordion(): boolean {
    return this._isA1() ? false : this._mobileAccordion;
  }
  private _mobileAccordion = true;

  /**
   * **Expert option**
   *
   * Sets the appearance of the tab group. Default: 'default'.
   */
  @Input() set appearance(value: NxTabsAppearance) {
    if (this._appearance !== value) {
      this._appearance = value;
      this._cdr.markForCheck();
    }
  }
  get appearance(): NxTabsAppearance {
    return this._appearance || this._defaultOptions?.appearance || 'default';
  }
  private _appearance!: NxTabsAppearance;

  /** An event emitted when the selected tab has changed. */
  @Output() readonly selectedIndexChange = new EventEmitter<number>();

  /** An event emitted when the selected tab has changed. */
  @Output() readonly selectedTabChange = new EventEmitter<NxTabChangeEvent>();

  /**
   * An event emitted when a closable tab is to be closed.
   */
  readonly tabClose = output<NxTabChangeEvent>();

  /**
   * An event emitted when focus has changed within a tab group.
   *
   * **Note:** is not supported in mobile view.
   */
  @Output() readonly focusChange = new EventEmitter<NxTabChangeEvent>();

  /** Subscription to changes in the tab labels. */
  private _tabLabelSubscription = Subscription.EMPTY;

  private _disabledTabsCache: boolean[] = [];

  /**
   * The tab instance last reported as active.
   */
  private _activeTab: NxTabComponent | null = null;

  /**
   * Index to focus once the tab list updates after a close.
   * `null` when no close is pending.
   */
  private _pendingFocusIndex: number | null = null;

  /**
   * The tab whose close was requested. Used to announce the close
   * once the consumer actually removes the tab.
   */
  private _pendingCloseTab: NxTabComponent | null = null;

  readonly _appearanceChange = new Subject<void>();

  private readonly _destroyed = new Subject<void>();

  private readonly _groupId = inject(IdGenerationService).nextId('');

  /** Provides localized strings for the tab group, e.g. the close button label. */
  readonly _intl = inject(NxTabsIntl);

  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly _interactivityChecker = inject(InteractivityChecker);

  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });
  private readonly _isA1 = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  /** Potentially focusable elements. Used to find candidates outside the tab group. */
  private static readonly _focusableSelector =
    'a[href], button, input, select, textarea, audio[controls], video[controls], details > summary, [contenteditable], [tabindex]';

  constructor(
    readonly viewportService: NxViewportService,
    private readonly _cdr: ChangeDetectorRef,
    @Optional()
    @Inject(TAB_GROUP_DEFAULT_OPTIONS)
    private readonly _defaultOptions: TabGroupDefaultOptions | null,
    private readonly _focusMonitor: FocusMonitor,
  ) {
    // Force the accordion off as soon as A1 becomes enabled, even if the group
    // is already showing it (e.g. the ALLIANZ_ONE signal flips at runtime).
    effect(() => {
      if (this._isA1() && this._showAccordion) {
        this._setShowAccordion(false);
      }
    });
  }

  ngAfterContentInit(): void {
    this._subscribeToTabLabels();

    // Re-render if the localized labels change after initialization.
    this._intl.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._cdr.markForCheck());

    // Subscribe to changes in the amount of tabs, in order to be
    // able to re-render the content as new tabs are added or removed.
    this.tabs.changes.pipe(takeUntil(this._destroyed)).subscribe(() => {
      const indexToSelect = this._clampTabIndex(this._indexToSelect);
      // Maintain the previously-selected tab if a new tab is added or removed and there is no
      // explicit change that selects a different tab.
      if (indexToSelect === this._selectedIndex) {
        const activeIndex = this._activeTab ? this.tabs.toArray().indexOf(this._activeTab) : -1;

        if (activeIndex > -1) {
          const indexShifted = activeIndex !== this._selectedIndex;

          // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
          // event, otherwise the consumer may end up in an infinite loop in some edge cases like
          // adding a tab within the `selectedIndexChange` event.
          this._indexToSelect = this._selectedIndex = activeIndex;

          // Emit index changed when the active tab is the same but moved to a new index (close the tab before an active tab)
          if (indexShifted) {
            Promise.resolve().then(() => this.selectedIndexChange.emit(activeIndex));
          }
        }
      }

      this._cdr.markForCheck();

      if (this._pendingCloseTab) {
        const closedTab = this._pendingCloseTab;
        const focusIndex = this._pendingFocusIndex;
        this._pendingCloseTab = null;
        this._pendingFocusIndex = null;

        // Only move focus and announce the close if the tab was actually removed from the group
        if (!this.tabs.toArray().includes(closedTab)) {
          // Move focus to the tab that took the closed one's place (or the new last tab),
          // falling back to the next focusable element after the group.
          if (focusIndex !== null) {
            Promise.resolve().then(() => {
              if (!this.tabHeader?.focusTab(focusIndex)) {
                this._focusNextAfterTabGroup();
              }
            });
          }
          this._liveAnnouncer.announce(this._intl.closeAnnouncement(closedTab.label));
        }
      }
    });
  }

  /**
   * After the content is checked, this component knows what tabs have been defined
   * and what the selected index should be.
   */
  ngAfterContentChecked(): void {
    // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
    // the amount of tabs changes before the actual change detection runs.
    let indexToSelect = (this._indexToSelect = this._clampTabIndex(this._indexToSelect));

    // If the active tab is disabled select the next focusable tab.
    // If none of the tabs are focusable, select none instead of leaving a
    // disabled tab marked as active.
    if (!this.disabled && this.tabs.length > 0 && this.tabs.toArray()[indexToSelect]?.disabled) {
      const nextFocusable = this.tabs
        .toArray()
        .map((tab, index) => ({ tab, index }))
        .find((item) => !item.tab.disabled);

      indexToSelect = nextFocusable ? nextFocusable.index : -1;
    }

    // If the index to select was disabled previously leave the selection on the current
    // so that the selection does not jump from one to another tab.
    if (this._disabledTabsCache[this._indexToSelect]) {
      this._indexToSelect = this.selectedIndex;
    }

    const targetTab = indexToSelect >= 0 ? (this.tabs.toArray()[indexToSelect] ?? null) : null;

    // Compare the target tab by identity, not just by index, so that closing the active tab is
    // detected even if another tab shifts into the same numeric index.
    const activeTabChanged = targetTab !== this._activeTab;
    const indexChanged = indexToSelect !== this._selectedIndex;

    // Should not trigger on the run where the selected index gets initialized.
    const isFirstRun = this._selectedIndex == null;

    // If the active tab identity changed, emit `selectedTabChange`.
    // `indexToSelect` is -1 when no tab is selectable anymore. There is no tab instance to
    // report then, so only `selectedIndexChange` announces the deselection.
    if (activeTabChanged) {
      if (!isFirstRun && indexToSelect >= 0) {
        this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
      }

      // Changing this value after change detection has run
      // since the checked content may contain references to it.
      Promise.resolve().then(() => {
        this.tabs.forEach((tab) => (tab.isActive = tab === targetTab));
      });
    }

    this._activeTab = targetTab;

    if (indexChanged) {
      if (!isFirstRun) {
        Promise.resolve().then(() => this.selectedIndexChange.emit(indexToSelect));
      }

      this._selectedIndex = indexToSelect;
      this._cdr.markForCheck();
    }

    // cache the previous disabled status of all tabs
    if (!this.disabled) {
      this.tabs.toArray().forEach((tab, index) => (this._disabledTabsCache[index] = tab.disabled));
    }
  }

  ngAfterViewInit(): void {
    // we need to make the subscription later, somewhere between rxjs 7.5.0 and 7.8.1 a change was made that
    // the value gets emitted before the input setters of the angular component got called and then
    // the tabs would show the mobile accordion even if the user did disable it.
    this.viewportService
      .max(NxBreakpoints.BREAKPOINT_MEDIUM)
      .pipe(takeUntil(this._destroyed))
      .subscribe((isSmallTablet) => {
        this._switchAppearance(isSmallTablet);
      });
    this._tabButtons.forEach((button) => this._focusMonitor.monitor(button));
    this._tabButtonsPrevious = this._tabButtons;
    this._tabButtons.changes.subscribe((tabButtons) => {
      this._tabButtonsPrevious.forEach((button) => this._focusMonitor.stopMonitoring(button));
      this._tabButtonsPrevious = tabButtons;
      tabButtons.forEach((button: HTMLElement) => this._focusMonitor.monitor(button));
    });
  }

  ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
    this._tabLabelSubscription.unsubscribe();
    this._tabButtons?.forEach((button) => {
      this._focusMonitor.stopMonitoring(button);
    });
  }

  /**
   * Subscribes to changes in the tab labels. This is needed, because the @Input for the label is
   * on the NxTab component, whereas the data binding is inside the NxTabGroup. In order for the
   * binding to be updated, we need to subscribe to changes in it and trigger change detection
   * manually.
   */
  private _subscribeToTabLabels() {
    if (this._tabLabelSubscription) {
      this._tabLabelSubscription.unsubscribe();
    }

    this._tabLabelSubscription = merge(...this.tabs.map((tab) => tab._stateChanges)).subscribe(() =>
      this._cdr.markForCheck(),
    );
  }

  /** Clamps the given index to the bounds of 0 and the tabs length. */
  private _clampTabIndex(index: number | null): number {
    // Note the `|| 0`, which ensures that values like NaN can't get through
    // and which would otherwise throw the component into an infinite loop
    // (since Math.max(NaN, 0) === NaN).
    return Math.min(this.tabs.length - 1, Math.max(index || 0, 0));
  }

  /** @docs-private */
  focusChanged(index: number) {
    this.focusChange.emit(this._createChangeEvent(index));
  }

  private _createChangeEvent(index: number): NxTabChangeEvent {
    const event = new NxTabChangeEvent();
    event.index = index;
    if (index >= 0 && this.tabs?.length) {
      event.tab = this.tabs.toArray()[index];
    }
    return event;
  }

  /** @docs-private */
  handleClick(index: number) {
    const clickedTab = this.tabs.toArray()[index];
    if (!this.disabled && !clickedTab.disabled) {
      this.selectedIndex = this.tabHeader.focusIndex = index;
    }
  }

  /**
   * Moves focus from a tab label onto its own close button when the user
   * presses TAB. Only the active tab can focus a closable button.
   */
  protected _focusCloseButton(index: number, event: Event) {
    const tab = this.tabs.toArray()[index];
    if (this.disabled || !tab || tab.disabled || !tab.closable()) {
      return;
    }

    const group = (event.target as HTMLElement).closest('.nx-tab-header__item-group');
    const closeButton = group?.querySelector<HTMLElement>('.nx-tab-header__close');
    if (closeButton) {
      event.preventDefault();
      closeButton.focus();
    }
  }

  /**
   * Moves focus back from a close button onto its own tab label when the user presses SHIFT+TAB.
   */
  protected _focusTabItem(index: number, event: Event) {
    event.preventDefault();
    this.tabHeader?.focusTab(index);
  }

  /**
   * Moves focus to the first focusable element that follows the tab group. Used when no tab can take focus anymore.
   */
  private _focusNextAfterTabGroup(): void {
    const host = this._elementRef.nativeElement;
    const candidates = host.ownerDocument.querySelectorAll<HTMLElement>(
      NxTabGroupComponent._focusableSelector,
    );

    for (const candidate of Array.from(candidates)) {
      const isAfterHost =
        // eslint-disable-next-line no-bitwise -- compareDocumentPosition returns a bitmask
        (host.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
      if (
        isAfterHost &&
        // Descendants also report FOLLOWING, so exclude them explicitly.
        !host.contains(candidate) &&
        // `isTabbable` assumes the element is already known to be focusable, so both are needed.
        this._interactivityChecker.isFocusable(candidate) &&
        this._interactivityChecker.isTabbable(candidate)
      ) {
        candidate.focus();
        return;
      }
    }
  }

  /**
   * Closes the tab at the given index by emitting the `tabClose` event.
   * The actual removal of the tab is left to the consumer.
   *
   * Focus is moved to the tab that takes the closed tab's place (or the new last tab)
   * once the consumer removes it.
   */
  protected _handleClose(index: number) {
    const tab = this.tabs.toArray()[index];
    if (this.disabled || !tab || tab.disabled || !tab.closable()) {
      return;
    }
    // Remember where to place focus and what to announce once the tab is actually removed.
    this._pendingFocusIndex = index;
    this._pendingCloseTab = tab;
    tab.closed.emit();
    this.tabClose.emit(this._createChangeEvent(index));
  }

  /**
   * Returns the tabindex for a tab label.
   * @docs-private
   */
  getTabIndex(tab: NxTabComponent, idx: number): number | null {
    return this.selectedIndex === idx && !tab.disabled && !this.disabled ? 0 : -1;
  }

  /** Returns a unique id for each tab label element */
  _getTabLabelId(i: number): string {
    return `nx-tab-label-${this._groupId}-${i}`;
  }

  /** Returns a unique id for each tab content element */
  _getTabContentId(i: number): string {
    return `nx-tab-content-${this._groupId}-${i}`;
  }

  private _switchAppearance(isSmallTablet: boolean) {
    if (!this.mobileAccordion) {
      return;
    }

    this._setShowAccordion(isSmallTablet);
  }

  private _setShowAccordion(showAccordion: boolean) {
    // trigger a change only when there is value difference
    // otherwise a switch is triggered by tablet <-> desktop change
    if (this._showAccordion !== showAccordion) {
      // notify the outlets to detach the viewrefs for header and body before
      // we switch the appearance. this way we only instantiate the templates
      // once so that they do not get destroyed during the switch
      this._appearanceChange.next();
      this._showAccordion = showAccordion;
      this._cdr.markForCheck();
    }
  }

  /**
   * Emulate the tab change event when an accordion panel is opened in
   * mobile viewports.
   */
  _panelOpened(index: number) {
    this.selectedIndex = index;
  }
}

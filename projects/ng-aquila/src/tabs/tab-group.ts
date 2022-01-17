import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { NxAccordionDirective, NxExpansionPanelComponent } from '@aposin/ng-aquila/accordion';
import { NxBreakpoints, NxViewportService } from '@aposin/ng-aquila/utils';
import { merge, Subject, Subscription } from 'rxjs';
import { NxTabComponent } from './tab';
import { NxTabBodyComponent } from './tab-body';
import { NxTabGroupBase } from './tab-group-base';
import { NxTabHeaderComponent } from './tab-header';
import { NxTabsAppearance, TabGroupDefaultOptions, TAB_GROUP_DEFAULT_OPTIONS } from './tabs.models';

export class NxTabChangeEvent {
    /** The index of the selected or focused tab. */
    index!: number;

    /** The component instance of the selected or focused tab. */
    tab!: NxTabComponent;
}

let nextId: number = 0;

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
})
export class NxTabGroupComponent implements NxTabGroupBase, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked {
    private _selectedIndex: number | null = null;
    private _groupId: number;
    private _negative: boolean = false;
    private _disabled: boolean = false;
    private _indexToSelect: number | null = 0;
    private _autoselect: boolean = true;
    private _mobileAccordion: boolean = true;
    private _appearance!: NxTabsAppearance;
    _showAccordion: boolean = false;

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
    @Input()
    get selectedIndex(): number {
        return this._selectedIndex as number;
    }
    set selectedIndex(value: NumberInput) {
        this._indexToSelect = coerceNumberProperty(value, null);
    }

    /** Whether the negative set of styling should be used. */
    @Input()
    get negative(): boolean {
        return this._negative;
    }
    set negative(value: BooleanInput) {
        if (value !== this._negative) {
            this._negative = coerceBooleanProperty(value);
            this._cdr.markForCheck();
        }
    }

    /** Whether the tab group is disabled. Default: false. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: BooleanInput) {
        if (value !== this._disabled) {
            this._disabled = coerceBooleanProperty(value);
            this._cdr.markForCheck();
        }
    }

    /** Whether the tab should be immediately selected on focus. */
    @Input()
    get autoselect(): boolean {
        return this._autoselect;
    }
    set autoselect(value: BooleanInput) {
        this._autoselect = coerceBooleanProperty(value);
    }

    /** Whether the tabs should to accordion on mobile viewports. */
    @Input()
    get mobileAccordion(): boolean {
        return this._mobileAccordion;
    }
    set mobileAccordion(value: BooleanInput) {
        this._mobileAccordion = coerceBooleanProperty(value);
    }

    /**
     * **Expert option**
     *
     * Sets the appearance of the tab group. Default: 'default'.
     */
    @Input()
    set appearance(value: NxTabsAppearance) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._cdr.markForCheck();
        }
    }
    get appearance(): NxTabsAppearance {
        return this._appearance || (this._defaultOptions && this._defaultOptions.appearance) || 'default';
    }

    /** An event emitted when the selected tab has changed. */
    @Output() readonly selectedIndexChange: EventEmitter<number> = new EventEmitter<number>();

    /** An event emitted when the selected tab has changed. */
    @Output() readonly selectedTabChange: EventEmitter<NxTabChangeEvent> = new EventEmitter<NxTabChangeEvent>();

    /**
     * An event emitted when focus has changed within a tab group.
     *
     * **Note:** is not supported in mobile view.
     */
    @Output() readonly focusChange: EventEmitter<NxTabChangeEvent> = new EventEmitter<NxTabChangeEvent>();

    /** Subscription to tabs being added/removed. */
    private _tabsSubscription = Subscription.EMPTY;

    /** Subscription to changes in the tab labels. */
    private _tabLabelSubscription = Subscription.EMPTY;

    /** Subscription to viewport changes. */
    private _viewportSubscription = Subscription.EMPTY;

    private _disabledTabsCache: boolean[] = [];

    _appearanceChange = new Subject<void>();

    constructor(
        public viewportService: NxViewportService,
        private _cdr: ChangeDetectorRef,
        @Optional() @Inject(TAB_GROUP_DEFAULT_OPTIONS) private _defaultOptions: TabGroupDefaultOptions,
        private _focusMonitor: FocusMonitor,
    ) {
        this._groupId = nextId++;

        this._viewportSubscription = this.viewportService
            .max(NxBreakpoints.BREAKPOINT_MEDIUM)
            .subscribe(isSmallTablet => this._switchAppearance(isSmallTablet));
    }

    ngAfterContentInit() {
        this._subscribeToTabLabels();

        // Subscribe to changes in the amount of tabs, in order to be
        // able to re-render the content as new tabs are added or removed.
        this._tabsSubscription = this.tabs.changes.subscribe(() => {
            const indexToSelect = this._clampTabIndex(this._indexToSelect);
            // Maintain the previously-selected tab if a new tab is added or removed and there is no
            // explicit change that selects a different tab.
            if (indexToSelect === this._selectedIndex) {
                const tabs = this.tabs.toArray();

                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].isActive) {
                        // Assign both to the `_indexToSelect` and `_selectedIndex` so we don't fire a changed
                        // event, otherwise the consumer may end up in an infinite loop in some edge cases like
                        // adding a tab within the `selectedIndexChange` event.
                        this._indexToSelect = this._selectedIndex = i;
                        break;
                    }
                }
            }

            this._cdr.markForCheck();
        });
    }

    /**
     * After the content is checked, this component knows what tabs have been defined
     * and what the selected index should be.
     */
    ngAfterContentChecked() {
        // Don't clamp the `indexToSelect` immediately in the setter because it can happen that
        // the amount of tabs changes before the actual change detection runs.
        let indexToSelect = (this._indexToSelect = this._clampTabIndex(this._indexToSelect));

        // If the active tab is disabled select the next focusable tab
        // if all tabs are disabled, allow selection of disabled active tab.
        if (!this.disabled && this.tabs.toArray()[indexToSelect].disabled) {
            const nextFocusable = this.tabs
                .toArray()
                .map((tab, index) => ({ tab, index }))
                .find(item => !item.tab.disabled);

            indexToSelect = nextFocusable ? nextFocusable.index : indexToSelect;
        }

        // If the index to select was disabled previously leave the selection on the current
        // so that the selection does not jump from one to another tab.
        if (this._disabledTabsCache[this._indexToSelect]) {
            this._indexToSelect = this.selectedIndex;
        }

        // If there is a change in selected index, emit a change event. Should not trigger if
        // the selected index has not yet been initialized.
        if (this._selectedIndex !== indexToSelect) {
            const isFirstRun = this._selectedIndex == null;

            if (!isFirstRun) {
                this.selectedTabChange.emit(this._createChangeEvent(indexToSelect));
            }

            // Changing these values after change detection has run
            // since the checked content may contain references to them.
            Promise.resolve().then(() => {
                this.tabs.forEach((tab, index) => (tab.isActive = index === indexToSelect));

                if (!isFirstRun) {
                    this.selectedIndexChange.emit(indexToSelect);
                }
            });
        }

        if (this._selectedIndex !== indexToSelect) {
            this._selectedIndex = indexToSelect;
            this._cdr.markForCheck();
        }

        // cache the previous disabled status of all tabs
        if (!this.disabled) {
            this.tabs.toArray().forEach((tab, index) => (this._disabledTabsCache[index] = tab.disabled));
        }
    }

    ngAfterViewInit() {
        this._tabButtons.forEach(button => this._focusMonitor.monitor(button));
        this._tabButtonsPrevious = this._tabButtons;
        this._tabButtons.changes.subscribe(tabButtons => {
            this._tabButtonsPrevious.forEach(button => this._focusMonitor.stopMonitoring(button));
            this._tabButtonsPrevious = tabButtons;
            tabButtons.forEach((button: HTMLElement) => this._focusMonitor.monitor(button));
        });
    }

    ngOnDestroy() {
        this._tabsSubscription.unsubscribe();
        this._tabLabelSubscription.unsubscribe();
        this._viewportSubscription.unsubscribe();
        this._tabButtons.forEach(button => {
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

        this._tabLabelSubscription = merge(...this.tabs.map(tab => tab._stateChanges)).subscribe(() => this._cdr.markForCheck());
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
        if (this.tabs && this.tabs.length) {
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
     * @docs-private
     * Returns the tabindex for a tab label
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
        if (!this._mobileAccordion) {
            return;
        }

        // trigger a change only when there is value difference
        // otherwise a switch is triggered by tablet <-> desktop change
        if (this._showAccordion !== isSmallTablet) {
            // notify the outlets to detach the viewrefs for header and body before
            // we switch the appearance. this way we only instantiate the templates
            // once so that they do not get destroyed during the switch
            this._appearanceChange.next();
            this._showAccordion = isSmallTablet;
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

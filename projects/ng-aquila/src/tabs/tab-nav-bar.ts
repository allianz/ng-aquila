import {
    Component,
    Input,
    Directive,
    ChangeDetectionStrategy,
    Optional,
    SkipSelf,
    ChangeDetectorRef,
    InjectionToken,
    Inject,
    ElementRef,
    OnDestroy,
    ViewChild,
    ContentChildren,
    QueryList,
    forwardRef,
} from '@angular/core';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { NxScrollableTabBar } from './scrollable-tab-bar';
import { Directionality } from '@angular/cdk/bidi';
import { NxTabsAppearance, TabNavBarDefaultOptions, TAB_NAV_BAR_DEFAULT_OPTIONS } from './tabs.models';

@Component({
    selector: 'nx-tab-nav-bar',
    templateUrl: 'tab-nav-bar.html',
    styleUrls: ['./tab-nav-bar.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-negative]': 'negative',
        '[class.is-disabled]': 'disabled',
        '[class.is-expert]': 'appearance === "expert"',
        role: 'navigation',
        '[class.at-start]': '_isScrolledToStart',
        '[class.scrollable]': 'scrollable',
    },
})
export class NxTabNavBarComponent extends NxScrollableTabBar {
    @ViewChild('tabsList') scrollableTabsList!: ElementRef<HTMLElement>;
    @ContentChildren(forwardRef(() => NxTabLinkDirective)) tabButtons!: QueryList<HTMLElement>;

    private _negative: boolean = false;

    /** Whether the tab nav bar has negative styling. */
    @Input()
    set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.negative) {
            this._negative = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }

    get negative(): boolean {
        return this._negative;
    }

    private _disabled: boolean = false;

    /** Whether the tab nav bar has disabled styling. */
    @Input()
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.disabled) {
            this._disabled = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }

    get disabled(): boolean {
        return this._disabled;
    }

    private _appearance!: NxTabsAppearance;

    /**
     * **Expert option**
     *
     * Sets the appearance of the tab nav bar. Default: 'default'.
     */
    @Input()
    set appearance(value: NxTabsAppearance) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get appearance(): NxTabsAppearance {
        return this._appearance || (this._defaultOptions && this._defaultOptions.appearance) || 'default';
    }

    constructor(
        public _changeDetectorRef: ChangeDetectorRef,
        _dir: Directionality,
        @Optional() @Inject(TAB_NAV_BAR_DEFAULT_OPTIONS) private _defaultOptions: TabNavBarDefaultOptions,
        _element: ElementRef,
    ) {
        super(_changeDetectorRef, _dir, _element);
    }
}

@Directive({
    selector: '[nxTabLink]',
    host: {
        '[class.nx-tab-link]': 'true',
        '[class.is-active]': 'active',
        '[class.is-disabled]': 'disabled',
        '[attr.aria-current]': 'active',
        '[attr.tabindex]': '_getTabIndex()',
        '[attr.aria-disabled]': 'disabled.toString()',
    },
})
export class NxTabLinkDirective implements OnDestroy {
    private _active: boolean = false;
    private _disabled: boolean = false;

    /** Whether the tab link is active and has the active styling. */
    @Input()
    get active(): boolean {
        return this._active;
    }
    set active(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._active) {
            this._active = newValue;
        }
    }

    /** Whether the tab link is disabled. Default: false. */
    @Input()
    get disabled(): boolean {
        return this._tabNavBar && this._tabNavBar.disabled ? this._tabNavBar.disabled : this._disabled;
    }
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }

    constructor(@Optional() @SkipSelf() private _tabNavBar: NxTabNavBarComponent, private _elementRef: ElementRef, private _focusMonitor: FocusMonitor) {
        if (!this._tabNavBar) {
            throw Error(`The nx-tab-link element has to be wrapped in a nx-tab-nav-bar to work.`);
        }

        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    _getTabIndex(): string {
        return this.disabled ? '-1' : '0';
    }
}

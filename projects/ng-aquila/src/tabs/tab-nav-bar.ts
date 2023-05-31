import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    forwardRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    SkipSelf,
    ViewChild,
} from '@angular/core';
import { NxViewportService } from '@aposin/ng-aquila/utils';

import { NxScrollableTabBar } from './scrollable-tab-bar';
import { NxTabsAppearance, TAB_NAV_BAR_DEFAULT_OPTIONS, TabNavBarDefaultOptions } from './tabs.models';

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

    /** Whether the tab nav bar has negative styling. */
    @Input() set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.negative) {
            this._negative = newValue;
            this._cdr.markForCheck();
        }
    }
    get negative(): boolean {
        return this._negative;
    }
    private _negative = false;

    /** Whether the tab nav bar has disabled styling. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.disabled) {
            this._disabled = newValue;
            this._cdr.markForCheck();
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /**
     * **Expert option**
     *
     * Sets the appearance of the tab nav bar. Default: 'default'.
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

    constructor(
        _cdr: ChangeDetectorRef,
        @Optional() _dir: Directionality | null,
        @Optional() @Inject(TAB_NAV_BAR_DEFAULT_OPTIONS) private readonly _defaultOptions: TabNavBarDefaultOptions | null,
        _element: ElementRef,
        viewportService: NxViewportService,
    ) {
        super(_cdr, _dir, _element, viewportService);
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
    /** Whether the tab link is active and has the active styling. */
    @Input() set active(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._active) {
            this._active = newValue;
        }
    }
    get active(): boolean {
        return this._active;
    }
    private _active = false;

    /** Whether the tab link is disabled. Default: false. */
    @Input() set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this._disabled) {
            this._disabled = newValue;
        }
    }
    get disabled(): boolean {
        return this._tabNavBar?.disabled || this._disabled;
    }
    private _disabled = false;

    constructor(
        @Optional() @SkipSelf() private readonly _tabNavBar: NxTabNavBarComponent | null,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        if (!this._tabNavBar) {
            throw Error(`The nx-tab-link element has to be wrapped in a nx-tab-nav-bar to work.`);
        }

        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    _getTabIndex(): string {
        return this.disabled ? '-1' : '0';
    }
}

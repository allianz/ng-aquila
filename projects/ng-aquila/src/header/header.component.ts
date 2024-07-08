import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Directive, ElementRef, Input, OnDestroy, QueryList } from '@angular/core';

/** This directive defines a header row within the `<nx-header>` component. */
@Directive({
    selector: 'nx-header-row',
    exportAs: 'NxHeaderRow',
    host: {
        class: 'nx-header__row',
    },
    standalone: true,
})
export class NxHeaderRowDirective {}

/** The `<nx-header>` component is the main application header. */
@Component({
    templateUrl: './header.component.html',
    styleUrls: ['header.scss'],
    selector: 'nx-header, [nx-header]',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'nx-header',
        '[class.nx-header--single-row]': '_headerRows.length === 0',
    },
    standalone: true,
})
export class NxHeaderComponent {
    @ContentChildren(NxHeaderRowDirective) _headerRows!: QueryList<NxHeaderRowDirective>;
}

/** This directive defines the header brand section within the `<nx-header>` component. */
@Directive({
    selector: 'nx-header-brand',
    exportAs: 'NxHeaderBrand',
    host: {
        class: 'nx-header__brand',
    },
    standalone: true,
})
export class NxHeaderBrandDirective {}

/** This directive defines the header actions section within the `<nx-header>` component. */
@Directive({
    selector: 'nx-header-actions',
    exportAs: 'NxHeaderActions',
    host: {
        class: 'nx-header__actions',
        '[class.nx-header__actions--show-separator]': 'showSeparator',
    },
    standalone: true,
})
export class NxHeaderActionsDirective {
    /* Whenever to show the left separator*/
    @Input() set showSeparator(value: BooleanInput) {
        this._showSeparator = coerceBooleanProperty(value);
    }
    get showSeparator(): boolean {
        return this._showSeparator;
    }
    private _showSeparator = false;
}

/** This component defines the header navigation section within the `<nx-header>` component. */
@Component({
    selector: 'nx-header-navigation',
    exportAs: 'NxHeaderNavigation',
    styleUrls: ['./header-navigation.scss'],
    host: {
        class: 'nx-header__navigation',
        role: 'navigation',
    },
    template: '<div role="list" class="nx-header__navigation-items"><ng-content></ng-content></div>',
    standalone: true,
})
export class NxHeaderNavigationComponent {}

/** This directive defines a header navigation item within the `<nx-header-navigation>`. */
@Directive({
    selector: 'nx-header-navigation-item',
    exportAs: 'NxHeaderNavigation',
    host: {
        role: 'listitem',
        class: 'nx-header__navigation-item',
    },
    standalone: true,
})
export class NxHeaderNavigationItemDirective {}

/** This component defines a header link within the `<nx-header>` component. */
@Component({
    selector: 'a[nxHeaderLink]',
    exportAs: 'NxHeaderLink',
    host: {
        class: 'nx-header__link',
        '[attr.text-content]': 'textContent',
    },
    template: '<span class="nx-header__link-title"><ng-content></ng-content></span>',
    standalone: true,
})
export class NxHeaderLinkComponent implements OnDestroy, AfterViewInit {
    constructor(
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    get textContent(): string {
        return this._elementRef.nativeElement.textContent;
    }
}

/** This directive defines the application title within the `<nx-header>` component. */
@Directive({
    selector: 'nx-header-app-title',
    exportAs: 'NxHeaderAppTitle',
    host: {
        class: 'nx-header__app-title',
    },
    standalone: true,
})
export class NxHeaderAppTitleDirective {}

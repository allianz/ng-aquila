import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Host, OnDestroy } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { nxAccordionAnimations } from './accordion-animations';
import { NxExpansionPanelComponent } from './expansion-panel';

@Component({
    selector: 'nx-expansion-panel-header',
    templateUrl: 'expansion-panel-header.html',
    styleUrls: ['expansion-panel-header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [nxAccordionAnimations.indicatorRotate],
    host: {
        '[class.nx-expanded]': 'isExpanded()',
        class: 'nx-expansion-panel__header',
        role: 'button',
        '[attr.id]': 'panel._headerId',
        '[attr.tabindex]': 'panel.disabled ? -1 : 0',
        '[attr.aria-controls]': '_getPanelId()',
        '[attr.aria-expanded]': 'isExpanded()',
        '[attr.aria-disabled]': 'panel.disabled',
        '[class.is-disabled]': 'panel.disabled',
        '(keydown)': 'keydown($event)',
        '(click)': 'toggle()',
    },
})
export class NxExpansionPanelHeaderComponent implements OnDestroy {
    private readonly _destroyed = new Subject<void>();

    constructor(
        /** @docs-private */ @Host() readonly panel: NxExpansionPanelComponent,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        merge(panel.opened, panel.closed, panel._inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled))))
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._cdr.markForCheck());

        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    /** @docs-private */
    isExpanded(): boolean {
        return this.panel.expanded;
    }

    /** @docs-private */
    getOpenState(): string {
        return this.panel.getOpenState();
    }

    _getPanelId(): string {
        return this.panel.id;
    }

    /**
     * Toggle the expansion panel.
     */
    toggle() {
        this.panel.toggle();
    }

    /** @docs-private */
    keydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case SPACE:
            case ENTER:
                event.preventDefault();
                this.toggle();
                break;
            default:
        }
    }
}

/**
 * This directive is to be used inside of the NxExpansionPanelHeader component.
 */
@Directive({
    selector: 'nx-expansion-panel-description',
    host: {
        class: 'nx-expansion-panel__header-description',
    },
})
export class NxExpansionPanelDescriptionDirective {}

/**
 * This directive is to be used inside of the NxExpansionPanelHeader component.
 */
@Directive({
    selector: 'nx-expansion-panel-title',
    host: {
        class: 'nx-expansion-panel__header-title',
    },
})
export class NxExpansionPanelTitleDirective {}

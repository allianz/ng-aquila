import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, ElementRef, Host, OnDestroy } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
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
    private _parentChangeSubscription = Subscription.EMPTY;

    constructor(
        /** @docs-private */ @Host() public panel: NxExpansionPanelComponent,
        private _cdr: ChangeDetectorRef,
        private _elementRef: ElementRef,
        private _focusMonitor: FocusMonitor,
    ) {
        this._parentChangeSubscription = merge(
            panel.opened,
            panel.closed,
            panel._inputChanges.pipe(filter(changes => !!(changes.hideToggle || changes.disabled))),
        ).subscribe(() => this._cdr.markForCheck());

        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnDestroy() {
        this._parentChangeSubscription.unsubscribe();
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

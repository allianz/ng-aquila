import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { TooltipPosition } from './tooltip.directive';
import { nxTooltipAnimations } from './tooltip-animations';

type TooltipVisibility = 'initial' | 'visible' | 'hidden';

/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
@Component({
    selector: 'nx-tooltip-component',
    templateUrl: 'tooltip.component.html',
    styleUrls: ['tooltip.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [nxTooltipAnimations.tooltipState],
    host: {
        // Forces the element to have a layout in IE and Edge. This fixes issues where the element
        // won't be rendered if the aninxions are disabled or there is no web aninxions polyfill.
        '[style.zoom]': 'visibility === "visible" ? 1 : null',
        '(body:click)': 'this._handleBodyInteraction()',
        'aria-hidden': 'true',
    },
})
export class NxTooltipComponent implements OnDestroy {
    /** The timeout ID of any current timer set to show the tooltip */
    private _showTimeoutId: number | null = null;

    /** The timeout ID of any current timer set to hide the tooltip */
    private _hideTimeoutId: number | null = null;

    /** Message to display in the tooltip */
    private _message!: string;

    set message(value: string) {
        this._message = value;
        this._cdr.markForCheck();
    }
    get message(): string {
        return this._message;
    }

    private _visibility: TooltipVisibility = 'initial';

    /** Property watched by the animation framework to show or hide the tooltip */
    get visibility(): TooltipVisibility {
        return this._visibility;
    }

    private _position: TooltipPosition = 'bottom';

    /** @docs-private */
    set position(value: TooltipPosition) {
        this._position = value;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    get position() {
        return this._position;
    }

    _arrowStyle: { [key: string]: string } = {};

    /** @docs-private */
    set arrowStyle(value) {
        this._arrowStyle = value;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    get arrowStyle() {
        return this._arrowStyle;
    }

    /** @docs-private */
    get arrowClass(): string {
        return `nx-tooltip__arrow--${this.position}`;
    }

    /** Whether interactions on the page should close the tooltip */
    private _closeOnInteraction = false;

    /** Subject for notifying that the tooltip has been hidden from the view */
    private readonly _onHide = new Subject<any>();

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        readonly elementRef: ElementRef,
    ) {}

    /**
     * Shows the tooltip with an aninxion originating from the provided origin
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(delay: number): void {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
            this._hideTimeoutId = null;
        }

        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._showTimeoutId = window.setTimeout(() => {
            this._visibility = 'visible';
            this._showTimeoutId = null;

            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._cdr.markForCheck();
        }, delay);
    }

    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay: number): void {
        if (this._hideTimeoutId) {
            return;
        }

        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
            this._showTimeoutId = null;
        }

        this._hideTimeoutId = window.setTimeout(() => {
            this._visibility = 'hidden';
            this._hideTimeoutId = null;

            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._cdr.markForCheck();
        }, delay);
    }

    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden(): Observable<void> {
        return this._onHide.asObservable();
    }

    /** Whether the tooltip is being displayed. */
    isVisible(): boolean {
        return this.visibility === 'visible';
    }

    /** Whether the tooltip started a delay to be shown/hidden */
    isDelayed(): boolean {
        return this._showTimeoutId !== null || this._hideTimeoutId !== null;
    }

    ngOnDestroy(): void {
        this._onHide.complete();
    }

    _animationStart() {
        this._closeOnInteraction = false;
    }

    _animationDone(event: AnimationEvent): void {
        const toState = event.toState as TooltipVisibility;

        if (toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }

        if (toState === 'visible' || toState === 'hidden') {
            this._closeOnInteraction = true;
        }
    }

    /**
     * Interactions on the HTML body should close the tooltip immediately.
     */
    _handleBodyInteraction(): void {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
}

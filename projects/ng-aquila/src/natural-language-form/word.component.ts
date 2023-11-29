import { ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EmbeddedViewRef,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { NxDropdownComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldControl, NxFormfieldErrorDirective } from '@aposin/ng-aquila/formfield';
import { NxPopoverComponent } from '@aposin/ng-aquila/popover';
import { getFontShorthand } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

/** Type to determine the minimal width of a word. */
export type SIZES = 'regular' | 'short' | 'long';

@Component({
    selector: 'nx-word',
    templateUrl: 'word.component.html',
    styleUrls: ['word.component.scss'],
    host: {
        '[class.size-short]': 'size == "short"',
        '[class.size-regular]': 'size == "regular"',
        '[class.size-long]': 'size == "long"',
        '[class.has-error]': '_hasErrors',
        '[class.is-focused]': 'isFocused',
        '[class.is-filled]': 'isFilled',
        '[class.has-dropdown]': 'hasDropdown',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxWordComponent implements AfterContentInit, OnDestroy, OnInit {
    private measureCanvas!: HTMLCanvasElement;

    /** @docs-private */
    readonly inputChanges = new Subject<any>();

    _hasErrors = false;
    private _overlayRef!: OverlayRef;
    private _embeddedViewRef!: EmbeddedViewRef<any>;
    private _overlayState!: OverlayConfig;

    @ContentChild(NxFormfieldControl) _control!: NxFormfieldControl<any>;
    @ContentChildren(NxFormfieldErrorDirective) _errorChildren!: QueryList<NxFormfieldErrorDirective>;
    @ViewChild('popover', { static: true }) _popover!: NxPopoverComponent;
    @ContentChild(NxDropdownComponent) _dropdown!: NxDropdownComponent;

    /** @docs-private */
    @HostBinding('style.width.px') currentTextWidth = 0;

    // this will apply different min-widths to our component through our styles
    /** Provide a hint for a minimal width. The actual size will be determined for inputs for each change. */
    @Input() size: SIZES = 'regular';

    /**
     * A word doesn't have a set place to show labels.
     * In order to be accessible, you have to provide a label with this property.
     * It will be attached to the given input through `aria-label`.
     */
    @Input('label') label = '';

    private readonly _destroyed = new Subject<void>();

    constructor(
        /** @docs-private */ readonly elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        private readonly _overlay: Overlay,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _overlayPositionBuilder: OverlayPositionBuilder,
    ) {}

    ngOnInit(): void {
        this.setupErrorPopover();
    }

    ngAfterContentInit(): void {
        this._validateControlChild();
        this._control.stateChanges.pipe(startWith(null), takeUntil(this._destroyed)).subscribe(() => {
            this._hasErrors = this._control.errorState;
            this.updateErrorPopoverState();
            this._cdr.markForCheck();
        });

        // if we have a ngcontrol available stick to its valueChanges subject
        if (this._control.ngControl) {
            this._control.ngControl.valueChanges!.pipe(takeUntil(this._destroyed)).subscribe(value => {
                this.updateCurrentTextWidth();
                this.inputChanges.next();
            });
            // in any other case it is a bre input and input changes are signaled through simple state changes
        } else {
            this._control.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(value => {
                this.updateCurrentTextWidth();
                this.inputChanges.next();
            });
        }

        this._control.setAriaLabel!(this.label);
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();

        if (this._overlayRef) {
            this._overlayRef.dispose();
        }
    }

    /**
     * Calculate the width of the full text given by the input, that value is bound to this component so it can grow.
     *
     * The involved input is known to have a width of 100% an will fit the additional space given which completes the auto growing behavior.
     * @docs-private
     */
    updateCurrentTextWidth() {
        // provide the canvas only lazy
        if (!this.measureCanvas) {
            this.measureCanvas = this._renderer.createElement('canvas');
        }

        const ctx = this.measureCanvas.getContext('2d');
        if (!ctx) {
            return;
        }
        const inputRef = this._control.elementRef;
        const styles = window.getComputedStyle(inputRef.nativeElement);
        ctx!.font = getFontShorthand(styles);

        const metrics = ctx!.measureText(this._control.value);
        // add 1px (cursor width) to prevent jumping of the text on blur.
        const newWidth = metrics.width + parseInt(styles.paddingRight, 10) + parseInt(styles.paddingLeft, 10) + 1;

        // This should be injected via @Host to get an exact reference to NxNaturalLanguageFormComponent
        // Works as promised as long as there is not other tag around the word. Not expected but possible.
        const parent: HTMLElement = this.elementRef.nativeElement.parentElement;
        const parentMeasurement = parent.getBoundingClientRect();

        // Limit to own given minimal width
        this.currentTextWidth = Math.max(parseInt(styles.minWidth, 10), newWidth);

        // Limit to container width
        this.currentTextWidth = Math.min(this.currentTextWidth, parentMeasurement.width);

        if (this._overlayRef.hasAttached()) {
            this._overlayState.positionStrategy!.apply();
        }
    }

    /** @docs-private */
    repositionError() {
        if (this._overlayRef.hasAttached()) {
            this._overlayState.positionStrategy!.apply();
        }
    }

    // Fail if the required control is missing.
    protected _validateControlChild() {
        if (!this._control) {
            throw new Error('NxWordComponent requires an NxFormfieldControl compatible input.');
        }
    }

    /** @docs-private */
    getConnectedOverlayOrigin(): ElementRef {
        return this.elementRef;
    }

    /** @docs-private */
    get isFocused(): boolean {
        return this._control.focused;
    }

    /** @docs-private */
    get isFilled(): boolean {
        return !this._control.empty;
    }

    /** @docs-private */
    get hasDropdown(): boolean {
        return Boolean(this._dropdown);
    }

    updateErrorPopoverState() {
        if (this._hasErrors && this._errorChildren.length > 0) {
            this.showPopover();
        } else {
            this.hidePopover();
        }
    }

    setupErrorPopover() {
        const positionStrategy = this._overlayPositionBuilder
            .flexibleConnectedTo(this.elementRef)
            .withLockedPosition(true)
            .withFlexibleDimensions(false)
            .withPush(true)
            .withPositions([
                {
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'center',
                    overlayY: 'bottom',
                },
                {
                    originX: 'center',
                    originY: 'bottom',
                    overlayX: 'center',
                    overlayY: 'top',
                },
            ])
            .withDefaultOffsetY(-8);

        this._overlayState = new OverlayConfig();
        this._overlayState.positionStrategy = positionStrategy;
        this._overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();
        this._overlayRef = this._overlay.create(this._overlayState);

        (this._overlayState.positionStrategy as FlexibleConnectedPositionStrategy).positionChanges.pipe(takeUntil(this._destroyed)).subscribe(change => {
            const pair = change.connectionPair;
            this.positionArrow(pair);

            // These position changes arrive too late,
            // We have to trigger the change detection manually
            // as it's detached from any render hierarchy
            // and only updated by the overlay when attached.
            if (this._embeddedViewRef && !this._embeddedViewRef.destroyed) {
                this._embeddedViewRef.detectChanges();
            }
        });
    }

    private positionArrow(pair: ConnectionPositionPair) {
        const parentElementPositionX = this.elementRef.nativeElement.getBoundingClientRect().left;
        const parentElementWidth = this.elementRef.nativeElement.getBoundingClientRect().width / 2;
        const parentElementLeftOffset = this._overlayRef.overlayElement.parentElement!.offsetLeft;
        const overlayElementLeftOffset = this._overlayRef.overlayElement.offsetLeft;

        // calculation for x position of the parent element. In this case, overlay left offset is the one thing to consider.
        const targetPosition = parentElementPositionX + parentElementWidth - (parentElementLeftOffset + overlayElementLeftOffset);

        if (pair.originY === 'top' && pair.overlayY === 'bottom') {
            this._popover.direction = 'top';
        } else {
            this._popover.direction = 'bottom';
        }

        this._popover.arrowStyle = { left: targetPosition + 'px' };
    }

    showPopover() {
        if (!this._overlayRef.hasAttached()) {
            const tooltipPortal = new TemplatePortal(this._popover.templateRef, this._viewContainerRef);
            this._embeddedViewRef = this._overlayRef.attach(tooltipPortal);
        }
    }

    hidePopover() {
        this._overlayRef.detach();
    }
}

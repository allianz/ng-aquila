import { ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayPositionBuilder, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    ContentChild,
    contentChild,
    contentChildren,
    effect,
    ElementRef,
    EmbeddedViewRef,
    HostBinding,
    Input,
    input,
    OnDestroy,
    OnInit,
    Renderer2,
    signal,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { NxDropdownComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldControl, NxFormfieldErrorDirective } from '@aposin/ng-aquila/formfield';
import { NxPopoverComponent, NxPopoverModule } from '@aposin/ng-aquila/popover';
import { getFontShorthand } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NaturalLanguageFormErrorWrapper } from './natural-language-form-error-wrapper';

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
        '[class.has-error]': '_hasErrors()',
        '[class.is-focused]': 'isFocused',
        '[class.is-filled]': 'isFilled',
        '[class.has-dropdown]': 'hasDropdown',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NxPopoverModule],
})
export class NxWordComponent implements AfterContentInit, OnDestroy, OnInit {
    private static _labelKey = 0;
    protected labelId = `nx-word-label-${NxWordComponent._labelKey++}`;
    private measureCanvas!: HTMLCanvasElement;

    /** @docs-private */
    readonly inputChanges = new Subject<void>();

    /** @docs-private */
    readonly _hasErrors = signal(false);
    private _overlayRef?: OverlayRef;
    private _embeddedViewRef?: EmbeddedViewRef<any>;
    private _overlayState!: OverlayConfig;

    /**
     * @docs-private
     * Used by the autocomplete and should be moved to signals entirely
     */
    @ContentChild(NxFormfieldControl) _control!: NxFormfieldControl<any>;
    protected readonly control = contentChild.required(NxFormfieldControl);

    /**
     * @docs-private
     * We should not set `for` and also use `aria-labelledby` at the same time.
     * For some components that automatically render label and connect it to the input, this will cause issues otherwise.
     * This is a workaround for the issue that we cannot set `aria-labelledby` on the input directly and to not introduce breaking changes.
     */
    private readonly _setAriaLabelledBy = effect(() => {
        const control = this.control() as any;

        // if aria-labelledby is set, add the word label to the list
        if (control.ariaLabelledBy !== null && control.ariaLabelledBy !== undefined) {
            control.ariaLabelledBy = `${this.labelId} ${control.ariaLabelledBy}`;
        }

        // if no aria-labelledby is set, we set it to the word label
        if (control.ariaLabelledBy === null) {
            control.ariaLabelledBy = this.labelId;
        }
    });

    private readonly _errorChildren = contentChildren(NxFormfieldErrorDirective);
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

    /**
     * Sets the `aria-describedby` for the formfield.
     * Should be used to refer to the individual error message.
     *
     * If not set it will be set to the id of the entire error message or the error message inside the nx-word (deprecated)
     *
     * Should be space seperated list of `id`s.
     */
    describedByInput = input<string | undefined>(undefined, { alias: 'describedBy' });
    describedBy = computed<string[]>(() => {
        // fallback to nlfError if describedBy is not set
        const useNaturalLanguageFormDescribedBy = this.describedByInput() === undefined && this._nlfErrorWrapper._errorId() !== undefined;
        const nlfError = useNaturalLanguageFormDescribedBy ? this._nlfErrorWrapper._errorId() : undefined;

        // fallback to the error children inside nx-word that is shown in the popover (deprecated)
        const errorChildren = this._errorChildren()?.map(error => error.id);

        // ignore any undefined and null values
        return [nlfError, ...errorChildren, this.describedByInput()].filter((id): id is string => id != null);
    });
    describedByEffect = effect(() => {
        this.control().setDescribedByIds(this.describedBy());
    });

    private readonly _destroyed = new Subject<void>();

    constructor(
        /** @docs-private */ readonly elementRef: ElementRef,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _renderer: Renderer2,
        private readonly _overlay: Overlay,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _overlayPositionBuilder: OverlayPositionBuilder,
        private readonly _nlfErrorWrapper: NaturalLanguageFormErrorWrapper,
    ) {}

    ngOnInit(): void {
        this.setupErrorPopover();
    }

    ngAfterContentInit(): void {
        this.control()
            .stateChanges.pipe(startWith(null), takeUntil(this._destroyed))
            .subscribe(() => {
                this._hasErrors.set(this.control().errorState);
                this.updateErrorPopoverState();
                this._cdr.markForCheck();
            });

        this.control()
            .stateChanges.pipe(takeUntil(this._destroyed))
            .subscribe(value => {
                this.updateCurrentTextWidth();
                this.inputChanges.next();
            });
    }

    private readonly _updatePopoverStateEffect = effect(() => {
        this._errorChildren();
        this.updateErrorPopoverState();
    });

    ngOnDestroy(): void {
        this._updatePopoverStateEffect.destroy();
        this._setAriaLabelledBy.destroy();

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

        const inputRef = this.control().elementRef;
        const styles = window.getComputedStyle(inputRef.nativeElement);
        ctx!.font = getFontShorthand(styles);

        const metrics = ctx!.measureText(inputRef.nativeElement.value);

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

        if (this._overlayRef?.hasAttached()) {
            this._overlayState.positionStrategy!.apply();
        }
    }

    /** @docs-private */
    repositionError() {
        if (this._overlayRef?.hasAttached()) {
            this._overlayState.positionStrategy!.apply();
        }
    }

    /** @docs-private */
    getConnectedOverlayOrigin(): ElementRef {
        return this.elementRef;
    }

    /** @docs-private */
    get isFocused(): boolean {
        return this.control().focused;
    }

    /** @docs-private */
    get isFilled(): boolean {
        return !this.control().empty;
    }

    /** @docs-private */
    get hasDropdown(): boolean {
        return Boolean(this._dropdown);
    }

    updateErrorPopoverState() {
        if (this._hasErrors() && this._errorChildren().length > 0) {
            this.showPopover();
        } else {
            this.hidePopover();
        }
    }

    setupErrorPopover() {
        // error popovers should not be focusable because they will be read via aria-describedby
        this._popover.triggerType = 'manual';
        this._popover.tabIndex = null;

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
        if (this._overlayRef) {
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
    }

    showPopover() {
        if (!this._overlayRef?.hasAttached()) {
            const tooltipPortal = new TemplatePortal(this._popover.templateRef, this._viewContainerRef);
            this._embeddedViewRef = this._overlayRef?.attach(tooltipPortal);
        }
    }

    hidePopover() {
        this._overlayRef?.detach();
    }
}

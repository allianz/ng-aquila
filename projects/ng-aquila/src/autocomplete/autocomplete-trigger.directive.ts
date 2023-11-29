import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef, PositionStrategy, ScrollStrategy, ViewportRuler } from '@angular/cdk/overlay';
import { _getEventTarget } from '@angular/cdk/platform';
import { TemplatePortal } from '@angular/cdk/portal';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    forwardRef,
    Host,
    Inject,
    InjectionToken,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    ViewContainerRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxWordComponent } from '@aposin/ng-aquila/natural-language-form';
import { defer, fromEvent, merge, Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, delay, filter, first, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { NxAutocompleteComponent } from './autocomplete.component';
import { NxAutocompleteOptionComponent, NxAutocompleteOptionSelected } from './autocomplete-option.component';
/**
 * Provider that allows the autocomplete to register as a ControlValueAccessor.
 * @docs-private
 */
export const NX_AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NxAutocompleteTriggerDirective),
    multi: true,
};

/** Injection token that determines the scroll handling while an autocomplete is open. */
export const NX_AUTOCOMPLETE_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>('nx-autocomplete-scroll-strategy');

/** @docs-private */
export function NX_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NX_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER = {
    provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY,
    useFactory: NX_AUTOCOMPLETE_SCROLL_STRATEGY_PROVIDER_FACTORY,
    deps: [Overlay],
};

/**
 * Creates an error to be thrown when attempting to use an autocomplete trigger without a panel.
 */
export function getNxAutocompleteMissingPanelError(): Error {
    return Error(
        'Attempting to open an undefined instance of `nx-autocomplete`. ' +
            'Make sure that the id passed to the `nxAutocomplete` is correct and that ' +
            "you're attempting to open it after the ngAfterContentInit hook.",
    );
}

@Directive({
    selector: `input[nxAutocomplete], textarea[nxAutocomplete]`,
    host: {
        role: 'combobox',
        autocomplete: 'off',
        'aria-autocomplete': 'list',
        '[attr.aria-activedescendant]': 'activeOption?.id',
        '[attr.aria-expanded]': 'panelOpen.toString()',
        '[attr.aria-owns]': 'autocomplete?.id',
        // Note: we use `focusin`, as opposed to `focus`, in order to open the panel
        // a little earlier. This avoids issues where IE delays the focusing of the input.
        '(focusin)': '_handleFocus()',
        '(blur)': '_onTouched()',
        '(input)': '_handleInput($event)',
        '(keydown)': '_handleKeydown($event)',
    },
    exportAs: 'nxAutocompleteTrigger',
    providers: [NX_AUTOCOMPLETE_VALUE_ACCESSOR],
})
export class NxAutocompleteTriggerDirective implements ControlValueAccessor, OnDestroy, OnChanges, AfterViewInit, OnInit {
    private _overlayRef!: OverlayRef | null;
    private _portal!: TemplatePortal;
    private _componentDestroyed = false;
    private _isAutofill = false;

    /** Old value of the native input. Used to work around issues with the `input` event on IE. */
    private _previousValue?: string | number | null;

    /** Strategy that is used to position the panel. */
    private _positionStrategy!: FlexibleConnectedPositionStrategy;

    /** Whether or not the label state is being overridden. */
    private _manuallyFloatingLabel = false;

    /** The subscription for closing actions (some are bound to document). */
    private _closingActionsSubscription!: Subscription;

    /** Subscription to viewport size changes. */
    private _viewportSubscription = Subscription.EMPTY;

    /** Subscription to control value changes */
    private _controlValueChangesSubscription!: Subscription;

    /** Subscription to items observable */
    private _itemsSubscription!: Subscription;

    /**
     * Whether the autocomplete can open the next time it is focused. Used to prevent a focused,
     * closed autocomplete from being reopened if the user switches to another browser tab and then
     * comes back.
     */
    private _canOpenOnNextFocus = true;

    /** Stream of keyboard events that can close the panel. */
    private readonly _closeKeyEventStream = new Subject<void>();

    /** Value changes */
    private readonly _valueChanges = new Subject<any>();

    /** Strategy factory that will be used to handle scrolling while the autocomplete panel is open. */
    private readonly _scrollStrategyFactory = this._defaultScrollStrategyFactory;

    /** The autocomplete panel to be attached to this trigger. */
    @Input('nxAutocomplete') autocomplete!: NxAutocompleteComponent;

    /** The items callback. Called with input value, must return Observable of Array of strings */
    @Input('nxAutocompleteItems') set itemsCb(val: (val: string) => Observable<string[]>) {
        if (typeof val === 'function') {
            this._itemsCb = val;
        } else {
            throw new Error('Wrong value type for nxAutocompleteItems');
        }
    }
    get itemsCb() {
        return this._itemsCb;
    }
    private _itemsCb!: (val: string) => Observable<string[]>;

    /** Debounce in ms before items callback is triggered. Defaults to 400 */
    @Input('nxAutocompleteDebounce') set debounce(val: NumberInput) {
        this._debounce = coerceNumberProperty(val);
    }
    private _debounce = 400;

    /** Whether autocomplete functionality is disabled. */
    @Input('nxAutocompleteDisabled') set autocompleteDisabled(val: boolean) {
        this._autocompleteDisabled = val;
        this._bindAutocompleteItems();
    }
    get autocompleteDisabled() {
        return this._autocompleteDisabled;
    }
    private _autocompleteDisabled = false;

    /** Whether or not the autocomplete panel is open. */
    get panelOpen(): boolean {
        return this._overlayAttached && this.autocomplete.showPanel;
    }
    private _overlayAttached = false;

    /** Stream of autocomplete option selections. */
    readonly optionSelections: Observable<NxAutocompleteOptionSelected> = defer<Observable<NxAutocompleteOptionSelected>>(() => {
        if (this.autocomplete?.options) {
            return merge(...this.autocomplete.options.map(option => option.onSelectionChange));
        }

        // If there are any subscribers before `ngAfterViewInit`, the `autocomplete` will be undefined.
        // Return a stream that we'll replace with the real one once everything is in place.
        return this._zone.onStable.asObservable().pipe(
            take(1),
            switchMap(() => this.optionSelections),
        );
    });

    /** The currently active option, coerced to NxAutocompleteOptionComponent type. */
    get activeOption(): NxAutocompleteOptionComponent | null {
        if (this.autocomplete?._keyManager) {
            return this.autocomplete._keyManager.activeItem;
        }

        return null;
    }

    /** Stream of clicks outside of the autocomplete panel. */
    private get _outsideClickStream(): Observable<any> {
        if (!this._document) {
            return of(null);
        }

        return merge(fromEvent<MouseEvent | TouchEvent>(this._document, 'mouseup'), fromEvent<MouseEvent | TouchEvent>(this._document, 'touchend')).pipe(
            map(event => _getEventTarget(event)),
            filter((target: EventTarget | null) => {
                const clickTarget = target as HTMLElement;
                const formField = this._formField ? this._formField.elementRef.nativeElement : null;

                return (
                    this._overlayAttached &&
                    !this._element.nativeElement.contains(target as Node | null) &&
                    (!formField || !formField.contains(clickTarget)) &&
                    !!this._overlayRef &&
                    !this._overlayRef.overlayElement.contains(clickTarget)
                );
            }),
        );
    }

    private readonly _destroyed = new Subject<void>();

    /**
     * Event handler for when the window is blurred. Needs to be an
     * arrow function in order to preserve the context.
     */
    private _windowBlurHandler = () => {
        // If the user blurred the window while the autocomplete is focused, it means that it'll be
        // refocused when they come back. In this case we want to skip the first focus event, if the
        // pane was closed, in order to avoid reopening it unintentionally.
        this._canOpenOnNextFocus = document.activeElement !== this._element.nativeElement || this.panelOpen;
    };

    /** `View -> model callback called when value changes` */
    _onChange: (value: any) => void = val => {
        this._valueChanges.next(val);
    };

    /** `View -> model callback called when autocomplete has been touched` */
    _onTouched = () => {};

    private get _formField(): NxFormfieldComponent | NxWordComponent | null {
        if (this._nxFormField) {
            return this._nxFormField;
        }
        return this._nxWordField;
    }

    constructor(
        private readonly _element: ElementRef,
        private readonly _overlay: Overlay,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _zone: NgZone,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _dir: Directionality,
        private readonly _autofillMonitor: AutofillMonitor,
        @Optional() @Host() private readonly _nxFormField: NxFormfieldComponent | null,
        @Optional() @Host() private readonly _nxWordField: NxWordComponent | null,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null,
        @Inject(NX_AUTOCOMPLETE_SCROLL_STRATEGY) private readonly _defaultScrollStrategyFactory: () => ScrollStrategy,
        private readonly _viewportRuler?: ViewportRuler,
    ) {
        if (typeof window !== 'undefined') {
            _zone.runOutsideAngular(() => {
                window.addEventListener('blur', this._windowBlurHandler);
            });
        }
    }

    ngOnInit(): void {
        this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._flipDirection();
            this._cdr.markForCheck();
        });
        this._autofillMonitor
            .monitor(this._element.nativeElement)
            .pipe(takeUntil(this._destroyed))
            .subscribe(event => {
                this._isAutofill = event.isAutofilled;
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();

        if (typeof window !== 'undefined') {
            window.removeEventListener('blur', this._windowBlurHandler);
        }
        this._viewportSubscription.unsubscribe();
        this._componentDestroyed = true;
        this._destroyPanel();
        this._closeKeyEventStream.complete();
        this._controlValueChangesSubscription?.unsubscribe();
        this._itemsSubscription?.unsubscribe();
        this._autofillMonitor.stopMonitoring(this._element.nativeElement);
    }

    ngOnChanges(): void {
        this._bindAutocompleteItems();
    }

    ngAfterViewInit(): void {
        this._bindAutocompleteItems();
    }

    /**
     * Binds or rebinds the autocomplete items. Prerequisites:
     * - items callback has to be defined
     * - autocomplete panel has to be bound
     */
    private _bindAutocompleteItems() {
        if (this._controlValueChangesSubscription) {
            this._controlValueChangesSubscription.unsubscribe();
        }

        if (typeof this._itemsCb === 'function' && this.autocomplete && !this.autocompleteDisabled) {
            const itemsSubject = new Subject<string[]>();

            this.autocomplete.items = itemsSubject;

            const valueChanges = this._formField?._control?.ngControl?.valueChanges || this._valueChanges;

            this._controlValueChangesSubscription = valueChanges.pipe(debounceTime(this._debounce)).subscribe(input => {
                if (this._itemsSubscription) {
                    this._itemsSubscription.unsubscribe();
                }
                this._itemsSubscription = this._itemsCb(input)
                    .pipe(first())
                    .subscribe(
                        result => {
                            itemsSubject.next(result);
                        },
                        err => {
                            // On error reset
                            // TODO Log error?
                            itemsSubject.next([]);
                        },
                    );
            });
        }
    }

    /** Opens the autocomplete suggestion panel. */
    openPanel(): void {
        if (!this.autocompleteDisabled) {
            this._attachOverlay();
            this._floatLabel();
        }
    }

    /** Closes the autocomplete suggestion panel. */
    closePanel(): void {
        this._resetLabel();

        if (!this._overlayAttached) {
            return;
        }

        if (this.panelOpen) {
            // Only emit if the panel was visible.
            this.autocomplete.closed.emit();
        }

        this.autocomplete._isOpen = this._overlayAttached = false;

        if (this._overlayRef?.hasAttached()) {
            this._overlayRef.detach();
            this._closingActionsSubscription.unsubscribe();
        }

        // Note that in some cases this can end up being called after the component is destroyed.
        // Add a check to ensure that we don't try to run change detection on a destroyed view.
        if (!this._componentDestroyed) {
            // We need to trigger change detection manually, because
            // `fromEvent` doesn't seem to do it at the proper time.
            // This ensures that the label is reset when the
            // user clicks outside.
            this._cdr.detectChanges();
        }
    }

    /**
     * A stream of actions that should close the autocomplete panel, including
     * when an option is selected, on blur, and when TAB is pressed.
     */
    get panelClosingActions(): Observable<NxAutocompleteOptionSelected> {
        return merge(
            this.optionSelections,
            this.autocomplete._keyManager.tabOut.pipe(filter(() => this._overlayAttached)),
            this._closeKeyEventStream,
            this._outsideClickStream,
            this._overlayRef ? this._overlayRef.detachments().pipe(filter(() => this._overlayAttached)) : of(),
        );
    }

    // Implemented as part of ControlValueAccessor.
    writeValue(value: any): void {
        Promise.resolve(null).then(() => this._setTriggerValue(value));
    }

    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn: () => void) {
        this._onTouched = fn;
    }

    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled: boolean) {
        this._element.nativeElement.disabled = isDisabled;
    }

    _handleKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;

        // Prevent the default action on all escape key presses. This is here primarily to bring IE
        // in line with other browsers. By default, pressing escape on IE will cause it to revert
        // the input value to the one that it had on focus, however it won't dispatch any events
        // which means that the model value will be out of sync with the view.
        if (keyCode === ESCAPE) {
            event.preventDefault();
        }

        // Close when pressing ESCAPE or ALT + UP_ARROW, based on the a11y guidelines.
        // See: https://www.w3.org/TR/wai-aria-practices-1.1/#textbox-keyboard-interaction
        if (this.panelOpen && (keyCode === ESCAPE || (keyCode === UP_ARROW && event.altKey))) {
            this._resetActiveItem();
            this._closeKeyEventStream.next();
            event.stopPropagation();
        } else if (this.activeOption && keyCode === ENTER && this.panelOpen) {
            this.activeOption._selectViaInteraction();
            this._resetActiveItem();
            event.preventDefault();
        } else {
            const prevActiveItem = this.autocomplete._keyManager.activeItem;
            const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;

            if (this.panelOpen || keyCode === TAB) {
                this.autocomplete._keyManager.onKeydown(event);
            } else if (isArrowKey && this._isFieldEnabled()) {
                this.openPanel();
            }

            if (isArrowKey || this.autocomplete._keyManager.activeItem !== prevActiveItem) {
                this._scrollToOption();
            }
        }
    }

    _handleInput(event: KeyboardEvent): void {
        const target = event.target as HTMLInputElement;
        let value: number | string | null = target.value;

        // Based on `NumberValueAccessor` from forms.
        if (target.type === 'number') {
            value = value === '' ? null : parseFloat(value);
        }

        // in case of autofill from browser
        // input can come from any activeElement which differ from event.target
        // so checking if it's autofill instead.
        if (this._isFieldEnabled() && this._previousValue !== value && this._isAutofill) {
            this._previousValue = value;
            this._onChange(value);
            this._isAutofill = false;
            return;
        }

        // If the input has a placeholder, IE will fire the `input` event on page load,
        // focus and blur, in addition to when the user actually changed the value. To
        // filter out all of the extra events, we save the value on focus and between
        // `input` events, and we check whether it changed.
        // See: https://connect.microsoft.com/IE/feedback/details/885747/
        if (this._isFieldEnabled() && this._previousValue !== value && this._rootElement().activeElement === event.target) {
            this._previousValue = value;
            this._onChange(value);
            this.openPanel();
        }
    }

    private _rootElement(): Document {
        return this._element.nativeElement.getRootNode();
    }

    _handleFocus(): void {
        if (!this._canOpenOnNextFocus) {
            this._canOpenOnNextFocus = true;
        } else if (this._isFieldEnabled()) {
            this._previousValue = this._element.nativeElement.value;
            this.openPanel();
        }
    }

    /**
     * In "auto" mode, the label will animate down as soon as focus is lost.
     * This causes the value to jump when selecting an option with the mouse.
     * This method manually floats the label until the panel can be closed.
     */
    private _floatLabel(): void {
        if (this._nxFormField && this._nxFormField.floatLabel === 'auto') {
            this._nxFormField.floatLabel = 'always';
            this._manuallyFloatingLabel = true;
        }
    }

    /** If the label has been manually elevated, return it to its normal state. */
    private _resetLabel(): void {
        if (this._nxFormField && this._manuallyFloatingLabel) {
            this._nxFormField.floatLabel = 'auto';
            this._manuallyFloatingLabel = false;
        }
    }

    /**
     * Given that we are not actually focusing active options, we must manually adjust scroll
     * to reveal options below the fold. First, we find the offset of the option from the top
     * of the panel. If that offset is below the fold, the new scrollTop will be the offset -
     * the panel height + the option height, so the active option will be just visible at the
     * bottom of the panel. If that offset is above the top of the visible panel, the new scrollTop
     * will become the offset. If that offset is visible within the panel already, the scrollTop is
     * not adjusted.
     */
    private _scrollToOption(): void {
        if (this.autocomplete.options.length === 0) {
            return;
        }
        let optionOffset = 0;
        let optionHeight = this.autocomplete.options.first.elementRef.nativeElement.offsetHeight;

        if (this.autocomplete._keyManager.activeItem) {
            optionOffset = this.autocomplete._keyManager.activeItem.elementRef.nativeElement.offsetTop;
            optionHeight = this.autocomplete._keyManager.activeItem.elementRef.nativeElement.offsetHeight;
        }

        const panelOffsetTop = this.autocomplete.panel.nativeElement.offsetTop;

        const newScrollPosition = _getOptionScrollPosition(
            optionOffset,
            optionHeight,
            this.autocomplete._getScrollTop() + panelOffsetTop,
            this.autocomplete.panel.nativeElement.offsetHeight,
        );

        this.autocomplete._setScrollTop(newScrollPosition - panelOffsetTop);
    }

    /**
     * This method listens to a stream of panel closing actions and resets the
     * stream every time the option list changes.
     */
    private _subscribeToClosingActions(): Subscription {
        const firstStable = this._zone.onStable.asObservable().pipe(take(1));
        const optionChanges = this.autocomplete.options.changes.pipe(
            tap(() => this._positionStrategy.reapplyLastPosition()),
            // Defer emitting to the stream until the next tick, because changing
            // bindings in here will cause "changed after checked" errors.
            delay(0),
        );

        // When the zone is stable initially, and when the option list changes...
        return (
            merge(firstStable, optionChanges)
                .pipe(
                    // create a new stream of panelClosingActions, replacing any previous streams
                    // that were created, and flatten it so our stream only emits closing events...
                    switchMap(() => {
                        this._resetActiveItem();
                        this.autocomplete._setVisibility();
                        return this.panelClosingActions;
                    }),
                    // when the first closing event occurs...
                    take(1),
                )
                // set the value, close the panel, and complete.
                .subscribe(event => this._setValueAndClose(event))
        );
    }

    /** Destroys the autocomplete suggestion panel. */
    private _destroyPanel(): void {
        if (this._overlayRef) {
            this.closePanel();
            this._overlayRef.dispose();
            this._overlayRef = null;
        }
    }

    private _setTriggerValue(value: any): void {
        const toDisplay = this.autocomplete?.valueFormatter ? this.autocomplete.valueFormatter(value) : value;

        // Simply falling back to an empty string if the display value is falsy does not work properly.
        // The display value can also be the number zero and shouldn't fall back to an empty string.
        const inputValue = toDisplay ?? '';

        // If it's used within a `NxFormField` or `NxWord`, we should set it through the property so it can go
        // through change detection.
        if (this._formField) {
            this._formField._control.value = inputValue;
        } else {
            this._element.nativeElement.value = inputValue;
        }
    }

    /**
     * This method closes the panel, and if a value is specified, also sets the associated
     * control to that value. It will also mark the control as dirty if this interaction
     * stemmed from the user.
     */
    private _setValueAndClose(event: NxAutocompleteOptionSelected | null): void {
        if (event?.source) {
            this._clearPreviousSelectedOption(event.source);
            this._setTriggerValue(event.source.value);
            this._onChange(event.source.value);
            this._element.nativeElement.focus();
            this.autocomplete._emitSelectEvent(event.source);
        }

        this.closePanel();
    }

    /**
     * Clear any previous selected option and emit a selection change event for this option.
     */
    private _clearPreviousSelectedOption(skip: NxAutocompleteOptionComponent) {
        this.autocomplete.options.forEach(option => {
            if (option !== skip && option.selected) {
                option.deselect();
            }
        });
    }

    private _attachOverlay(): void {
        if (!this.autocomplete) {
            throw getNxAutocompleteMissingPanelError();
        }

        if (this._overlayRef) {
            /** Update the panel width, in case the host width has changed */
            this._overlayRef.updateSize({ minWidth: this._getHostWidth() });
        } else {
            this._portal = new TemplatePortal(this.autocomplete.template, this._viewContainerRef);
            this._overlayRef = this._overlay.create(this._getOverlayConfig());

            if (this._viewportRuler) {
                this._viewportSubscription = this._viewportRuler.change().subscribe(() => {
                    if (this.panelOpen && this._overlayRef) {
                        this._overlayRef.updateSize({ minWidth: this._getHostWidth() });
                    }
                });
            }
        }

        if (this._overlayRef && !this._overlayRef.hasAttached()) {
            this._overlayRef.attach(this._portal);
            this._closingActionsSubscription = this._subscribeToClosingActions();
        }

        const wasOpen = this.panelOpen;

        this.autocomplete._setVisibility();
        this.autocomplete._isOpen = this._overlayAttached = true;

        // We need to do an extra `panelOpen` check in here, because the
        // autocomplete won't be shown if there are no options.
        if (this.panelOpen && wasOpen !== this.panelOpen) {
            this.autocomplete.opened.emit();
        }
    }

    private _getOverlayConfig(): OverlayConfig {
        return new OverlayConfig({
            positionStrategy: this._getOverlayPosition(),
            scrollStrategy: this._scrollStrategyFactory(),
            minWidth: this._getHostWidth(),
            direction: this._dir?.value || 'ltr',
        });
    }

    private _getOverlayPosition(): PositionStrategy {
        const isRtl = this._dir?.value === 'rtl';
        // HINT: somehow setting margin breaks overlay positioning for rtl
        const viewPortMargin = isRtl ? 0 : 16;
        this._positionStrategy = this._overlay
            .position()
            .flexibleConnectedTo(this._getConnectedElement())
            .withViewportMargin(viewPortMargin)
            .withPush(false)
            // to fix an edge case that would open the overlay after it has been visually hidden
            // and the trigger moved to the bottom edge of the viewport
            // problem is that the CDK overlay takes the last position into account which results
            // in the overlay only being 16px in height. this change disabled this code path for now
            .withGrowAfterOpen(true)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                },
            ]);

        return this._positionStrategy;
    }

    private _getConnectedElement(): ElementRef {
        return this._formField ? this._formField.getConnectedOverlayOrigin() : this._element;
    }

    /** Returns the width of the input element, so the panel min-width can match it. */
    private _getHostWidth(): number {
        return this._getConnectedElement().nativeElement.getBoundingClientRect().width;
    }

    /**
     * Resets the active item to -1 so arrow events will activate the
     * correct options, or to 0 if the consumer opted into it.
     */
    private _resetActiveItem(): void {
        this.autocomplete._keyManager.setActiveItem(-1);
    }

    /** Determines whether the panel can be opened. */
    private _isFieldEnabled(): boolean {
        const element: HTMLInputElement = this._element.nativeElement;
        return !element.readOnly && !element.disabled;
    }

    private _flipDirection(): void {
        this._overlayRef?.setDirection(this._dir.value);
        this._overlayRef?.updatePositionStrategy(this._getOverlayPosition());
    }
}

/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Option offset.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
function _getOptionScrollPosition(optionOffset: number, optionHeight: number, currentScrollPosition: number, panelHeight: number): number {
    if (optionOffset < currentScrollPosition) {
        return optionOffset;
    }

    if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
        return Math.max(0, optionOffset - panelHeight + optionHeight);
    }

    return currentScrollPosition;
}

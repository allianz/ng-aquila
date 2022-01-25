import { FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    Output,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { clamp } from '@aposin/ng-aquila/utils';
import { Decimal } from 'decimal.js';
import { fromEvent, Subscription } from 'rxjs';

let nextId = 0;

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_STEP = 1;
const DEFAULT_LABEL_POSITION = '-50%';
const VALUE_MARGIN = 4;

@Component({
    selector: 'nx-slider',
    templateUrl: './slider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./slider.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxSliderComponent),
            multi: true,
        },
    ],
    host: {
        '[attr.aria-disabled]': 'disabled ? true : null',
        '(keydown)': 'handleKeypress($event)',
        '[class.nx-slider--disabled]': 'disabled',
        '[class.nx-slider--negative]': 'negative',
    },
})
export class NxSliderComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private _dragSubscriptions: Subscription[] = [];
    private _value = 0;
    private _decimalPlaces = 0;
    private _step: number = DEFAULT_STEP;
    private _onChange: (value: any) => void = () => {};
    private _onTouched: () => any = () => {};
    private _id = `nx-slider-${nextId++}`;
    private _tabIndex = 0;
    private _min = DEFAULT_MIN;
    private _max = DEFAULT_MAX;
    private _label = '';
    private _inverted = false;
    private _thumbLabel = true;
    private _negative = false;
    private _hideLabels = false;
    private _disabled = false;

    @ViewChild('handle', { static: true }) private _handleElement!: ElementRef;

    _labelPosition: string = DEFAULT_LABEL_POSITION;

    /** Sets the id of the slider. */
    @Input('id')
    set id(value: string) {
        if (this._id !== value) {
            this._id = value;
            this._cdr.markForCheck();
        }
    }
    get id(): string {
        return this._id;
    }

    /** Sets the tabindex of the slider. */
    @Input()
    set tabindex(value: NumberInput) {
        this._tabIndex = coerceNumberProperty(value);
        this._cdr.markForCheck();
    }
    get tabindex(): number {
        return this._disabled ? -1 : this._tabIndex;
    }

    /** Sets the minimum value (Default: 0). */
    @Input('nxMin')
    set min(value: NumberInput) {
        this._min = coerceNumberProperty(value);
        this._cdr.markForCheck();
    }
    get min(): number {
        return this._min;
    }

    /** Sets the maximum value (Default: 100). */
    @Input('nxMax')
    set max(value: NumberInput) {
        this._max = coerceNumberProperty(value);
        this._cdr.markForCheck();
    }
    get max(): number {
        return this._max;
    }

    /** Sets the step size by which the value of the slider can be increased or decreased (Default: 1). */
    @Input('nxStep')
    get step(): number {
        return this._step;
    }
    set step(value: NumberInput) {
        this._step = coerceNumberProperty(value, this._step);

        if (this._step % 1 !== 0) {
            this._decimalPlaces = this._step.toString().split('.').pop()!.length;
        }
    }

    /** Sets the label which is displayed on top of the slider. */
    @Input('nxLabel')
    set label(value: string) {
        if (this._label !== value) {
            this._label = value;
            this._cdr.markForCheck();
        }
    }
    get label(): string {
        return this._label;
    }

    /** Whether the input to the control of the slider should be disabled. */
    @Input()
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /** Whether the max value is to the right (false) or left (true).*/
    @Input('nxInverted')
    set inverted(value: BooleanInput) {
        this._inverted = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get inverted(): boolean {
        return this._inverted;
    }

    /** Whether to display the thumb label on top of the slider.*/
    @Input()
    set thumbLabel(value: BooleanInput) {
        this._thumbLabel = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get thumbLabel(): boolean {
        return this._thumbLabel;
    }

    /** Whether the negative set of styles is applied (Default: 'false').*/
    @Input('negative')
    set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get negative(): boolean {
        return this._negative;
    }

    /** Hides the min/max labels (Default: 'false'). */
    @Input('hideLabels')
    set hideLabels(value: BooleanInput) {
        this._hideLabels = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get hideLabels(): boolean {
        return this._hideLabels;
    }

    /** An event is dispatched on each value change. */
    @Output('nxValueChange') valueChange: EventEmitter<number> = new EventEmitter<number>();

    /** Sets the customization function for the value which is displayed above the slider handle (Default:(value) => value). ). */
    @Input('nxValueFormatter') valueFormatter = (value: any) => value;

    /** Sets the customization function for the label on the min-side of the slider (Default:(value) => value). */
    @Input('nxLabelMinFormatter') labelMinFormatter = (value: any) => value;

    /** Sets the customization function for the label on the max-side of the slider (Default:(value) => value). */
    @Input('nxLabelMaxFormatter') labelMaxFormatter = (value: any) => value;

    constructor(
        private elementRef: ElementRef,
        private _cdr: ChangeDetectorRef,
        private _ngZone: NgZone,
        @Optional() private _dir: Directionality,
        private _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._handleElement);

        setTimeout(() => {
            this._updateLabelPosition();
        });
    }

    /** Sets the current value of the slider. */
    @Input('nxValue')
    set value(value: NumberInput) {
        this.writeValue(Number(value));

        // wait for rerender to calculate latest label position
        setTimeout(() => {
            this._updateLabelPosition();
        });
    }

    get value(): number {
        return this._value;
    }

    ngOnDestroy() {
        this._reset();
        this._focusMonitor.stopMonitoring(this._handleElement);
    }

    writeValue(value: number) {
        if (value !== this._value) {
            this._value = value;
            this.valueChange.emit(value);
            this._cdr.markForCheck();
        }
    }

    registerOnChange(fn: (value: any) => void) {
        this._onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    setDisabledState(disabled: boolean) {
        this.disabled = disabled;
    }

    _isMinimum() {
        return this._value === this.min;
    }

    /**
     * Checks if the value is in the boundaries of min/max and if it is a multiple of `step.
     */
    _isValidStep() {
        const safeValue = new Decimal(this._value).minus(this.min);
        const modulo = safeValue.mod(this.step);
        return this._isMinimum() || modulo.cmp(0) === 0;
    }

    /**
     * We have to look at two cases:
     * - current value is a valid multitude of the step size
     *   then we can safely add or subtract the step
     * - the value is not a valid multitude. this could be the max value or the value bound
     *   via nxValue
     *   then we look for the next closest value upwards or downwards
     *   decimal.js provides a nice utility function for this.
     */
    _changeValue(valueDiff: number) {
        let newValue = new Decimal(this._value);
        if (this._isValidStep()) {
            newValue = newValue.plus(valueDiff);
        } else {
            // subtract the minimum to find the closest multitude then add the minimum again to get the valid slider step
            const minAdjustedValue = new Decimal(this._value).minus(this.min);
            newValue = valueDiff < 0 ? minAdjustedValue.toNearest(this.step, Decimal.ROUND_DOWN) : minAdjustedValue.toNearest(this.step, Decimal.ROUND_UP);
            newValue = newValue.plus(this.min);
        }
        // cast the Decimal object to a JS number before it gets returned
        let toNumber = newValue.toNumber();
        toNumber = clamp(toNumber, this.min, this.max);
        if (this.value !== toNumber) {
            this._onChange(toNumber);
            this.valueChange.emit(toNumber);
            this.value = toNumber;
        }
    }

    get _percentageValue(): number {
        let percentageValue = (((this.value || 0) - this.min) / (this.max - this.min)) * 100;
        if (this.inverted) {
            percentageValue = 100 - percentageValue;
        }
        return clamp(percentageValue, 0, 100);
    }

    _sliderClick(event: MouseEvent) {
        if (this.disabled) {
            return;
        }

        this._focusHandleElement();
        event.stopPropagation();

        const position = this._getPositionFromEvent(event);
        const newValue = this._getValueFromPosition(position);

        if (this.value !== newValue) {
            this.value = newValue;
            this._onChange(this.value);
        }
    }

    _focus(): void {
        // if (this.disabled) {}
        this._focusHandleElement();
    }

    /**
     * Prevent text selection when dragging the handle.
     */
    _selectStart() {
        return false;
    }

    _handleKeypress(event: KeyboardEvent) {
        if (this.disabled) {
            return;
        }

        // TODO return statement should not substitute break keyword
        switch (event.keyCode) {
            case DOWN_ARROW:
            case this.inverted ? RIGHT_ARROW : LEFT_ARROW:
                return this._changeValue(-this.step);

            case UP_ARROW:
            case this.inverted ? LEFT_ARROW : RIGHT_ARROW:
                return this._changeValue(this.step);
        }
    }

    /**
     * This is called on mousedown or touchstart
     */
    _dragStart() {
        if (this.disabled) {
            return;
        }

        this._ngZone.runOutsideAngular(() => {
            this._dragSubscriptions.push(fromEvent<TouchEvent>(document, 'touchmove').subscribe(this._handleDragMove.bind(this)));
            this._dragSubscriptions.push(fromEvent<MouseEvent>(document, 'mousemove').subscribe(this._handleDragMove.bind(this)));
        });

        this._dragSubscriptions.push(fromEvent<TouchEvent>(document, 'touchcancel').subscribe(this._handleDragStop.bind(this)));
        this._dragSubscriptions.push(fromEvent<MouseEvent>(document, 'mouseup').subscribe(this._handleDragStop.bind(this)));
        this._dragSubscriptions.push(fromEvent<TouchEvent>(document, 'touchend').subscribe(this._handleDragStop.bind(this)));
    }

    _formatValue(value: number): string {
        return this.valueFormatter(value);
    }

    _formatLabelLeft(): string {
        return this.inverted ? this._formatLabelMax() : this._formatLabelMin();
    }

    _formatLabelRight(): string {
        return this.inverted ? this._formatLabelMin() : this._formatLabelMax();
    }

    _formatLabelMin() {
        return this.labelMinFormatter(this.min);
    }

    _formatLabelMax() {
        return this.labelMaxFormatter(this.max);
    }

    _focusHandleElement() {
        this._handleElement.nativeElement.focus();
    }

    private _updateLabelPosition() {
        const label = this._handleElement.nativeElement.querySelector('.nx-slider__value');

        if (!label) {
            return;
        }

        const handleRect = this._handleElement.nativeElement.getBoundingClientRect();
        const valueRect = label.getBoundingClientRect(label);
        const handleCenter = handleRect.left + handleRect.width / 2;
        const labelLeft = handleCenter - valueRect.width / 2;
        const labelRight = handleCenter + valueRect.width / 2;
        const bodyWidth = document.body.offsetWidth;
        let position = DEFAULT_LABEL_POSITION;

        if (labelLeft < 0) {
            position = -handleCenter + VALUE_MARGIN + 'px';
        } else if (labelRight > bodyWidth) {
            position = -valueRect.width + bodyWidth - handleCenter - VALUE_MARGIN + 'px';
        }

        this._labelPosition = `translateX(${position})`;
        this._cdr.markForCheck();
    }

    private _getValueFromPosition(position: number): number {
        const isRTL = this._dir.value === 'rtl';
        const rect = this.elementRef.nativeElement.getBoundingClientRect();
        const x = Math.max(rect.left, Math.min(rect.right, position));

        // position of slider relative to slider width
        let percent = (x - rect.left) / rect.width;

        if (this.inverted) {
            percent = 1 - percent;
        }

        if (isRTL) {
            percent = 1 - percent;
        }

        // edge case handling because of float precision errors you couldn't reach the maximum
        let closestValue;

        if (percent === 1) {
            closestValue = this.max;
        } else if (percent === 0) {
            closestValue = this.min;
        } else {
            const exactValue = this.min + percent * (this.max - this.min);
            closestValue = Math.round((exactValue - this.min) / this.step) * this.step + this.min;
        }

        if (this._decimalPlaces) {
            closestValue = this._roundToDecimal(closestValue);
        }

        return clamp(closestValue, this.min, this.max);
    }

    private _roundToDecimal(value: number) {
        return parseFloat(value.toFixed(this._decimalPlaces));
    }

    private _handleDragMove(event: MouseEvent | TouchEvent) {
        event.preventDefault();

        const position = this._getPositionFromEvent(event);
        const newValue = this._getValueFromPosition(position);

        if (this.value !== newValue) {
            // run change detection to update value and position of handle
            this._ngZone.run(() => {
                this.value = newValue;
                this._cdr.markForCheck();
            });
        }
    }

    private _handleDragStop(event: MouseEvent | TouchEvent): void {
        this._reset();
        const position = this._getPositionFromEvent(event);
        const newValue = this._getValueFromPosition(position);

        if (this.value !== newValue) {
            this.value = newValue;
            this._onChange(this.value);
        }
    }

    private _reset(): void {
        for (const subscription of this._dragSubscriptions) {
            subscription.unsubscribe();
        }

        this._dragSubscriptions = [];
    }

    private _getPositionFromEvent(event: MouseEvent | TouchEvent): number {
        const cursor: any = event.type.includes('touch') ? (event as TouchEvent).touches.item(0) : event;
        return cursor.clientX;
    }
}

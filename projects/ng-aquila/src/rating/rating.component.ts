import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ENTER, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    QueryList,
    ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconSize, NxIconComponent } from '@aposin/ng-aquila/icon';

@Component({
    selector: 'nx-rating',
    templateUrl: './rating.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./rating.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxRatingComponent),
            multi: true,
        },
    ],
    host: {
        '[class.nx-rating--negative]': 'negative',
        '[class.nx-rating--disabled]': 'disabled',
        '[style.--iconColor]': 'iconColor',
    },
})
export class NxRatingComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    @Input() set size(newSize: IconSize) {
        this._size = newSize;
        this._cdr.markForCheck();
    }
    get size(): IconSize {
        return this._size;
    }
    private _size: IconSize = 'l';

    /** Sets the selected rating 1 - 5. */
    @Input() set value(newValue: NumberInput) {
        this._value = coerceNumberProperty(newValue);
        this._cdr.markForCheck();
    }
    get value(): number {
        return this._value;
    }
    private _value = 0;

    private _hover = 0;

    /** Whether the rating component should be disabled. */
    @Input() set disabled(newValue: BooleanInput) {
        if (this._disabled === newValue) {
            return;
        }
        this._disabled = coerceBooleanProperty(newValue);
        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** Whether the negative colors be used. */
    @Input() set negative(newValue: BooleanInput) {
        if (this._negative === newValue) {
            return;
        }
        this._negative = coerceBooleanProperty(newValue);
        this._cdr.markForCheck();
    }
    get negative(): boolean {
        return this._negative;
    }
    private _negative = false;

    /** Sets the label painted at the start of the rating component. */
    @Input() set startLabel(newValue: string) {
        this._startLabel = newValue;
        this._cdr.markForCheck();
    }
    get startLabel(): string {
        return this._startLabel;
    }
    private _startLabel = '';

    /** Sets the label painted at the end of the rating component. */
    @Input() set endLabel(newValue: string) {
        this._endLabel = newValue;
        this._cdr.markForCheck();
    }
    get endLabel(): string {
        return this._endLabel!;
    }
    private _endLabel: string | null = null;

    @Input() /** Sets an array of custom aria-describedby attributes for each of the stars in the component. */ set ariaLabel(newAriaLabels: string[]) {
        this._ariaLabel = newAriaLabels;
        this._cdr.markForCheck();
    }
    get ariaLabel(): string[] {
        return this._ariaLabel;
    }
    private _ariaLabel: string[] = ['1/5', '2/5', '3/5', '4/5', '5/5'];

    @Input() /** Sets the color of rating icon. */ set iconColor(color: string) {
        this._iconColor = color;
        this._cdr.markForCheck();
    }
    get iconColor(): string {
        return this._iconColor;
    }
    private _iconColor = '';

    /** An event is dispatched each time when the rating changes. */
    @Output() readonly valueChange = new EventEmitter<number>();

    /** @docs-private */
    @ViewChildren(NxIconComponent, { read: ElementRef }) icons!: QueryList<ElementRef>;
    private onTouchedCallback: () => void = () => {};
    private onChangeCallback: (option: any) => any = (option: any) => {};

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {}

    ngAfterViewInit(): void {
        this.icons.forEach(icon => this._focusMonitor.monitor(icon));
    }

    ngOnDestroy(): void {
        this.icons.forEach(icon => this._focusMonitor.stopMonitoring(icon));
    }

    /** Whether the given rating is selected. */
    isSelected(index: number) {
        return index <= this.value || index <= this._hover;
    }

    isChecked(rating: number) {
        return rating <= this.value;
    }

    /** Allows to set the rating. */
    setSelection(value: number) {
        if (!this.disabled) {
            this.value = value;
            this.valueChange.emit(value);
            this.onTouchedCallback();
            this.onChangeCallback(this.value);
        }
    }

    /** @docs-private */
    handleKeyUp(event: KeyboardEvent, rating: number) {
        const keyCode = event.keyCode;
        event.preventDefault();
        event.stopPropagation();

        if (keyCode === ENTER) {
            this.setSelection(rating);
        }

        if (keyCode === RIGHT_ARROW) {
            this.value = Math.min(this.value + 1, 5);
            const elementRef: ElementRef = this.icons.toArray()[this.value - 1];
            this._focusMonitor.focusVia(elementRef, 'keyboard');
        }

        if (keyCode === LEFT_ARROW) {
            this.value = Math.max(this.value - 1, 1);
            const elementRef: ElementRef = this.icons.toArray()[this.value - 1];
            this._focusMonitor.focusVia(elementRef, 'keyboard');
        }
    }

    writeValue(value: number): void {
        this.value = value;
    }

    registerOnChange(callback: (option: any) => any): void {
        this.onChangeCallback = callback;
    }

    registerOnTouched(callback: () => void): void {
        this.onTouchedCallback = callback;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @docs-private */
    getAriaLabel(rating: number) {
        return this.ariaLabel[rating - 1];
    }

    /** @docs-private */
    getIconName(rating: number) {
        return 'star' + (this.isSelected(rating) ? '' : '-o');
    }

    /** @docs-private */
    setHover(rating: number) {
        if (this.disabled) {
            return;
        }
        this._hover = rating;
    }
}

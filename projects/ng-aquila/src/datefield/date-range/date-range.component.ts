import { FocusMonitor } from '@angular/cdk/a11y';
import { DOWN_ARROW } from '@angular/cdk/keycodes';
import {
    afterEveryRender,
    AfterRenderRef,
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    DoCheck,
    effect,
    ElementRef,
    forwardRef,
    Injector,
    Input,
    input,
    InputSignal,
    model,
    ModelSignal,
    OnDestroy,
    OnInit,
    Optional,
    Renderer2,
    signal,
    viewChild,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormsModule,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors,
    Validator,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { NxFormfieldComponent, NxFormfieldControl, NxFormfieldUpdateEventType } from '@aposin/ng-aquila/formfield';
import { NxAbstractControl } from '@aposin/ng-aquila/shared';
import { getFontShorthand } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxDateAdapter } from '../adapter';
import { NxDateRangeValidators } from '../date-validators';
import { NxDatefieldDirective } from '../datefield.directive';
import { createMissingDateImplError } from '../datefield.functions';
import { NxDatepickerComponent } from '../datepicker/datepicker.component';
import { NxDateRangeIntl } from './date-range.intl';
import { NxDateRangeConnector } from './date-range-connect';

export class DateRange<T> {
    constructor(
        readonly start: T | null,
        readonly end: T | null,
    ) {}
}

@Component({
    selector: 'nx-date-range',
    imports: [NxDatefieldDirective, FormsModule],
    templateUrl: './date-range.component.html',
    styleUrl: './date-range.component.scss',
    providers: [
        { provide: NxFormfieldControl, useExisting: NxDateRangeComponent },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxDateRangeComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => NxDateRangeComponent),
            multi: true,
        },
        {
            provide: NxAbstractControl,
            useExisting: forwardRef(() => NxDateRangeComponent),
        },
        {
            provide: NxDateRangeConnector,
            useExisting: forwardRef(() => NxDateRangeComponent),
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    host: {
        role: 'group',
        '[attr.aria-describedby]': 'ariaDescribedBy()',
        '[attr.aria-label]': 'groupAriaLabel()',
        '[attr.aria-labelledby]': 'getAriaLabelId()',
        '[id]': 'id',
        '[class.has-error]': 'errorState',
    },
})
export class NxDateRangeComponent<D>
    implements
        NxFormfieldControl<DateRange<D>>,
        ControlValueAccessor,
        OnDestroy,
        AfterViewInit,
        Validator,
        NxAbstractControl,
        DoCheck,
        OnInit,
        NxDateRangeConnector
{
    protected static nextId = 0;
    private readonly _destroyed = new Subject<void>();

    /** The start input field. We need this to connect to the datepicker */
    private readonly _startDateDirective = viewChild.required<NxDatefieldDirective<D>>('startDateFieldDirective');

    /** Effect for connecting the datepicker to the end date field so the date picker can set the value  */
    private readonly _startDateDirectiveEffect = effect(() => {
        const startDateDirective = this._startDateDirective();
        if (startDateDirective) {
            this.datepicker()?.registerInput(startDateDirective, 'start');
        }
    });

    /** The end date input field. We need this to connect the datepicker */
    private readonly _endDateDirective = viewChild.required<NxDatefieldDirective<D>>('endDateFieldDirective');

    /** Effect for connecting the datepicker to the end date field so the date picker can set the value  */
    private readonly _endDateDirectiveEffect = effect(() => {
        const endDateDirective = this._endDateDirective();
        if (endDateDirective) {
            this.datepicker()?.registerInput(endDateDirective, 'end');
        }
    });
    private readonly _dynamicStartDateWidthHook: AfterRenderRef;

    /**
     * Value of the start date input field
     */
    protected readonly startDate: ModelSignal<D | null> = model<D | null>(null);

    /**
     * Value of the end date input field
     */
    protected readonly endDate: ModelSignal<D | null> = model<D | null>(null);

    /**
     * The width of the start date input field. This is set dynamically based on the content of the input field.
     */
    protected readonly startDateInputWidth = model<string>();

    /**
     * The minimum date that can be selected. The date must be same or after the minimum date.
     */
    readonly minDate: InputSignal<D | null> = input<D | null>(null);

    /**
     * The maximum date that can be selected. The date must be same or before the maximum date.
     */
    readonly maxDate: InputSignal<D | null> = input<D | null>(null);

    readonly dateFilter: InputSignal<((date: D | null) => boolean) | null> = input<((date: D | null) => boolean) | null>(null);
    private readonly _dateFilterEffect = effect(() => {
        if (this.datepicker() && this.dateFilter()) {
            this.datepicker()!.dateFilter = this.dateFilter()!;
        }
    });

    /**
     * The NxDatePicker this date range should connect to
     */
    readonly datepicker: InputSignal<NxDatepickerComponent<D> | undefined> = input<NxDatepickerComponent<D> | undefined>();

    /** The date range value of type @type {DateRange<D>} */
    @Input() set value(value: DateRange<D> | null) {
        this.writeValue(value);
    }
    get value(): DateRange<D> | null {
        return { start: this.startDate(), end: this.endDate() };
    }

    /** State changes subject to notifiy the Formfield of changes */
    stateChanges = new Subject<void>();
    empty: boolean = false;
    id: string = `nx-date-range-${NxDateRangeComponent.nextId++}`;
    focused: boolean = false;
    @Input({ transform: booleanAttribute }) set required(value: boolean) {
        this._required = value;
    }
    get required(): boolean {
        return this._required || this.ngControl?.control?.hasValidator(Validators.required) || false;
    }
    private _required: boolean = false;
    @Input({ transform: booleanAttribute }) set disabled(value: boolean) {
        if (this._disabled !== value) {
            this._disabled = value;
            this.stateChanges.next();
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    protected _disabled: boolean = false;
    @Input({ transform: booleanAttribute }) set readonly(value: boolean) {
        if (this._readonly !== value) {
            this._readonly = value;
            this.stateChanges.next();
        }
    }
    get readonly(): boolean {
        return this._readonly;
    }
    protected _readonly: boolean = false;
    shouldLabelFloat: boolean | undefined = true;

    /** Wether the component has an invalid value */
    errorState: boolean = false;
    @Input() placeholder: string = '';
    controlType?: string | undefined;
    updateOn?: NxFormfieldUpdateEventType | undefined;

    /**
     * The aria-describedby ids that will be set by the formfield
     */
    protected ariaDescribedByFormfield = signal<string[] | null>(null);

    /**
     * The aria-describedby attribute on the input for improved accessibility.
     */
    readonly ariaDescribedByInput = input<string | null>(null, { alias: 'ariaDescribedBy' });
    protected ariaDescribedBy = computed<string | null>(() => {
        const input = this.ariaDescribedByInput();
        const formfield = this.ariaDescribedByFormfield();

        if (input && formfield) {
            return `${input}, ${formfield.join(' ')}`;
        } else if (input) {
            return input;
        }

        return formfield?.join(' ') || null;
    });

    readonly groupAriaLabel = model<string | null>(null);
    readonly startDateAriaLabelInput = input<string | null>(null, { alias: 'startDateAriaLabel' });
    readonly startDateAriaLabel = computed<string>(() => {
        const test = this.startDateAriaLabelInput() || this._intl.startDateAriaLabel();
        return test;
    });
    readonly endDateAriaLabelInput = input<string | null>(null, { alias: 'startDateAriaLabel' });
    readonly endDateAriaLabel = computed<string>(() => this.endDateAriaLabelInput() || this._intl.endDateAriaLabel());

    readonly parseFormat = input<string | string[]>('');
    readonly displayFormat = input<string>('');
    readonly strict = input<boolean>(true);

    /**
     * Callback function that is called when the control's value changes in the UI.
     */
    onChange = (_: any) => {};

    /**
     * Callback function that is called when the control's is touched.
     */
    onTouched = () => {};

    private _measureCanvas?: any;
    ngControl: NgControl | null = null;

    constructor(
        private _elementReference: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _renderer: Renderer2,
        private readonly _injector: Injector,
        private readonly _intl: NxDateRangeIntl,
        @Optional() private readonly _formFieldComponent: NxFormfieldComponent | null,
        private readonly _dateAdapter: NxDateAdapter<D>,
    ) {
        if (!_dateAdapter) {
            throw createMissingDateImplError('DateAdapter');
        }

        // Since we need to use the window object we need to call it in the afterRender hook to be SSR compatible.
        this._dynamicStartDateWidthHook = afterEveryRender(() => {
            let measuredWidth = 0;

            if (!this._measureCanvas) {
                this._measureCanvas = this._renderer.createElement('canvas');
            }

            const ctx = this._measureCanvas.getContext('2d');
            if (!ctx) {
                throw new Error('Could not get 2d context');
            }

            const inputRef = this._startDateDirective()._elementRef as ElementRef;
            const styles = window.getComputedStyle(inputRef.nativeElement);
            ctx!.font = getFontShorthand(styles);

            let startInputContent = '';
            if (inputRef.nativeElement.value.length > 0) {
                startInputContent = inputRef.nativeElement.value;
            } else {
                startInputContent = inputRef.nativeElement.placeholder;
            }

            const metrics = ctx!.measureText(startInputContent);

            // add 1px (cursor width) to prevent jumping of the text on blur.
            const newWidth = metrics.width + parseInt(styles.paddingRight, 10) + parseInt(styles.paddingLeft, 10) + 1;

            // This should be injected via @Host to get an exact reference to NxNaturalLanguageFormComponent
            // Works as promised as long as there is not other tag around the word. Not expected but possible.
            const parent: HTMLElement = inputRef.nativeElement.parentElement;
            const parentMeasurement = parent.getBoundingClientRect();

            // Limit to own given minimal width
            measuredWidth = Math.max(parseInt(styles.minWidth, 10), newWidth);

            // Limit to container width
            measuredWidth = Math.min(measuredWidth, parentMeasurement.width);
            measuredWidth = Math.round(measuredWidth);
            this.startDateInputWidth.set(`${measuredWidth}px`);
        });
    }

    ngOnInit(): void {
        this.ngControl = this._injector.get(NgControl, null);
    }

    ngDoCheck(): void {
        if (this.ngControl && this.ngControl.touched && (!this.datepicker()?.opened || this.ngControl.valid || !this.datepicker())) {
            this.errorState = !this.ngControl.valid;
        }
    }

    validate(control: AbstractControl): ValidationErrors | null {
        const validator = Validators.compose(this.getValidators());
        return validator ? validator(control) : null;
    }

    getValidators(): ValidatorFn[] {
        const validators = [
            NxDateRangeValidators.complete(this._dateAdapter),
            NxDateRangeValidators.range(this._dateAdapter),
            NxDateRangeValidators.min(this._dateAdapter, this.minDate()),
            NxDateRangeValidators.max(this._dateAdapter, this.maxDate()),
            NxDateRangeValidators.filter(this._dateAdapter, this.dateFilter()!),
        ];
        if (this.required) {
            validators.push(NxDateRangeValidators.required(this._dateAdapter));
        }

        return validators;
    }

    registerOnValidatorChange?(fn: () => void): void {}

    setReadonly(value: boolean): void {
        this.readonly = value;
    }
    setDescribedByIds(ids: string[]): void {
        this.ariaDescribedByFormfield.set(ids);
    }
    setAriaLabel?(value: string): void {
        this.groupAriaLabel.set(value);
    }
    get elementRef(): ElementRef<any> {
        return this._elementReference;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngAfterViewInit(): void {
        this._focusMonitor
            .monitor(this._elementReference, true)
            .pipe(takeUntil(this._destroyed))
            .subscribe(origin => {
                if (this.focused && !origin) {
                    this.onTouched();
                }
                this.focused = !!origin;
                this.stateChanges.next();
            });
        this.datepicker()
            ?.selectedChanged.pipe(takeUntil(this._destroyed))
            .subscribe((selected: DateRange<D>) => {
                this.startDate.set(selected.start);
                this.endDate.set(selected.end);
                this._startDateDirective()!.value = selected.start;
                this._endDateDirective()!.value = selected.end;
                this.onChange({ start: selected.start, end: selected.end });
            });
        this.datepicker()
            ?.closedStream.pipe(takeUntil(this._destroyed))
            .subscribe(() => {
                this.onTouched();
                this.stateChanges.next();
            });
    }
    ngOnDestroy(): void {
        this._destroyed.next();
        this._focusMonitor.stopMonitoring(this._elementReference);
        this._dynamicStartDateWidthHook.destroy();
        this._startDateDirectiveEffect.destroy();
        this._endDateDirectiveEffect.destroy();
        this._dateFilterEffect.destroy();
        this._destroyed.complete();
    }

    writeValue(obj: any): void {
        this.startDate.set(obj?.start || null);
        this.endDate.set(obj?.end || null);
        if (this.datepicker()) {
            this.datepicker()!.selected = { start: this.startDate(), end: this.endDate() };
        }
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    protected handleChange() {
        this.onChange({ start: this.startDate(), end: this.endDate() });
    }

    protected getAriaLabelId(): string | null {
        return this._formFieldComponent?.labelId || null;
    }

    protected _onKeydown(event: KeyboardEvent) {
        if (event.altKey && event.keyCode === DOWN_ARROW) {
            this.datepicker()?.open();
            event.preventDefault();
        }
    }
}

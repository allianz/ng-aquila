import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge, Subject } from 'rxjs';
import { filter, startWith, takeUntil, tap } from 'rxjs/operators';

import { ToggleButton } from '../circle-toggle/toggle-button';

/**
 * Appearance options for the circle toggle group component.
 */
export type NxCircleToggleGroupAppearance = 'default' | 'expert';

/**
 * Represents the default options for the circle toggle group.
 * It can be configured using the `CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS` injection token.
 */
export interface CircleToggleGroupDefaultOptions {
    /**
     * Sets the default appearance. (optional)
     */
    appearance?: NxCircleToggleGroupAppearance;
}

export const CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS = new InjectionToken<CircleToggleGroupDefaultOptions>('CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS');

let nextId = 0;

@Component({
    selector: 'nx-circle-toggle-group',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./circle-toggle-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxCircleToggleGroupComponent),
            multi: true,
        },
    ],
    host: {
        '[class.is-responsive]': 'responsive',
        '[class.is-disabled]': 'disabled',
        '[attr.aria-disabled]': 'disabled',
        '[attr.aria-labelledby]': 'name',
        '[attr.name]': 'name',
        '[attr.id]': 'id',
        '[class.nx-circle-toggle-group]': 'true',
        role: 'radiogroup',
    },
})
export class NxCircleToggleGroupComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    /**
     * Id of the circle toggle group.
     *
     * If not set, the circle toggle group gets an incremented value by default.
     */
    set id(value: string) {
        this._id = value;
        this._cdr.markForCheck();
    }
    get id(): string {
        return this._id;
    }

    /** Name that is used for accessibility. */
    @Input()
    set name(value: string) {
        this._name = value;
        this.updateToggleButtonsNames();
        this._cdr.markForCheck();
    }
    get name(): string {
        return this._name;
    }

    /** Whether the circle toggle group is disabled. */
    @Input()
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this._disabled !== newValue) {
            this._disabled = newValue;
            this._cdr.markForCheck();
        }
        if (this.buttons) {
            this.buttons.forEach(button => (button.disabled = newValue));
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    /** Whether the circle toggle group uses the negative styling. */
    @Input()
    set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.negative !== newValue) {
            this._negative = newValue;
        }
        if (this.buttons) {
            this.buttons.forEach(button => (button.negative = newValue));
        }
    }
    get negative(): boolean {
        return this._negative;
    }
    /** The value of the selected circle toggle in the circle toggle group. */
    @Input()
    set value(value: string) {
        this.writeValue(value);
    }

    get value(): string {
        return this._value;
    }
    /** Whether the circle toggle group has a responsive behavior. */
    @Input()
    set responsive(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (newValue !== this.responsive) {
            this._responsive = newValue;
            this._cdr.markForCheck();
        }
    }

    get responsive(): boolean {
        if (this._isExpert) {
            return false;
        }
        return this._responsive;
    }

    @HostBinding('class.is-expert')
    get _isExpert(): boolean {
        return this.appearance === 'expert';
    }

    constructor(
        private _cdr: ChangeDetectorRef,
        @Optional() @Inject(CIRCLE_TOGGLE_GROUP_DEFAULT_OPTIONS) private _defaultOptions: CircleToggleGroupDefaultOptions,
    ) {}

    /** @docs-private */
    get selectedButton(): ToggleButton | null {
        return this.buttons ? this.buttons.find(button => button.checked) || null : null;
    }

    /** @docs-private */
    get buttons() {
        return this._buttons;
    }

    @ContentChildren(ToggleButton, { descendants: true }) private _buttons!: QueryList<ToggleButton>;

    private _id = `nx-circle-toggle-group-${nextId++}`;
    private _destroyed: Subject<void> = new Subject();

    /** An event emitted when the selection changes. Outputs the value of the currently selected button. */
    @Output()
    valueChange: EventEmitter<any> = new EventEmitter();

    private _name = `toggle-group-${nextId++}`;

    private _disabled = false;

    _negative = false;

    private _value!: string;

    private _responsive = true;

    private _appearance: NxCircleToggleGroupAppearance | undefined;

    /**
     * **Expert option**
     *
     * Sets the appearance of the circle toggle group. Default: 'default'
     */
    @Input()
    set appearance(value: NxCircleToggleGroupAppearance) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._cdr.markForCheck();
        }
    }

    get appearance(): NxCircleToggleGroupAppearance {
        return this._appearance || this._defaultOptions?.appearance || 'default';
    }

    private onChangeCallback = (value: string) => {};
    private onTouchedCallback = () => {};

    writeValue(value: any) {
        if (this.value !== value) {
            this._value = value;
            this.notifySelectedChild(value);
        }
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    ngAfterViewInit() {
        this.subscribeToSelectionChanges();

        // react if a content child is deleted, added etc.
        this.buttons.changes
            .pipe(
                startWith(this.buttons),
                filter(toggles => toggles.length > 0),
                tap(async toggles =>
                    Promise.resolve().then(() => {
                        toggles.forEach((toggle: any) => toggle.toggleButton.resetClasses());
                        this.buttons.first.toggleButton.setFirstButton();
                        this.buttons.last.toggleButton.setLastButton();
                    }),
                ),
                takeUntil(this._destroyed),
            )
            .subscribe(() => this.subscribeToSelectionChanges());
    }

    /** @docs-private */
    subscribeToSelectionChanges() {
        const changedOrDestroyed = merge(this.buttons.changes, this._destroyed);

        merge(...this.buttons.map(button => button.selectionChange))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((change: any) => {
                this.onChangeCallback(change.value);
                this.valueChange.emit(change.value);
            });
    }

    /**
     * @docs-private
     * inform the selected button if the group selection is set programattically at the beginning
     */
    notifySelectedChild(newValue: string) {
        if (this.buttons) {
            const selected = this.buttons.find(button => button.value === newValue);
            if (selected) {
                selected.setGroupSelection();
            }
        }
    }

    /** @docs-private */
    updateToggleButtonsNames(): void {
        if (this.buttons) {
            this.buttons.forEach(button => (button.name = this.name));
        }
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}

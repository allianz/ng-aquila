import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    DoCheck,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    Self,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ErrorStateMatcher, mapClassNames } from '@aposin/ng-aquila/utils';
import { merge, Observable, Subject } from 'rxjs';
import { startWith, switchMap, takeUntil } from 'rxjs/operators';

import { NxRadioToggleButtonChange, NxRadioToggleButtonComponent } from './radio-toggle-button.component';
import { NxRadioToggleButtonBaseComponent } from './radio-toggle-button-base.component';

let nextId = 0;

const MAPPING = {
    negative: 'nx-radio-toggle--negative',
    small: 'nx-radio-toggle--small',
};

export const RESET_VALUES = [null, undefined, ''];

@Component({
    selector: 'nx-radio-toggle',
    templateUrl: 'radio-toggle.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['radio-toggle.component.scss'],
})
export class NxRadioToggleComponent implements ControlValueAccessor, OnDestroy, AfterContentInit, DoCheck {
    private readonly _toggleId: string = (nextId++).toString();

    private _selection: any;

    /** @docs-private */
    errorState = false;
    // emits to signal children to run change detection
    readonly _disableChange = new Subject<void>();

    /** @docs-private */
    additionalClasses = '';

    /** Sets the component to the disabled state.*/
    @Input() set disabled(value: BooleanInput) {
        const coerced = coerceBooleanProperty(value);
        if (this._disabled !== coerced) {
            this._disabled = coerced;
            this._disableChange.next();
        }
    }
    get disabled(): boolean {
        return this._disabled;
    }
    private _disabled = false;

    /** Sets the name used for accessibility. */
    @Input() set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this._cdr.markForCheck();
        }
    }
    get name(): string {
        return this._name;
    }
    private _name!: string;

    /** @docs-private */
    @ContentChildren(NxRadioToggleButtonBaseComponent) toggleButtons = new QueryList<NxRadioToggleButtonBaseComponent>();

    /** @docs-private */
    get id(): string {
        return `nx-radio-toggle-${this._toggleId}`;
    }

    /** Sets the modifiers for the component. */
    @Input('variant') set style(value: string) {
        this.additionalClasses = mapClassNames(value, [], MAPPING);
    }

    /** @docs-private */
    get selection(): any {
        return this._selection;
    }

    private readonly _destroyed = new Subject<void>();

    private onTouchedCallback = () => {};

    private onChangeCallback = (option: any) => {};

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        /** @docs-private */ @Optional() @Self() readonly ngControl: NgControl | null,
        private readonly _errorStateMatcher: ErrorStateMatcher,
        @Optional() private readonly _parentForm: NgForm | null,
        @Optional() private readonly _parentFormGroup: FormGroupDirective | null,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterContentInit(): void {
        this.toggleButtons.changes
            .pipe(
                startWith(this.toggleButtons),
                switchMap(_ => merge(...this.toggleButtons.map((button: any) => button.onChecked as Observable<NxRadioToggleButtonChange>))),
                takeUntil(this._destroyed),
            )
            .subscribe(change => {
                this._selection = change.value;
                this.change(this._selection);
            });

        this.toggleButtons.changes
            .pipe(startWith(this.toggleButtons), takeUntil(this._destroyed))
            .subscribe((toggles: QueryList<NxRadioToggleButtonComponent>) => {
                toggles.forEach(toggle => {
                    toggle.resetClasses();
                    if (toggle.value === this.selection) {
                        // We need to defer the selection for the edge case that the button with the value of this.selection
                        // didn't exist yet but was added afterwards to prevent changed after checked errors
                        setTimeout(() => toggle.select());
                    }
                });
                if (toggles.length > 0) {
                    toggles.first.setFirstButton();
                    toggles.last.setLastButton();
                }
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._disableChange.complete();
    }

    ngDoCheck(): void {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    registerOnChange(onChangeCallback: any): void {
        this.onChangeCallback = onChangeCallback;
    }

    registerOnTouched(onTouchedCallback: any): void {
        this.onTouchedCallback = onTouchedCallback;
    }

    /** Preselects the respective options. */
    @Input('selection') writeValue(value: any): void {
        this._selection = value;
        const correspondingButton = this.toggleButtons.find((button: NxRadioToggleButtonBaseComponent) => button.value === this._selection);
        if (correspondingButton) {
            (correspondingButton as NxRadioToggleButtonComponent).select();
            return;
        }
        if (RESET_VALUES.includes(value)) {
            this.toggleButtons.map((button: NxRadioToggleButtonBaseComponent) => (button as NxRadioToggleButtonComponent).deselect());
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @docs-private */
    change(value: any) {
        this.onChangeCallback(value);
        if (this.onTouchedCallback) {
            this.onTouchedCallback();
        }
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
        }
    }
}

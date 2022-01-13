import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { mapClassNames } from '@aposin/ng-aquila/utils';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Input,
    OnDestroy,
    QueryList,
    ChangeDetectorRef,
    Optional,
    Self,
    DoCheck,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject, merge } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { NxRadioToggleButtonBaseComponent } from './radio-toggle-button-base.component';
import { NxRadioToggleButtonChange, NxRadioToggleButtonComponent } from './radio-toggle-button.component';

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
export class NxRadioToggleComponent implements ControlValueAccessor, AfterViewInit, OnDestroy, AfterContentInit, DoCheck {
    private _toggleId: string = (nextId++).toString();

    private _selection: any;

    private _destroyed: Subject<void> = new Subject();

    private _disabled: boolean = false;
    /** @docs-private */
    errorState: boolean = false;
    // emits to signal children to run change detection
    _disableChange = new Subject<void>();

    /** @docs-private */
    additionalClasses: string = '';

    /** Sets the component to the disabled state.*/
    @Input('nxDisabled')
    set disabled(value: BooleanInput) {
        const coerced = coerceBooleanProperty(value);
        if (this._disabled !== coerced) {
            this._disabled = coerced;
            this._disableChange.next();
        }
    }

    get disabled(): boolean {
        return this._disabled;
    }

    private _name!: string;

    /** Sets the name used for accessibility. */
    @Input('nxName')
    set name(value: string) {
        if (this._name !== value) {
            this._name = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    get name(): string {
        return this._name;
    }

    /** @docs-private */
    @ContentChildren(NxRadioToggleButtonBaseComponent)
    toggleButtons: QueryList<NxRadioToggleButtonBaseComponent> = new QueryList();

    private onTouchedCallback = () => {};

    private onChangeCallback = (option: any) => {};

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        /** @docs-private */
        @Optional() @Self() public ngControl: NgControl,
        private _errorStateMatcher: ErrorStateMatcher,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterViewInit() {
        this.subscribeToToggleButtonsChange();
    }

    ngAfterContentInit() {
        const changedOrDestroyed = merge(this.toggleButtons.changes, this._destroyed);

        merge(...this.toggleButtons.map<NxRadioToggleButtonChange[]>((button: any) => button.onChecked))
            .pipe(takeUntil(changedOrDestroyed))
            .subscribe((change: NxRadioToggleButtonChange) => {
                this._selection = change.value;
                this.change(this._selection);
            });
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
        this._disableChange.complete();
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    /** @docs-private */
    subscribeToToggleButtonsChange(): void {
        this.toggleButtons.changes
            .pipe(
                startWith(this.toggleButtons),
                filter(toggles => toggles.length > 0),
                takeUntil(this._destroyed),
            )
            .subscribe(toggles => {
                toggles.forEach((toggle: NxRadioToggleButtonComponent) => {
                    toggle.resetClasses();
                    if (toggle.value === this.selection) {
                        // We need to defer the selection for the edge case that the button with the value of this.selection
                        // didn't exist yet but was added afterwards to prevent changed after checked errors
                        setTimeout(() => toggle.select());
                    }
                });
                toggles.first.setFirstButton();
                toggles.last.setLastButton();
            });
    }

    registerOnChange(onChangeCallback: any): void {
        this.onChangeCallback = onChangeCallback;
    }

    registerOnTouched(onTouchedCallback: any): void {
        this.onTouchedCallback = onTouchedCallback;
    }

    /** Preselects the respective options. */
    @Input('nxSelection')
    writeValue(value: any): void {
        this._selection = value;
        const correspondingButton = this.toggleButtons.find((button: NxRadioToggleButtonBaseComponent) => button.value === this._selection);
        if (correspondingButton) {
            (correspondingButton as NxRadioToggleButtonComponent).select();
            return;
        }
        if (RESET_VALUES.indexOf(value) > -1) {
            this.toggleButtons.map((button: NxRadioToggleButtonBaseComponent) => (button as NxRadioToggleButtonComponent).deselect());
        }
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @docs-private */
    get id(): string {
        return `nx-radio-toggle-${this._toggleId}`;
    }

    /** Sets the modifiers for the component. */
    @Input('nxStyle')
    set style(value: string) {
        this.additionalClasses = mapClassNames(value, [], MAPPING);
    }

    /**
     * @docs-private
     */
    get selection(): any {
        return this._selection;
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

import {
    AfterContentChecked,
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    Inject,
    InjectionToken,
    Input,
    OnDestroy,
    Optional,
    QueryList,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { asapScheduler, merge, Subject } from 'rxjs';
import { observeOn, startWith, takeUntil } from 'rxjs/operators';

import { NxFormfieldAppendixDirective } from './appendix.directive';
import { NxFormfieldErrorDirective } from './error.directive';
import { NxFormfieldControl, NxFormfieldUpdateEventType } from './formfield-control';
import { NxFormfieldHintDirective } from './hint.directive';
import { NxFormfieldLabelDirective } from './label.directive';
import { NxFormfieldNoteDirective } from './note.directive';
import { NxFormfieldPrefixDirective } from './prefix.directive';
import { NxFormfieldSuffixDirective } from './suffix.directive';

let nextUniqueId = 0;

/**
 * Represents the default options for the form field that can be configured
 * using the `FORMFIELD_DEFAULT_OPTIONS` injection token.
 */
export interface FormfieldDefaultOptions {
    /** Sets the default appearance. (optional) */
    appearance?: AppearanceType;

    /** Sets the default float label type. (optional) */
    nxFloatLabel?: FloatLabelType;

    /** Sets the default change detection trigger event. (optional) */
    updateOn?: NxFormfieldUpdateEventType;

    nxOptionalLabel?: string;
}

export const FORMFIELD_DEFAULT_OPTIONS = new InjectionToken<FormfieldDefaultOptions>('FORMFIELD_DEFAULT_OPTIONS');

/** Type for the available floatLabel values. */
export type FloatLabelType = 'always' | 'auto';

/** Type for the appearance of the formfield. */
export type AppearanceType = 'outline' | 'auto';

@Component({
    selector: 'nx-formfield',
    templateUrl: 'formfield.component.html',
    styleUrls: ['formfield.scss', '../input/input.scss'],
    host: {
        '[class.nx-formfield]': 'true',
        '[class.is-disabled]': 'this._control.disabled',
        '[class.is-readonly]': 'this._control.readonly',
        '[class.is-filled]': 'this._control.empty === false',
        '[class.is-focused]': 'this._control.focused',
        '[class.is-floating]': 'this.shouldLabelFloat',
        '[class.is-auto-floating]': 'this.floatLabel === "auto"',
        '[class.has-error]': 'this._control.errorState',
        '[class.has-outline]': 'this.appearance === "outline"',
        '[class.has-hint]': 'this._hintChildren?.length > 0',
        '[class.nx-formfield--negative]': 'this._negative',
        '(focusout)': '_onBlur()',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class NxFormfieldComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
    protected _negative = false;
    private _styles = '';

    /** Html id of the formfield label */
    readonly labelId: string = `nx-formfield-label-${nextUniqueId++}`;

    @ContentChild(NxFormfieldControl) _control!: NxFormfieldControl<any>;

    /**
     * Sets the label which will act as a floating label.
     * In addition, the component uses input and label to properly support accessibility.
     */
    @Input() label?: string | null;

    /**
     * Set optional text, which will addtional show in label if a field is not mandatory.
     */
    @Input() optionalLabel? = this._defaultOptions?.nxOptionalLabel;
    get optional() {
        if (this._isRequired() || !this.optionalLabel) {
            return '';
        }

        return this.optionalLabel;
    }

    @ContentChild(NxFormfieldLabelDirective) _labelChild!: NxFormfieldLabelDirective;
    @ContentChildren(NxFormfieldHintDirective) _hintChildren!: QueryList<NxFormfieldHintDirective>;
    @ContentChildren(NxFormfieldNoteDirective) _noteChildren!: QueryList<NxFormfieldNoteDirective>;
    @ContentChildren(NxFormfieldErrorDirective) _errorChildren!: QueryList<NxFormfieldErrorDirective>;
    @ContentChildren(NxFormfieldSuffixDirective) _suffixChildren!: QueryList<NxFormfieldSuffixDirective>;
    @ContentChildren(NxFormfieldPrefixDirective) _prefixChildren!: QueryList<NxFormfieldPrefixDirective>;
    @ContentChildren(NxFormfieldAppendixDirective) _appendixChildren!: QueryList<NxFormfieldAppendixDirective>;

    @ViewChild('connectionContainer', { static: true }) _connectionContainerRef!: ElementRef;

    /**
     * Whether the label should float once the input is focused or filled (auto, default)
     * or force it to always float with a value of always to simulate a more static form.
     */
    @Input() set floatLabel(value: FloatLabelType) {
        if (value !== this._floatLabel) {
            this._floatLabel = value || 'auto';
            this._cdr.markForCheck();
        }
    }
    get floatLabel(): FloatLabelType {
        return this._floatLabel || this._defaultOptions?.nxFloatLabel || 'auto';
    }
    private _floatLabel!: FloatLabelType;

    /**
     * Sets the styling of the formfield.
     * If 'negative', a negative set of stylings is used.
     */
    @Input('negative') set styles(value: string) {
        this._negative = !!value.match(/negative/);
        this._styles = value;
    }
    get styles() {
        return this._styles;
    }

    /**
     * **Expert option**
     *
     * Sets the appearance of the formfield.
     */
    @Input() set appearance(value: AppearanceType) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._cdr.markForCheck();
        }
    }
    get appearance(): AppearanceType {
        return this._appearance || this._defaultOptions?.appearance || 'auto';
    }
    private _appearance!: AppearanceType;

    /**
     *
     * Sets the event that triggers change detection in the formfield.
     */
    @Input() set updateOn(value: NxFormfieldUpdateEventType) {
        this._updateOn = value;
    }
    get updateOn(): NxFormfieldUpdateEventType {
        return this._updateOn || this._defaultOptions?.updateOn || 'change';
    }
    private _updateOn!: NxFormfieldUpdateEventType;

    get _shouldAlwaysFloat(): boolean {
        return this.floatLabel === 'always';
    }

    /** @docs-private */
    get shouldLabelFloat(): boolean {
        return this._control.shouldLabelFloat || this._shouldAlwaysFloat;
    }

    /** @docs-private */
    get control() {
        return this._control;
    }

    private readonly _destroyed = new Subject<void>();

    constructor(
        /** @docs-private */ readonly elementRef: ElementRef,
        private readonly renderer: Renderer2,
        private readonly _cdr: ChangeDetectorRef,
        @Optional() @Inject(FORMFIELD_DEFAULT_OPTIONS) private readonly _defaultOptions: FormfieldDefaultOptions | null,
    ) {}

    ngAfterContentInit(): void {
        this._validateControlChild();

        if (this._control.controlType) {
            this.elementRef.nativeElement.classList.add(`nx-formfield--type-${this._control.controlType}`);

            if (this._control.updateOn) {
                this._control.updateOn = this.updateOn;
            }
        }

        if (this.updateOn === 'change') {
            // Subscribe to changes in the child control state in order to update the form field UI.
            this._control.stateChanges.pipe(startWith(null), observeOn(asapScheduler), takeUntil(this._destroyed)).subscribe(() => {
                this._syncDescribedByIds();
                this._cdr.markForCheck();
            });

            merge(
                this._hintChildren.changes,
                this._appendixChildren.changes,
                this._prefixChildren.changes,
                this._suffixChildren.changes,
                this._noteChildren.changes,
            )
                .pipe(startWith(null), takeUntil(this._destroyed))
                .subscribe(() => {
                    this._cdr.markForCheck();
                });

            // Update the aria-described by when the number of errors changes.
            this._errorChildren.changes.pipe(startWith(null), observeOn(asapScheduler), takeUntil(this._destroyed)).subscribe(() => {
                this._syncDescribedByIds();
                this._cdr.markForCheck();
            });
        }

        // Whenever there are updates to ngControl, it's necessary to trigger change detection to ensure the view reflects these changes
        this._control.ngControl?.valueChanges?.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this._cdr.markForCheck();
        });
    }

    ngAfterContentChecked(): void {
        this._validateControlChild();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** @docs-private */
    getDisplayedMessage(): 'note' | 'error' | '' {
        if (this._control.errorState && this._errorChildren && this._errorChildren.length > 0) {
            return 'error';
        }
        if (this._noteChildren && this._noteChildren.length > 0) {
            return 'note';
        }

        return '';
    }

    private _syncDescribedByIds() {
        if (this._control) {
            let ids: string[] = [];
            ids = this._hintChildren.map(hint => hint.id);

            if (this.getDisplayedMessage() === 'note') {
                ids = [...this._noteChildren.map(hint => hint.id), ...ids];
            } else if (this._errorChildren) {
                ids = [...this._errorChildren.map(error => error.id), ...ids];
            }

            this._control.setDescribedByIds(ids);
        }
    }

    // Fail if the required control is missing.
    protected _validateControlChild() {
        if (!this._control) {
            throw new Error('Formfield must contain a NxFormfieldControl like input[nxInput] or a custom implementation');
        }
    }

    /** Returns an element that overlays can attach to. */
    getConnectedOverlayOrigin(): ElementRef {
        return this._connectionContainerRef || this.elementRef;
    }

    /** @docs-private */
    _hasLabel() {
        return !!this._labelChild || !!this.label;
    }

    /**
     * The placeholder is hidden when
     * - the control is not empty
     * - The label is not floated
     * @docs-private
     */
    _hideControlPlaceholder() {
        return (!this.shouldLabelFloat && this._hasLabel()) || !this._control.empty;
    }

    _getTitle(): string {
        if (!this._labelChild) {
            return this.label ?? '';
        }
        return this._labelChild.el.nativeElement?.innerText;
    }

    _onBlur() {
        if (this.updateOn === 'blur') {
            this._validateControlChild();
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        }
    }

    _isRequired() {
        return this._control.ngControl?.control?.hasValidator(Validators.required) || false;
    }

    _isOutline() {
        return this.appearance === 'outline';
    }

    _isNxInput() {
        return this._control.elementRef.nativeElement.tagName === 'INPUT' && this._control.elementRef.nativeElement.hasAttribute('nxInput');
    }

    /** @docs-private */
    get inputValueText() {
        if (!this._control.readonly && !this._control.disabled) {
            return;
        }
        return (this._control.elementRef.nativeElement.value || '').trim();
    }

    _isEllipsisActive() {
        return this._control.elementRef.nativeElement.offsetWidth < this._control.elementRef.nativeElement.scrollWidth;
    }
}

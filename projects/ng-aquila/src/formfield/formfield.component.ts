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
import { getClassNameList } from '@aposin/ng-aquila/utils';
import { merge, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { NxFormfieldAppendixDirective } from './appendix.directive';
import { NxFormfieldErrorDirective } from './error.directive';
import { NxFormfieldControl } from './formfield-control';
import { NxFormfieldHintDirective } from './hint.directive';
import { NxFormfieldLabelDirective } from './label.directive';
import { NxFormfieldNoteDirective } from './note.directive';
import { NxFormfieldPrefixDirective } from './prefix.directive';
import { NxFormfieldSuffixDirective } from './suffix.directive';

const NX_STYLES = {
    negative: 'nx-formfield--negative',
};

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
        '[class.has-error]': 'this._control.errorState',
        '[class.has-outline]': 'this.appearance === "outline"',
        '[class.has-hint]': 'this._hintChildren?.length > 0',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class NxFormfieldComponent implements AfterContentInit, AfterContentChecked, OnDestroy {
    private _styles = '';
    private _subscriptions: Subscription = new Subscription();

    /** Html id of the formfield label */
    readonly labelId: string = `nx-formfield-label-${nextUniqueId++}`;

    @ContentChild(NxFormfieldControl) _control!: NxFormfieldControl<any>;

    /**
     * Sets the label which will act as a floating label.
     * In addition, the component uses input and label to properly support accessibility.
     */
    @Input('nxLabel') label!: string;

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
    @Input('nxFloatLabel')
    get floatLabel(): FloatLabelType {
        return this._floatLabel || this._defaultOptions?.nxFloatLabel || 'auto';
    }
    set floatLabel(value: FloatLabelType) {
        if (value !== this._floatLabel) {
            this._floatLabel = value || 'auto';
            this._cdr.markForCheck();
        }
    }
    private _floatLabel!: FloatLabelType;

    /**
     * Sets the styling of the formfield.
     * If 'negative', a negative set of stylings is used.
     */
    @Input('nxStyle')
    set styles(value: string) {
        if (this._styles === value) {
            return;
        }

        const classNames = getClassNameList(value, NX_STYLES);

        classNames.forEach(classStr => {
            this.renderer.addClass(this.elementRef.nativeElement, classStr);
        });

        this._styles = value;
    }

    private _appearance!: AppearanceType;

    /**
     * **Expert option**
     *
     * Sets the appearance of the formfield.
     */
    @Input()
    set appearance(value: AppearanceType) {
        if (this._appearance !== value) {
            this._appearance = value;
            this._cdr.markForCheck();
        }
    }
    get appearance(): AppearanceType {
        return this._appearance || this._defaultOptions?.appearance || 'auto';
    }

    get _shouldAlwaysFloat(): boolean {
        return this.floatLabel === 'always';
    }

    /** @docs-private */
    get shouldLabelFloat(): boolean {
        return this._control.shouldLabelFloat || this._shouldAlwaysFloat;
    }

    constructor(
        /** @docs-private */
        public elementRef: ElementRef,
        private renderer: Renderer2,
        private _cdr: ChangeDetectorRef,
        @Optional() @Inject(FORMFIELD_DEFAULT_OPTIONS) private _defaultOptions: FormfieldDefaultOptions,
    ) {}

    /** @docs-private */
    get control() {
        return this._control;
    }

    ngAfterContentInit() {
        let subscription;

        this._validateControlChild();

        if (this._control.controlType) {
            this.elementRef.nativeElement.classList.add(`nx-formfield--type-${this._control.controlType}`);
        }

        // Subscribe to changes in the child control state in order to update the form field UI.
        subscription = this._control.stateChanges.pipe(startWith(null)).subscribe(() => {
            Promise.resolve().then(() => {
                this._syncDescribedByIds();
                this._cdr.markForCheck();
            });
        });

        this._subscriptions.add(subscription);

        subscription = merge(this._hintChildren.changes, this._appendixChildren.changes, this._prefixChildren.changes, this._suffixChildren.changes)
            .pipe(startWith(null))
            .subscribe(() => {
                this._cdr.markForCheck();
            });

        this._subscriptions.add(subscription);

        // Update the aria-described by when the number of errors changes.
        subscription = this._errorChildren.changes.pipe(startWith(null)).subscribe(() => {
            Promise.resolve().then(() => {
                this._syncDescribedByIds();
                this._cdr.markForCheck();
            });
        });
        this._subscriptions.add(subscription);
    }

    ngAfterContentChecked() {
        this._validateControlChild();
    }

    ngOnDestroy() {
        this._subscriptions.unsubscribe();
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

    /** @docs-private */
    getConnectedOverlayOrigin(): ElementRef {
        return this._connectionContainerRef || this.elementRef;
    }

    /** @docs-private */
    _hasLabel() {
        return !!this._labelChild || !!this.label;
    }

    /** @docs-private
     * The placeholder is hidden when
     *  - the control is not empty
     *  - The label is not floated
     * */
    _hideControlPlaceholder() {
        return (!this.shouldLabelFloat && this._hasLabel()) || !this._control.empty;
    }
}

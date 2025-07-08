import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    afterEveryRender,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    computed,
    contentChild,
    contentChildren,
    forwardRef,
    HostListener,
    inject,
    Injector,
    Input,
    OnDestroy,
} from '@angular/core';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { merge, Observable, Subject } from 'rxjs';
import { delay, takeUntil, throttleTime } from 'rxjs/operators';

import { NaturalLanguageFormErrorWrapper } from './natural-language-form-error-wrapper';
import { NxWordComponent } from './word.component';

/** Size of the NLF. */
export type NxNaturalLanguageFormSize = 'small' | 'large';

const DEFAULT_SIZE = 'large';

@Component({
    selector: 'nx-natural-language-form',
    templateUrl: 'natural-language-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['natural-language-form.scss'],
    host: {
        '[class.is-negative]': 'negative',
        '[class.nx-natural-language-form--small]': 'size === "small"',
        '[class.nx-natural-language-form--large]': 'size === "large"',
    },
    providers: [
        {
            provide: NaturalLanguageFormErrorWrapper,
            useExisting: forwardRef(() => NxNaturalLanguageFormComponent),
        },
    ],
    standalone: true,
})
export class NxNaturalLanguageFormComponent implements AfterContentInit, OnDestroy, NaturalLanguageFormErrorWrapper {
    /** Whether the negative set of stylings should be used. */
    @Input('negativeStyles') set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
    }
    get negative() {
        return this._negative;
    }
    private _negative = false;

    private _injector = inject(Injector);
    /**
     * Sets the size of the NLF. Default value: large.
     */
    @Input() set size(value: NxNaturalLanguageFormSize) {
        this._size = value;
        this._cdr.markForCheck();
    }
    get size(): NxNaturalLanguageFormSize {
        return this._size;
    }
    /** @docs-private */
    private _size: NxNaturalLanguageFormSize = DEFAULT_SIZE;

    /** @docs-private */
    readonly resizeEvent$ = new Subject<void>();

    /** @docs-private */
    resizeObservable!: Observable<void>;

    protected readonly _errorComponent = contentChild<NxErrorComponent>(NxErrorComponent);

    /**
     * @docs-private
     * The id of the error component. This is referenced by the word components in case of an error and no provided describedBy value
     */
    readonly _errorId = computed<string | undefined>(() => this._errorComponent()?.id);

    /**
     * All nx-word content children.
     */
    private readonly _wordsComponents = contentChildren<NxWordComponent>(NxWordComponent);

    /**
     * Readable Signal of collective nx-word error states
     * @returns `true` if at least one word has an error. `false` if no word as an error.
     */
    protected readonly wordsErrorStates = computed<boolean>(() => {
        if (!this._wordsComponents()) {
            return false;
        }

        return this._wordsComponents().some(word => word._hasErrors());
    });

    private readonly _destroyed = new Subject<void>();

    constructor(private readonly _cdr: ChangeDetectorRef) {
        afterEveryRender(
            {
                write: () => {
                    this.updatePositionPopovers();
                },
            },
            { injector: this._injector },
        );
    }

    /** @docs-private */
    @HostListener('window:orientationchange', ['$event'])
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
        this.resizeEvent$.next();
    }

    ngAfterContentInit(): void {
        // Collect all words and listen for changes so we can update any open error popover
        // which would otherwise get wrongly positioned.
        const subjects = this._wordsComponents().map((word: NxWordComponent) => word.inputChanges);
        const source = merge(...subjects);

        source.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.updatePositionPopovers();
        });

        this.resizeObservable = this.resizeEvent$.pipe(throttleTime(500), delay(100));
        this.resizeObservable.pipe(takeUntil(this._destroyed)).subscribe(() => this.resizeWords());
    }

    /** @docs-private */
    resizeWords() {
        this._wordsComponents().forEach((word: NxWordComponent) => {
            word.updateCurrentTextWidth();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** @docs-private */
    updatePositionPopovers() {
        if (this._wordsComponents()) {
            this._wordsComponents().forEach((word: NxWordComponent) => {
                word.repositionError();
            });
        }
    }
}

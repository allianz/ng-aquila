import { AnimationEvent } from '@angular/animations';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Inject,
    InjectionToken,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    SimpleChanges,
    SkipSelf,
    ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';

import { NxAccordionDirective } from './accordion';
import { nxAccordionAnimations } from './accordion-animations';
import { NxExpansionPanelBodyDirective } from './expansion-panel-body';

let nextId = 0;

/** The styling of the accordion. */
export type AccordionStyle = 'regular' | 'light' | 'extra-light';
const DEFAULT_TYPE = 'regular';

/**
 * This interface defines the default options of the expansion-panel.
 */
export interface ExpansionPanelDefaultOptions {
    scrollIntoViewActive: boolean;
    scrollIntoViewOptions?: ScrollIntoViewOptions;
}

/** Injection token that determines whether and how the body should scroll into view. */
export const EXPANSION_PANEL_DEFAULT_OPTIONS = new InjectionToken<ExpansionPanelDefaultOptions>('EXPANSION_PANEL_DEFAULT_OPTIONS', {
    factory: () => ({
        scrollIntoViewActive: false,
        scrollIntoViewOptions: {
            behavior: 'smooth',
        },
    }),
});

@Component({
    selector: 'nx-expansion-panel',
    exportAs: 'NxExpansionPanelComponent',
    templateUrl: 'expansion-panel.html',
    styleUrls: ['expansion-panel.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [nxAccordionAnimations.bodyExpansion],
    host: {
        '[class.nx-expanded]': 'expanded',
        '[class.nx-expansion-panel--light]': '_accordionStyle === "light"',
        '[class.nx-expansion-panel--regular]': '_accordionStyle === "regular"',
        '[class.nx-expansion-panel--extra-light]': '_accordionStyle === "extra-light"',
        '[class.nx-expansion-panel--negative]': 'negative',
        '[class.is-disabled]': 'disabled',
    },
    providers: [
        // Provide NxAccordionDirective as undefined to prevent nested expansion panels from registering
        // to the same accordion.
        { provide: NxAccordionDirective, useValue: undefined },
    ],
})
export class NxExpansionPanelComponent extends CdkAccordionItem implements AfterContentInit, OnChanges, OnDestroy {
    /** Whether the negative set of styles should be used. */
    @Input() set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
    }
    get negative(): boolean {
        return this._negative!;
    }
    private _negative: boolean | null = null;

    _accordionStyle: AccordionStyle = DEFAULT_TYPE;

    /**
     * Value for the styling that should be chosen.
     * Default: `'regular'`.
     */
    @Input('variant') set style(value: AccordionStyle) {
        value = value ? value : DEFAULT_TYPE;

        const [newValue] = value.match(/regular|light|extra-light/) || [DEFAULT_TYPE];
        this._style = newValue as AccordionStyle;
        this._accordionStyle = newValue as AccordionStyle;
    }
    get style(): AccordionStyle {
        return this._style!;
    }
    private _style: AccordionStyle | null = null;

    /** Whether scrollIntoView should be enabled. */
    @Input() scrollIntoViewActive? = this._defaultOptions?.scrollIntoViewActive;

    /** Configuration for the scrollIntoView behaviour after the expand animation is done. */
    @Input() scrollIntoViewOptions? = this._defaultOptions?.scrollIntoViewOptions;

    /** @docs-private */
    @ContentChild(NxExpansionPanelBodyDirective) lazyContent: any;

    private _portal!: TemplatePortal;

    /** @docs-private */
    get portal() {
        return this._portal;
    }

    _headerId = `nx-expansion-panel-header-${nextId++}`;

    /** Stream that emits for changes in `@Input` properties. */
    readonly _inputChanges = new Subject<SimpleChanges>();

    constructor(
        /** @docs-private */ @Optional() @SkipSelf() readonly accordion: NxAccordionDirective, // not typed as nullable: super class does not support `null`
        _cdr: ChangeDetectorRef,
        _expansionDispatcher: UniqueSelectionDispatcher,
        private readonly _viewContainerRef: ViewContainerRef,
        @Optional() @Inject(EXPANSION_PANEL_DEFAULT_OPTIONS) private readonly _defaultOptions: ExpansionPanelDefaultOptions,
    ) {
        super(accordion!, _cdr, _expansionDispatcher);
    }

    ngAfterContentInit(): void {
        if (this.lazyContent) {
            // Render the content as soon as the panel becomes open.
            this.opened
                .pipe(
                    startWith(null),
                    filter(() => this.expanded && !this._portal),
                    take(1),
                )
                .subscribe(() => {
                    this._portal = new TemplatePortal(this.lazyContent._template, this._viewContainerRef);
                });
        }

        // Inherit appearance given by the accordion (if any).
        if (this.accordion) {
            if (this.style === null && this.accordion.style !== null) {
                this.style = this.accordion.style;
            }

            if (this.negative === null && this.accordion.negative !== null) {
                this.negative = this.accordion.negative;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._inputChanges.next(changes);
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._inputChanges.complete();
    }

    /** @docs-private */
    getOpenState() {
        return this.expanded ? 'open' : 'closed';
    }

    /** @docs-private */
    bodyExpansionDone(event: AnimationEvent) {
        if (event.fromState === 'closed' && event.toState === 'open') {
            event.element.scrollIntoView(this.scrollIntoViewOptions);
        }
    }
}

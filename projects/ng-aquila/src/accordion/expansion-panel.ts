import { CdkAccordionItem } from '@angular/cdk/accordion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, OnChanges, OnDestroy, Optional, SimpleChanges, SkipSelf, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, take } from 'rxjs/operators';

import { NxAccordionDirective } from './accordion';
import { nxAccordionAnimations } from './accordion-animations';
import { NxExpansionPanelBodyDirective } from './expansion-panel-body';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';

let nextId = 0;

/** The styling of the accordion. */
export type AccordionStyle = 'regular' | 'light' | 'extra-light';
const DEFAULT_TYPE = 'regular';

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
    @Input()
    set negative(value: boolean) {
        this._negative = coerceBooleanProperty(value);
    }
    get negative(): boolean {
        return this._negative as boolean;
    }

    private _negative: boolean | null = null;
    _accordionStyle: AccordionStyle = DEFAULT_TYPE;

    /**
     * Value for the styling that should be chosen.
     * Default value: 'regular'.
     */
    @Input('nxStyle')
    set style(value: AccordionStyle) {
        value = value ? value : DEFAULT_TYPE;

        const [newValue] = value.match(/regular|light|extra-light/) || [DEFAULT_TYPE];
        this._style = newValue as AccordionStyle;
        this._accordionStyle = newValue as AccordionStyle;
    }

    get style(): AccordionStyle {
        return this._style as AccordionStyle;
    }

    private _style: AccordionStyle | null = null;

    /** @docs-private */
    @ContentChild(NxExpansionPanelBodyDirective) lazyContent: any;

    private _portal!: TemplatePortal;

    /** @docs-private */
    get portal() {
        return this._portal;
    }

    /** @docs-private */
    accordion: NxAccordionDirective;
    _headerId = `nx-expansion-panel-header-${nextId++}`;

    /** Stream that emits for changes in `@Input` properties. */
    readonly _inputChanges = new Subject<SimpleChanges>();

    constructor(@Optional() @SkipSelf() accordion: NxAccordionDirective, _changeDetectorRef: ChangeDetectorRef, _expansionDispatcher: UniqueSelectionDispatcher, private _viewContainerRef: ViewContainerRef) {
        super(accordion, _changeDetectorRef, _expansionDispatcher);
        this.accordion = accordion;
    }

    ngAfterContentInit() {
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
        if (Boolean(this.accordion)) {
            if (this.style === null && this.accordion.style !== null) {
                this.style = this.accordion.style;
            }

            if (this.negative === null && this.accordion.negative !== null) {
                this.negative = this.accordion.negative;
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        this._inputChanges.next(changes);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this._inputChanges.complete();
    }

    /** @docs-private */
    getOpenState() {
        return this.expanded ? 'open' : 'closed';
    }

    static ngAcceptInputType_negative: BooleanInput | '';
}

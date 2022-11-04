import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';

/**
 * The appearance of the breadcrumb.
 */
export type NxBreadcrumpAppearance = 'default' | 'link';

@Component({
    selector: 'ol[nxBreadcrumb]',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.is-negative]': 'negative',
        '[class.is-link]': 'appearance === "link"',
    },
})
export class NxBreadcrumbComponent implements AfterContentInit, OnDestroy {
    /**
     * Sets the appearance of the breadcrumb.
     *
     * Default: `'default'`.
     */
    @Input() set appearance(value: NxBreadcrumpAppearance) {
        this._appeareance = value;
        this._cdr.markForCheck();
    }
    get appearance() {
        return this._appeareance;
    }
    private _appeareance: NxBreadcrumpAppearance = 'default';

    /** Whether the component uses the negative styling. */
    @Input() set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get negative() {
        return this._negative;
    }
    private _negative = false;

    /** @docs-private */
    @ContentChildren(NxBreadcrumbItemComponent, { descendants: true }) breadcrumbItems!: QueryList<NxBreadcrumbItemComponent>;

    private readonly _destroyed = new Subject<void>();

    constructor(private readonly _cdr: ChangeDetectorRef) {}

    ngAfterContentInit(): void {
        if (this.breadcrumbItems.length === 0) {
            console.warn('A breadcrumb needs NxBreadcrumbItemComponent children wrapped in <li>!');
        }

        this.breadcrumbItems.changes
            .pipe(
                startWith(this.breadcrumbItems),
                filter(items => items.length !== 0),
                takeUntil(this._destroyed),
            )
            .subscribe(items => {
                this.breadcrumbItems.forEach(item => item.resetAriaLabel());
                this.breadcrumbItems.last.setAsLast();
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}

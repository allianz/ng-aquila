import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { Component, ContentChildren, QueryList, Input, AfterContentInit, OnDestroy, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { NxBreadcrumbItemComponent } from './breadcrumb-item.component';
import { startWith, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
    _destroyed: Subject<void> = new Subject();

    private _negative: boolean = false;

    private _appeareance: NxBreadcrumpAppearance = 'default';

    /**
     * Sets the appearance of the breadcrumb. default: 'default'
     */
    @Input()
    set appearance(value: NxBreadcrumpAppearance) {
        this._appeareance = value;
        this._cdr.markForCheck();
    }

    get appearance() {
        return this._appeareance;
    }

    /** Whether the component uses the negative styling. */
    @Input()
    set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }

    get negative() {
        return this._negative;
    }

    /**@docs-private */
    @ContentChildren(NxBreadcrumbItemComponent, { descendants: true })
    breadcrumbItems!: QueryList<NxBreadcrumbItemComponent>;

    constructor(private _cdr: ChangeDetectorRef) {}

    ngAfterContentInit() {
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

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }
}

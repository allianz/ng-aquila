import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NxDateAdapter, NX_DATE_LOCALE } from '@aposin/ng-aquila/datefield';
import { Moment } from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Localizing date example
 */
@Component({
    selector: 'datefield-localize-date-example',
    templateUrl: './datefield-localize-date-example.html',
    styleUrls: ['./datefield-localize-date-example.css'],
})
export class DatefieldLocalizeDateExampleComponent
    implements OnInit, OnDestroy
{
    public currentDate: Moment | null = null;
    public currentLocale = this.nxDateLocale;

    private readonly _destroyed = new Subject<void>();

    constructor(
        public nxDateAdapter: NxDateAdapter<Moment>,
        @Inject(NX_DATE_LOCALE) public nxDateLocale: string,
    ) {}

    ngOnInit(): void {
        this.nxDateAdapter.localeChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(locale => {
                this.currentLocale = locale;
            });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    changeLocal(value: string) {
        this.nxDateAdapter.setLocale(value);
    }
}

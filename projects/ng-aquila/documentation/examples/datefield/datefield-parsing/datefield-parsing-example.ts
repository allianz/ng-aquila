import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NX_DATE_LOCALE,
    NxDateAdapter,
    NxDatefieldDirective,
} from '@aposin/ng-aquila/datefield';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxSwitcherComponent } from '@aposin/ng-aquila/switcher';
import moment, { Moment } from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * @title Parsing example
 */
@Component({
    selector: 'datefield-parsing-example',
    templateUrl: './datefield-parsing-example.html',
    styleUrls: ['./datefield-parsing-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxHeadlineComponent,
        NxFormfieldComponent,
        NxDatefieldDirective,
        NxInputDirective,
        FormsModule,
        NxSwitcherComponent,
    ],
})
export class DatefieldParsingExampleComponent implements OnInit, OnDestroy {
    strictDate = moment();
    nonStrictDate = moment();
    openedStrict = false;
    openedNonStrict = false;
    currentLocale = this.nxDateLocale;
    parseFormat = 'MM/DD/YYYY';

    private readonly _destroyed = new Subject<void>();

    constructor(
        readonly nxDateAdapter: NxDateAdapter<Moment>,
        @Inject(NX_DATE_LOCALE) readonly nxDateLocale: string,
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
}

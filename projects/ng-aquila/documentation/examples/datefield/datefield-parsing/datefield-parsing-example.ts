import { Component, Inject } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { NxDateAdapter, NX_DATE_LOCALE } from '@aposin/ng-aquila/datefield';

/**
 * @title Parsing example
 */
@Component({
    selector: 'datefield-parsing-example',
    templateUrl: './datefield-parsing-example.html',
    styleUrls: ['./datefield-parsing-example.css'],
})
export class DatefieldParsingExampleComponent {
    public strictDate = moment();
    public nonStrictDate = moment();
    public openedStrict = false;
    public openedNonStrict = false;
    public currentLocale: string;
    public parseFormat = 'MM/DD/YYYY';

    constructor(
        public nxDateAdapter: NxDateAdapter<Moment>,
        @Inject(NX_DATE_LOCALE) public nxDateLocale: string,
    ) {
        this.currentLocale = nxDateLocale;

        this.nxDateAdapter.localeChanges.subscribe(locale => {
            this.currentLocale = locale;
        });
    }
}

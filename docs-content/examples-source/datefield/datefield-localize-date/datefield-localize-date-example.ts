import { Component, Inject } from '@angular/core';
import { NxDateAdapter, NX_DATE_LOCALE } from '@aposin/ng-aquila/datefield';
import { Moment } from 'moment';

/**
 * @title Localizing date example
 */
@Component({
    selector: 'datefield-localize-date-example',
    templateUrl: './datefield-localize-date-example.html',
    styleUrls: ['./datefield-localize-date-example.css'],
})
export class DatefieldLocalizeDateExampleComponent {
    public currentDate: Moment | null = null;
    public currentLocale;

    constructor(
        public nxDateAdapter: NxDateAdapter<Moment>,
        @Inject(NX_DATE_LOCALE) public nxDateLocale: string,
    ) {
        this.currentLocale = nxDateLocale;

        this.nxDateAdapter.localeChanges.subscribe(locale => {
            this.currentLocale = locale;
        });
    }

    changeLocal(value: string) {
        this.nxDateAdapter.setLocale(value);
    }
}

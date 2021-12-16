import { LocalizedCountryNames } from 'i18n-iso-countries';
import { Subject } from 'rxjs';
import en from 'i18n-iso-countries/langs/en.json';
import countries from 'i18n-iso-countries';
import { Injectable } from '@angular/core';
countries.registerLocale(en);

@Injectable({ providedIn: 'root' })
export class NxPhoneInputIntl {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the properties have changed after initialization.
     */
    readonly changes: Subject<void> = new Subject<void>();

    /** The label that is shown at the top of the opened overlay. */
    areaCodeLabel: string = 'Country code';

    /** The object providing the country name translations. */
    countryNames: LocalizedCountryNames<any> = countries.getNames('en');
}

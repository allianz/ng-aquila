import { Component, Injectable } from '@angular/core';
import { NxPhoneInputIntl } from '@aposin/ng-aquila/phone-input';
import countries from 'i18n-iso-countries';
import de from 'i18n-iso-countries/langs/de.json';
import fr from 'i18n-iso-countries/langs/fr.json';

countries.registerLocale(de);

countries.registerLocale(fr);

@Injectable()
export class MyPhoneInputIntl extends NxPhoneInputIntl {
    areaCodeLabel = 'Ländervorwahl';
    countryNames = countries.getNames('de', { select: 'official' });
}

/** @title Phone Input Internationalization */
@Component({
    selector: 'phone-input-i18n-example',
    templateUrl: 'phone-input-i18n-example.html',
    styleUrls: ['./phone-input-i18n-example.css'],
    providers: [
        {
            provide: NxPhoneInputIntl,
            useClass: MyPhoneInputIntl,
        },
    ],
})
export class PhoneInputI18nExampleComponent {
    value = '';

    frenchCountries = countries.getNames('fr', { select: 'official' });

    overlayLabel = 'my overlay label';
}

import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxFormfieldComponent,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxPhoneInputComponent,
    NxPhoneInputIntl,
} from '@aposin/ng-aquila/phone-input';
import countries from 'i18n-iso-countries';
import de from 'i18n-iso-countries/langs/de.json';
import fr from 'i18n-iso-countries/langs/fr.json';

countries.registerLocale(de);

countries.registerLocale(fr);

@Injectable()
export class MyPhoneInputIntl extends NxPhoneInputIntl {
    areaCodeLabel = 'Ländervorwahl';
    countryNames = countries.getNames('de', { select: 'official' });
    lineNumberAriaLabel = 'Zeilennummer';
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
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxPhoneInputComponent,
        FormsModule,
    ],
})
export class PhoneInputI18nExampleComponent {
    value = '';

    frenchCountries = countries.getNames('fr', { select: 'official' });

    overlayLabel = 'my overlay label';
}

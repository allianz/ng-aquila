import { NxPhoneInputIntl } from '@aposin/ng-aquila/phone-input';
import { Component, Injectable, OnInit } from '@angular/core';
import de from 'i18n-iso-countries/langs/de.json';
import countries from 'i18n-iso-countries';
countries.registerLocale(de);

import fr from 'i18n-iso-countries/langs/fr.json';
countries.registerLocale(fr);

@Injectable()
export class MyPhoneInputIntl extends NxPhoneInputIntl {
  areaCodeLabel = 'Ländervorwahl';
  countryNames = countries.getNames('de', { select: 'official' })
}

/** @title Phone Input Internationalization */
@Component({
  templateUrl: 'phone-input-i18n-example.html',
  styleUrls: ['./phone-input-i18n-example.html'],
  selector: 'phone-input-i18n-example',
  providers: [
    {
      provide: NxPhoneInputIntl, useClass: MyPhoneInputIntl
    }
  ]
})
export class PhoneInputI18nExampleComponent implements OnInit {
  value = '';
  frenchCountries = countries.getNames('fr', { select: 'official' });
  overlayLabel = 'my overlay label'
  constructor() { }

  ngOnInit() { }
}
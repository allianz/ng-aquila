import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldPrefixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxLicencePlateEuroPrefixComponent,
  NxLicencePlateValidatorDirective,
} from '@allianz/ng-aquila/licence-plate';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Licence plate euro
 */
@Component({
  selector: 'licence-plate-euro-example',
  templateUrl: 'licence-plate-euro-example.html',
  styleUrls: ['licence-plate-euro-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxLicencePlateEuroPrefixComponent,
    NxFormfieldPrefixDirective,
    NxInputDirective,
    FormsModule,
    NxLicencePlateValidatorDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class LicencePlateEuroExampleComponent {
  country = 'A';
  countriesList: { country: string; countryName: string }[] = [
    { country: 'A', countryName: 'Austria' },
    { country: 'B', countryName: 'Belgium' },
    { country: 'BG', countryName: 'Bulgaria' },
    { country: 'HR', countryName: 'Croatia' },
    { country: 'CY', countryName: 'Cyprus' },
    { country: 'CZ', countryName: 'Czech Republic' },
    { country: 'DK', countryName: 'Denmark' },
    { country: 'EST', countryName: 'Estonia' },
    { country: 'FIN', countryName: 'Finland' },
    { country: 'F', countryName: 'France' },
    { country: 'GR', countryName: 'Greece' },
    { country: 'H', countryName: 'Hungary' },
    { country: 'IRL', countryName: 'Ireland' },
    { country: 'I', countryName: 'Italy' },
    { country: 'LV', countryName: 'Latvia' },
    { country: 'LT', countryName: 'Lithuania' },
    { country: 'L', countryName: 'Luxembourg' },
    { country: 'M', countryName: 'Malta' },
    { country: 'NL', countryName: 'Netherlands' },
    { country: 'N', countryName: 'Norway' },
    { country: 'PL', countryName: 'Poland' },
    { country: 'P', countryName: 'Portugal' },
    { country: 'RO', countryName: 'Romania' },
    { country: 'SK', countryName: 'Slovakia' },
    { country: 'SLO', countryName: 'Slovenia' },
    { country: 'E', countryName: 'Spain' },
    { country: 'S', countryName: 'Sweden' },
    { country: 'UA', countryName: 'Ukraine' },
  ];
  value = '';
}

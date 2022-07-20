import { Component } from '@angular/core';
import { NxLicencePlateType } from '@aposin/ng-aquila/licence-plate';

/**
 * @title Licence plate expert
 */
@Component({
    selector: 'licence-plate-expert-example',
    templateUrl: 'licence-plate-expert-example.html',
    styleUrls: ['licence-plate-expert-example.css'],
})
export class LicencePlateExpertExample {
    licencePlateModel: {
        type: NxLicencePlateType;
        country: string;
        value: string;
        startDate: number;
        endDate: number;
    } = {
        type: 'de_standard',
        country: 'D',
        value: '',
        startDate: 1,
        endDate: 2,
    };

    licencePlateTypes: { type: string; typeName: string }[] = [
        { type: 'de_standard', typeName: 'Standard (Germany)' },
        { type: 'de_season', typeName: 'Seasonal (Germany)' },
        { type: 'de_special', typeName: 'Special (Germany)' },
        { type: 'euro', typeName: 'Euro' },
        { type: 'other', typeName: 'Other' },
    ];

    monthsOfYearList: { month: number; monthName: string }[] = [
        { month: 1, monthName: 'January ' },
        { month: 2, monthName: 'February' },
        { month: 3, monthName: 'March' },
        { month: 4, monthName: 'April' },
        { month: 5, monthName: 'May' },
        { month: 6, monthName: 'June' },
        { month: 7, monthName: 'July' },
        { month: 8, monthName: 'August' },
        { month: 9, monthName: 'September ' },
        { month: 10, monthName: 'October' },
        { month: 11, monthName: 'November' },
        { month: 12, monthName: 'December' },
    ];
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
}

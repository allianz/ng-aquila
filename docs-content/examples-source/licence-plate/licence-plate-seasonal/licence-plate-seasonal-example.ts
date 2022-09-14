import { Component } from '@angular/core';

/**
 * @title Licence plate seasonal (Germany)
 */
@Component({
    selector: 'licence-plate-seasonal-example',
    templateUrl: 'licence-plate-seasonal-example.html',
    styleUrls: ['licence-plate-seasonal-example.css'],
})
export class LicencePlateSeasonalExampleComponent {
    startMonth!: number;
    endMonth!: number;
    monthsOfYearList: { month: number; monthName: string }[] = [
        { month: 1, monthName: 'January' },
        { month: 2, monthName: 'February' },
        { month: 3, monthName: 'March' },
        { month: 4, monthName: 'April' },
        { month: 5, monthName: 'May' },
        { month: 6, monthName: 'June' },
        { month: 7, monthName: 'July' },
        { month: 8, monthName: 'August' },
        { month: 9, monthName: 'September' },
        { month: 10, monthName: 'October' },
        { month: 11, monthName: 'November' },
        { month: 12, monthName: 'December' },
    ];
    value = '';
}

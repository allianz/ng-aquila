import { Component } from '@angular/core';
import { Moment } from 'moment';

/**
 * @title Date filter example
 */
@Component({
    selector: 'datefield-filter-example',
    templateUrl: './datefield-filter-example.html',
    styleUrls: ['./datefield-filter-example.css'],
})
export class DatefieldFilterExampleComponent {
    onlyDaysWith6 = (date: Moment | null) => date?.date() === 6;
}

import { Component } from '@angular/core';
import moment from 'moment';

/**
 * @title Example of setting min and max values
 */
@Component({
    selector: 'datefield-min-max-example',
    templateUrl: './datefield-min-max-example.html',
    styleUrls: ['./datefield-min-max-example.css'],
})
export class DatefieldMinMaxExampleComponent {
    minDate = moment([2010, 1, 1]);
    maxDate = moment([2020, 1, 1]);
}

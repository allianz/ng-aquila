import { Component } from '@angular/core';
import { Moment } from 'moment';

/**
 * @title Basic date field example
 */
@Component({
    selector: 'datefield-basic-example',
    templateUrl: './datefield-basic-example.html',
    styleUrls: ['./datefield-basic-example.css'],
})
export class DatefieldBasicExampleComponent {
    currentDate: Moment | null = null;
}

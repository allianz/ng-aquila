import { Component } from '@angular/core';
import { Moment } from 'moment';

/**
 * @title Datepicker toggle focus example
 */
@Component({
    selector: 'datefield-toggle-focus-example',
    templateUrl: './datefield-toggle-focus-example.html',
    styleUrls: ['./datefield-toggle-focus-example.css'],
})
export class DatefieldToggleFocusExampleComponent {
    date1: Moment | null = null;
    date2: Moment | null = null;
}

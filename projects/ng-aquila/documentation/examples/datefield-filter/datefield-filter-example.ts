import { Component } from '@angular/core';
import { Moment } from 'moment';

/**
* @title Date filter example
*/
@Component({
  templateUrl: './datefield-filter-example.html'
})

export class DatefieldFilterExampleComponent {
  onlyDaysWith6 = (date: Moment) => date.date() === 6;
}

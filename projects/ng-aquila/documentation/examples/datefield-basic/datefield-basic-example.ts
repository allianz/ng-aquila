import { Component } from '@angular/core';
import { Moment } from 'moment';

/**
* @title Basic date field example
*/
@Component({
  templateUrl: './datefield-basic-example.html'
})

export class DatefieldBasicExampleComponent {
  currentDate: Moment = null;
}

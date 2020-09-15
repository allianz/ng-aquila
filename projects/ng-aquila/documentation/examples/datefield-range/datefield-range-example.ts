import { Component, ViewChild } from '@angular/core';
import { Moment } from 'moment';
import { NxDatepickerComponent } from '@aposin/ng-aquila/datefield';

/**
* @title Date range example
*/
@Component({
  templateUrl: './datefield-range-example.html'
})

export class DatefieldRangeExampleComponent {

  @ViewChild('endDatepicker', { static: true }) endDatepicker: NxDatepickerComponent<Moment>;

  startDate: Moment = null;
  endDate: Moment = null;

  updateEndDatepicker() {
    this.endDate = this.startDate;
    setTimeout(() => this.endDatepicker.open());
  }
}

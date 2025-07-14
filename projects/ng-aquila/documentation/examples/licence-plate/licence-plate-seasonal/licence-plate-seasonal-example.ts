import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldHintDirective,
  NxFormfieldPrefixDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import {
  NxLicencePlateEuroPrefixComponent,
  NxLicencePlateSeasonSuffixComponent,
  NxLicencePlateValidatorDirective,
} from '@allianz/ng-aquila/licence-plate';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Licence plate seasonal (Germany)
 */
@Component({
  selector: 'licence-plate-seasonal-example',
  templateUrl: 'licence-plate-seasonal-example.html',
  styleUrls: ['licence-plate-seasonal-example.css'],
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
    NxLicencePlateSeasonSuffixComponent,
    NxFormfieldSuffixDirective,
    NxFormfieldHintDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
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

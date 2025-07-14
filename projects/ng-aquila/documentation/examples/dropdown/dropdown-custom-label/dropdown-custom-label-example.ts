import {
  NxDropdownClosedLabelDirective,
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface TelephonePrefixData {
  prefix: string;
  countryId: string;
}

/**
 * @title Custom label example
 */
@Component({
  selector: 'dropdown-custom-label-example',
  templateUrl: './dropdown-custom-label-example.html',
  styleUrls: ['./dropdown-custom-label-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    FormsModule,
    NxDropdownClosedLabelDirective,
    NxDropdownItemComponent,
  ],
})
export class DropdownCustomLabelExampleComponent {
  customLabelDropdownValue?: TelephonePrefixData;

  telPrefixDemoData: TelephonePrefixData[] = [
    {
      prefix: '+1',
      countryId: 'United States of America',
    },
    {
      prefix: '+49',
      countryId: 'Germany',
    },
    {
      prefix: '+41',
      countryId: 'Switzerland',
    },
  ];
}

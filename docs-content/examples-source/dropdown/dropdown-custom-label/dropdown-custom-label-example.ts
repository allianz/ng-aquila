import { Component } from '@angular/core';

/**
* @title Custom label example
*/
@Component({
  selector: 'dropdown-custom-label-example',
  templateUrl: './dropdown-custom-label-example.html',
  styleUrls: ['./dropdown-custom-label-example.css']
})
export class DropdownCustomLabelExampleComponent {
  customLabelDropdownValue;

  telPrefixDemoData = [
    {
      prefix: '+1',
      countryId: 'United States of America'
    },
    {
      prefix: '+49',
      countryId: 'Germany'
    },
    {
      prefix: '+41',
      countryId: 'Switzerland'
    }
  ];
}

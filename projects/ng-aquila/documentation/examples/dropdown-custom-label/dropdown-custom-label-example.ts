import { Component } from '@angular/core';

/**
* @title Custom label example
*/
@Component({
  templateUrl: './dropdown-custom-label-example.html'
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

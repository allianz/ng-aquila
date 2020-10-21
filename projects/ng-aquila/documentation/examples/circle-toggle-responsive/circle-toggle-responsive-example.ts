import { Component } from '@angular/core';

/**
* @title Disable responsive example
*/
@Component({
  templateUrl: './circle-toggle-responsive-example.html'
})
export class CircleToggleResponsiveExampleComponent {

  sampleValues = [{value: 'A', icon: 'product-heart', hint: 'Hint A', label: 'Label A', selected: false},
    {value: 'B', icon: 'product-car', hint: 'Hint B', label: 'Label B', selected: true},
    {value: 'C', icon: 'product-plane', hint: 'Hint C', label: 'Label C', selected: false},
  ];

  logMessage(event) {
    console.log(`toggle-circle changed to value: ` + event);
  }

}

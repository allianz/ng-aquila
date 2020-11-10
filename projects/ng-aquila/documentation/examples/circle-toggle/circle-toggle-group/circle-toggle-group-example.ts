import { Component } from '@angular/core';

/**
* @title Circle Toggle group example
*/
@Component({
  templateUrl: './circle-toggle-group-example.html'
})
export class CircleToggleGroupExampleComponent {

  sampleValues = [{value: 'A', icon: 'product-heart', hint: 'Hint A', label: 'Label A', selected: false},
    {value: 'B', icon: 'product-car', hint: 'Hint B', label: 'Label B', selected: true},
    {value: 'C', icon: 'product-plane', hint: 'Hint C', label: 'Label C', selected: false},
  ];

}

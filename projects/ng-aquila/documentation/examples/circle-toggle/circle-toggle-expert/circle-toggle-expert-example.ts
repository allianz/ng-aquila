import { NxCircleToggleComponent } from '@allianz/ng-aquila/circle-toggle';
import { Component } from '@angular/core';

/**
 * @title Circle toggle expert default example
 */
@Component({
  selector: 'circle-toggle-expert-example',
  templateUrl: './circle-toggle-expert-example.html',
  styleUrls: ['./circle-toggle-expert-example.css'],
  standalone: true,
  imports: [NxCircleToggleComponent],
})
export class CircleToggleExpertExampleComponent {
  sampleValues = [
    {
      value: 'A',
      icon: 'product-heart',
      hint: 'Hint A',
      label: 'Label A',
      selected: false,
    },
    {
      value: 'B',
      icon: 'product-car',
      hint: 'Hint B',
      label: 'Label B',
      selected: true,
    },
    {
      value: 'C',
      icon: 'product-plane',
      hint: 'Hint C',
      label: 'Label C',
      selected: false,
    },
  ];
}

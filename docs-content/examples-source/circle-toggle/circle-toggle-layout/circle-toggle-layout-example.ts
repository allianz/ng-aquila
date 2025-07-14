import {
  NxCircleToggleComponent,
  NxCircleToggleGroupComponent,
} from '@allianz/ng-aquila/circle-toggle';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { Component } from '@angular/core';

/** @title Circle Toggle Group responsive layout Example */
@Component({
  selector: 'circle-toggle-layout-example',
  templateUrl: './circle-toggle-layout-example.html',
  styleUrl: './circle-toggle-layout-example.css',
  imports: [
    NxCircleToggleComponent,
    NxCircleToggleGroupComponent,
    NxGridModule,
  ],
})
export class CircleToggleLayoutExampleComponent {
  sampleValues = [
    {
      value: 'A',
      circleText: 'A',
      hint: 'Hint A',
      label: 'Label A',
      selected: false,
    },
    {
      value: 'B',
      circleText: 'B',
      hint: 'Hint B',
      label: 'Label B',
      selected: true,
    },
    {
      value: 'C',
      circleText: 'C',
      hint: 'Hint C',
      label: 'Label C',
      selected: false,
    },
    {
      value: 'D',
      circleText: 'D',
      hint: 'Hint D',
      label: 'Label D',
      selected: false,
    },
    {
      value: 'E',
      circleText: 'E',
      hint: 'Hint E',
      label: 'Label E',
      selected: false,
    },
    {
      value: 'F',
      circleText: 'F',
      hint: 'Hint F',
      label: 'Label F',
      selected: false,
    },
  ];
}

import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxIndicatorComponent } from '@allianz/ng-aquila/indicator';
import { Component } from '@angular/core';
/**
 * @title Indicator example
 */
@Component({
  selector: 'indicator-example',
  templateUrl: './indicator-example.html',
  styleUrls: ['./indicator-example.css'],
  imports: [NxIndicatorComponent, NxIconComponent],
})
export class IndicatorExampleComponent {}

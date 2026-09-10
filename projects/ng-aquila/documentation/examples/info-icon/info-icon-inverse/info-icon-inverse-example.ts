import {
  NxLabelComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { Component } from '@angular/core';

/**
 * @title Info Icon Inverse Example
 */
@Component({
  selector: 'info-icon-inverse-example',
  templateUrl: './info-icon-inverse-example.html',
  styleUrls: ['./info-icon-inverse-example.css'],
  imports: [NxLabelComponent, NxLabelInfoDirective, NxInfoIconComponent],
})
export class InfoIconInverseExampleComponent {}

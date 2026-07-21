import {
  NxLabelComponent,
  NxLabelInfoDirective,
} from '@allianz/ng-aquila/base';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { Component } from '@angular/core';

/** @title Label with info icon */
@Component({
  selector: 'label-info-icon-example',
  templateUrl: './label-info-icon-example.html',
  styleUrls: ['./label-info-icon-example.css'],
  imports: [NxLabelComponent, NxLabelInfoDirective, NxInfoIconComponent],
})
export class LabelInfoIconExampleComponent {}

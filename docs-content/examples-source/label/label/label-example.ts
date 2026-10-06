import { NxLabelComponent } from '@allianz/ng-aquila/base';
import { NxSurface } from '@allianz/ng-aquila/surface';
import { Component } from '@angular/core';

/** @title Label example */
@Component({
  selector: 'label-example',
  templateUrl: './label-example.html',
  styleUrls: ['./label-example.css'],
  imports: [NxLabelComponent, NxSurface],
})
export class LabelExampleComponent {}

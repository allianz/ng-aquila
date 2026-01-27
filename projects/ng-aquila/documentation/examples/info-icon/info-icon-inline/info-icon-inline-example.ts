import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInfoIconComponent } from '@allianz/ng-aquila/info-icon';
import { Component } from '@angular/core';

/**
 * @title Info Icon Inline Example
 */
@Component({
  selector: 'info-icon-inline-example',
  templateUrl: './info-icon-inline-example.html',
  styleUrls: ['./info-icon-inline-example.css'],
  imports: [NxInfoIconComponent, NxHeadlineComponent],
})
export class InfoIconInlineExampleComponent {}

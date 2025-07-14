import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Dir } from '@angular/cdk/bidi';
import { Component } from '@angular/core';

/**
 * @title RTL Basic Example
 */
@Component({
  selector: 'rtl-basic-example',
  templateUrl: './rtl-basic-example.html',
  styleUrls: ['./rtl-basic-example.css'],
  imports: [Dir, NxHeadlineComponent, NxCopytextComponent, NxSliderComponent],
})
export class RtlBasicExampleComponent {
  sliderDemoValue = 10;
}

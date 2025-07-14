import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxSliderComponent } from '@allianz/ng-aquila/slider';
import { Dir, Direction } from '@angular/cdk/bidi';
import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';

/**
 * @title RTL Dynamic Example
 */
@Component({
  selector: 'rtl-dynamic-example',
  templateUrl: './rtl-dynamic-example.html',
  styleUrls: ['./rtl-dynamic-example.css'],
  imports: [
    Dir,
    NxHeadlineComponent,
    NxCopytextComponent,
    NxSliderComponent,
    NxButtonComponent,
    UpperCasePipe,
  ],
})
export class RtlDynamicExampleComponent {
  direction: Direction = 'ltr';
  sliderDemoValue = 10;

  toggleDirection(): void {
    this.direction = this.direction === 'ltr' ? 'rtl' : 'ltr';
  }
}

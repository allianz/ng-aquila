import { Dir } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title RTL Basic Example
 */
@Component({
    selector: 'rtl-basic-example',
    templateUrl: './rtl-basic-example.html',
    styleUrls: ['./rtl-basic-example.css'],
    standalone: true,
    imports: [Dir, NxHeadlineComponent, NxCopytextComponent, NxSliderComponent],
})
export class RtlBasicExampleComponent {
    sliderDemoValue = 10;
}

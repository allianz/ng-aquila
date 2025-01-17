import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Slider Decimal Example
 */
@Component({
    selector: 'slider-decimal-example',
    templateUrl: './slider-decimal-example.html',
    styleUrls: ['./slider-decimal-example.css'],
    imports: [
        NxSliderComponent,
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
    ],
})
export class SliderDecimalExampleComponent {
    step = 0.1;
    floatSliderDemoValue = 1;
}

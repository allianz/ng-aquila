import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Slider Template Driven Form Example
 */
@Component({
    selector: 'slider-template-example',
    templateUrl: './slider-template-example.html',
    styleUrls: ['./slider-template-example.css'],
    imports: [FormsModule, NxSliderComponent],
})
export class SliderTemplateExampleComponent {
    templateModel = 42;
}

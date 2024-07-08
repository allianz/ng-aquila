import { Component } from '@angular/core';
import { NxProgressbarComponent } from '@aposin/ng-aquila/progressbar';

/**
 * @title Progress Bar Basic Example
 */
@Component({
    selector: 'progressbar-basic-example',
    templateUrl: './progressbar-basic-example.html',
    styleUrls: ['./progressbar-basic-example.css'],
    standalone: true,
    imports: [NxProgressbarComponent],
})
export class ProgressbarBasicExampleComponent {
    myProgress = 0.3;
}

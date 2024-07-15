import { Component } from '@angular/core';
import { NxProgressbarComponent } from '@aposin/ng-aquila/progressbar';

/**
 * @title Progress Bar Example
 */
@Component({
    selector: 'progressbar-example',
    templateUrl: './progressbar-example.html',
    styleUrls: ['./progressbar-example.css'],
    standalone: true,
    imports: [NxProgressbarComponent],
})
export class ProgressbarExampleComponent {}

import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxIndicatorComponent } from '@aposin/ng-aquila/indicator';

/**
 * @title Icon button with indicators
 */
@Component({
    selector: 'button-icon-indicator-example',
    templateUrl: './button-icon-indicator-example.html',
    styleUrls: ['./button-icon-indicator-example.css'],
    standalone: true,
    imports: [NxIconButtonComponent, NxIconComponent, NxIndicatorComponent],
})
export class ButtonIconIndicatorExampleComponent {}

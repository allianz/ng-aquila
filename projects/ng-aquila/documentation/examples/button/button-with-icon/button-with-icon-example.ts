import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Icon Example
 */
@Component({
    selector: 'button-with-icon-example',
    templateUrl: './button-with-icon-example.html',
    styleUrls: ['./button-with-icon-example.css'],
    standalone: true,
    imports: [NxButtonComponent, NxIconComponent],
})
export class ButtonWithIconExampleComponent {}

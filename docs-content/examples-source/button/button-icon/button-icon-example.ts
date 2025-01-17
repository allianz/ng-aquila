import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Icon Button Example
 */
@Component({
    selector: 'button-icon-example',
    templateUrl: './button-icon-example.html',
    styleUrls: ['./button-icon-example.css'],
    imports: [NxIconButtonComponent, NxIconComponent],
})
export class ButtonIconExampleComponent {}

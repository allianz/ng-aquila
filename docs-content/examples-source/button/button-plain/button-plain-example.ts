import { Component } from '@angular/core';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Plain Buttons Example
 */
@Component({
    selector: 'button-plain-example',
    templateUrl: './button-plain-example.html',
    styleUrls: ['./button-plain-example.css'],
    imports: [NxPlainButtonComponent, NxIconComponent],
})
export class ButtonPlainExampleComponent {}

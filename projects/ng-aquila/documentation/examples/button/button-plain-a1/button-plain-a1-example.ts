import { Component } from '@angular/core';
import { NxPlainButtonComponent } from '@aposin/ng-aquila/button';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

/**
 * @title Plain Button One Allianz additions
 */
@Component({
    selector: 'button-plain-a1-example',
    templateUrl: './button-plain-a1-example.html',
    styleUrls: ['./button-plain-a1-example.css'],
    standalone: true,
    imports: [NxHeadlineComponent, NxPlainButtonComponent, NxIconComponent],
})
export class ButtonPlainA1ExampleComponent {}

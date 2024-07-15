import { Component } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Input field without formfield example
 */
@Component({
    selector: 'input-without-formfield-example',
    templateUrl: './input-without-formfield-example.html',
    styleUrls: ['./input-without-formfield-example.css'],
    standalone: true,
    imports: [NxInputDirective],
})
export class InputWithoutFormfieldExampleComponent {}

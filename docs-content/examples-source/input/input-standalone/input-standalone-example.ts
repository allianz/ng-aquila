import { Component } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Standalone example
 */
@Component({
    selector: 'input-standalone-example',
    templateUrl: './input-standalone-example.html',
    styleUrls: ['./input-standalone-example.css'],
    imports: [NxFormfieldComponent, NxInputDirective],
})
export class InputStandaloneExampleComponent {}

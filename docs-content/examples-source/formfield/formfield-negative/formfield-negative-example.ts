import { Component } from '@angular/core';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'formfield-negative-example',
    templateUrl: './formfield-negative-example.html',
    styleUrls: ['./formfield-negative-example.css'],
    standalone: true,
    imports: [NxFormfieldComponent, NxInputDirective, NxFormfieldHintDirective],
})
export class FormfieldNegativeExampleComponent {}

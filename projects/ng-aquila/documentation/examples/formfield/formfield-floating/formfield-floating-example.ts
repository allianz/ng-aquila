import { Component } from '@angular/core';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Floating examples
 */
@Component({
    selector: 'formfield-floating-example',
    templateUrl: './formfield-floating-example.html',
    styleUrls: ['./formfield-floating-example.css'],
    imports: [NxFormfieldComponent, NxInputDirective, NxFormfieldHintDirective],
})
export class FormfieldFloatingExampleComponent {}

import { Component } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Placeholder example
 */
@Component({
    selector: 'formfield-placeholder-example',
    templateUrl: './formfield-placeholder-example.html',
    styleUrls: ['./formfield-placeholder-example.css'],
    imports: [NxFormfieldComponent, NxInputDirective],
})
export class FormfieldPlaceholderExampleComponent {}

import { Component } from '@angular/core';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Basic input field example
 */
@Component({
    selector: 'input-example',
    templateUrl: './input-example.html',
    styleUrls: ['./input-example.css'],
    standalone: true,
    imports: [NxFormfieldComponent, NxInputDirective, NxErrorComponent],
})
export class InputExampleComponent {
    urlRegex = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
}

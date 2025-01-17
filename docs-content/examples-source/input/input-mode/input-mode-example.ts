import { Component } from '@angular/core';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Input field inputMode example
 */
@Component({
    selector: 'input-mode-example',
    templateUrl: './input-mode-example.html',
    styleUrls: ['./input-mode-example.css'],
    imports: [
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxInputDirective,
    ],
})
export class InputModeExampleComponent {
    inputMode = 'text';
}

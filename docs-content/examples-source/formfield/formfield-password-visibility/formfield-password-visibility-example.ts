import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxInputDirective,
    NxPasswordToggleComponent,
} from '@aposin/ng-aquila/input';

/**
 * @title Password visibility toggle example
 */
@Component({
    selector: 'formfield-password-visibility-example',
    templateUrl: './formfield-password-visibility-example.html',
    styleUrls: ['./formfield-password-visibility-example.css'],
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        NxPasswordToggleComponent,
        NxFormfieldSuffixDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class FormfieldPasswordVisibilityExampleComponent {
    inputValue!: string;
}

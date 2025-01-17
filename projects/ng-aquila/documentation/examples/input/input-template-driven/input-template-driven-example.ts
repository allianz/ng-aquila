import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Template-driven example with ngModel
 */
@Component({
    selector: 'input-template-driven-example',
    templateUrl: './input-template-driven-example.html',
    styleUrls: ['./input-template-driven-example.css'],
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        NxErrorComponent,
    ],
})
export class InputTemplateDrivenExampleComponent {
    currentExampleValue = '';
}

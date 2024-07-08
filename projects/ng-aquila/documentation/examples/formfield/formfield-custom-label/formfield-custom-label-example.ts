import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldComponent,
    NxFormfieldHintDirective,
    NxFormfieldLabelDirective,
} from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Custom formfield label example
 */
@Component({
    selector: 'formfield-custom-label-example',
    templateUrl: './formfield-custom-label-example.html',
    styleUrls: ['./formfield-custom-label-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxFormfieldLabelDirective,
        NxIconComponent,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxButtonComponent,
    ],
})
export class FormfieldCustomLabelExampleComponent {
    suffix = '(suffix)';

    addOptionalSuffix() {
        this.suffix = this.suffix === '' ? '(suffix)' : '';
    }
}

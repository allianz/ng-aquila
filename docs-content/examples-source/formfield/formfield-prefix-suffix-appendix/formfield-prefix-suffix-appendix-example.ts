import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldAppendixDirective,
    NxFormfieldComponent,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Prefix, suffix and appendix examples
 */
@Component({
    selector: 'formfield-prefix-suffix-appendix-example',
    templateUrl: './formfield-prefix-suffix-appendix-example.html',
    styleUrls: ['./formfield-prefix-suffix-appendix-example.css'],
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldSuffixDirective,
        NxFormfieldAppendixDirective,
        NxPopoverTriggerDirective,
        NxIconComponent,
        NxPopoverComponent,
        NxIconButtonComponent,
    ],
})
export class FormfieldPrefixSuffixAppendixExampleComponent {
    value = 'Max';
}

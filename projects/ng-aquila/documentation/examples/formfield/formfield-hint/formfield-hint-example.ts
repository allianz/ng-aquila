import { Component } from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import {
    NxFormfieldAppendixDirective,
    NxFormfieldComponent,
    NxFormfieldHintDirective,
} from '@aposin/ng-aquila/formfield';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Hint example
 */
@Component({
    selector: 'formfield-hint-example',
    templateUrl: './formfield-hint-example.html',
    styleUrls: ['./formfield-hint-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldHintDirective,
        NxFormfieldAppendixDirective,
        NxPopoverTriggerDirective,
        NxIconComponent,
        NxPopoverComponent,
        NxIconButtonComponent,
    ],
})
export class FormfieldHintExampleComponent {}

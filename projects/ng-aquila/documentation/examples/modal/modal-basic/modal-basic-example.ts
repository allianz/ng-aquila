import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxModalComponent,
    NxOpenModalOnClickDirective,
} from '@aposin/ng-aquila/modal';

/**
 * @title Basic use case example
 */
@Component({
    selector: 'modal-basic-example',
    templateUrl: './modal-basic-example.html',
    styleUrls: ['./modal-basic-example.css'],
    standalone: true,
    imports: [
        NxButtonComponent,
        NxHeadlineComponent,
        NxCopytextComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxOpenModalOnClickDirective,
        NxModalComponent,
    ],
})
export class ModalBasicExampleComponent {}

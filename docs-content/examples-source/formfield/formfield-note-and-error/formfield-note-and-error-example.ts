import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
    NxFormfieldNoteDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Combining notes and errors example
 */
@Component({
    selector: 'formfield-note-and-error-example',
    templateUrl: './formfield-note-and-error-example.html',
    styleUrls: ['./formfield-note-and-error-example.css'],
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        NxMessageComponent,
        NxFormfieldNoteDirective,
        NxErrorComponent,
        NxFormfieldErrorDirective,
    ],
})
export class FormfieldNoteAndErrorExampleComponent {
    valueSupplementErrorAndNote!: string;
}

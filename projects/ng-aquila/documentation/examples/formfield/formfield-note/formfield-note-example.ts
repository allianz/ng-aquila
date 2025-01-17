import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxFormfieldComponent,
    NxFormfieldNoteDirective,
} from '@aposin/ng-aquila/formfield';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Note example
 */
@Component({
    selector: 'formfield-note-example',
    templateUrl: './formfield-note-example.html',
    styleUrls: ['./formfield-note-example.css'],
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        NxMessageComponent,
        NxFormfieldNoteDirective,
    ],
})
export class FormfieldNoteExampleComponent {
    valueSupplementNote!: string;
}

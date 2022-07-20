import { Component } from '@angular/core';

/**
 * @title Combining notes and errors example
 */
@Component({
    selector: 'formfield-note-and-error-example',
    templateUrl: './formfield-note-and-error-example.html',
    styleUrls: ['./formfield-note-and-error-example.css'],
})
export class FormfieldNoteAndErrorExampleComponent {
    valueSupplementErrorAndNote!: string;
}

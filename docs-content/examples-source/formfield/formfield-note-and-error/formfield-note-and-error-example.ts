import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldNoteDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

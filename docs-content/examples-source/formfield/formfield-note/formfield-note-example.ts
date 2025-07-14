import {
  NxFormfieldComponent,
  NxFormfieldNoteDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

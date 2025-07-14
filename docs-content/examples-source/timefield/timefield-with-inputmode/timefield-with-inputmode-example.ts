import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 * @title Timefield inputmode example
 */
@Component({
  selector: 'timefield-with-inputmode',
  imports: [FormsModule, NxTimefieldComponent],
  templateUrl: './timefield-with-inputmode-example.html',
  styleUrl: './timefield-with-inputmode-example.css',
})
export class TimefieldWithInputmode {}

import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component, ViewChild } from '@angular/core';

/**
 * @title Character count example
 */
@Component({
  selector: 'formfield-character-count-example',
  templateUrl: './formfield-character-count-example.html',
  styleUrls: ['./formfield-character-count-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective, NxFormfieldHintDirective],
})
export class FormfieldCharacterCountExampleComponent {
  @ViewChild('inputToCount', { read: NxInputDirective, static: true })
  input!: NxInputDirective;

  count = 0;

  onInput() {
    this.count = this.input.value.length;
  }
}

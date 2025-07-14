import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'formfield-negative-example',
  templateUrl: './formfield-negative-example.html',
  styleUrls: ['./formfield-negative-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective, NxFormfieldHintDirective],
})
export class FormfieldNegativeExampleComponent {}

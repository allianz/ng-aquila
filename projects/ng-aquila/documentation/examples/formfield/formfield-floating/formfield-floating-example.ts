import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Floating examples
 */
@Component({
  selector: 'formfield-floating-example',
  templateUrl: './formfield-floating-example.html',
  styleUrls: ['./formfield-floating-example.css'],
  imports: [NxFormfieldComponent, NxInputDirective, NxFormfieldHintDirective],
})
export class FormfieldFloatingExampleComponent {}

import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Basic formfield example
 */
@Component({
  selector: 'formfield-basic-example',
  templateUrl: './formfield-basic-example.html',
  styleUrls: ['./formfield-basic-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
  ],
})
export class FormfieldBasicExampleComponent {}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Template driven example
 */
@Component({
  selector: 'dropdown-template-driven-example',
  templateUrl: './dropdown-template-driven-example.html',
  styleUrls: ['./dropdown-template-driven-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    FormsModule,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxButtonComponent,
    JsonPipe,
  ],
})
export class DropdownTemplateDrivenExampleComponent {
  ngModelBinding = 'Mini';
}

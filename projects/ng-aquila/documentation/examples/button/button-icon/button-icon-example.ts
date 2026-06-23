import { NxButtonSize, NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component, model } from '@angular/core';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxDropdownComponent,
  NxDropdownItemComponent,
} from '@allianz/ng-aquila/dropdown';
import { FormsModule } from '@angular/forms';

/**
 * @title Icon Button Example
 */
@Component({
  selector: 'button-icon-example',
  templateUrl: './button-icon-example.html',
  styleUrls: ['./button-icon-example.css'],
  imports: [
    NxIconButtonComponent,
    NxIconComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    FormsModule,
  ],
})
export class ButtonIconExampleComponent {
  size = model<NxButtonSize>('medium');
}

import { NxErrorComponent } from '@allianz/ng-aquila/base';
import {
  NxFormfieldComponent,
  NxFormfieldErrorDirective,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxInputDirective,
  NxPasswordToggleComponent,
} from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Password visibility toggle example
 */
@Component({
  selector: 'formfield-password-visibility-example',
  templateUrl: './formfield-password-visibility-example.html',
  styleUrls: ['./formfield-password-visibility-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
    NxPasswordToggleComponent,
    NxFormfieldSuffixDirective,
    NxErrorComponent,
    NxFormfieldErrorDirective,
  ],
})
export class FormfieldPasswordVisibilityExampleComponent {
  inputValue!: string;
}

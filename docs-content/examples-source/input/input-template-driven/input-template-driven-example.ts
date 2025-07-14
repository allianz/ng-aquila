import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Template-driven example with ngModel
 */
@Component({
  selector: 'input-template-driven-example',
  templateUrl: './input-template-driven-example.html',
  styleUrls: ['./input-template-driven-example.css'],
  imports: [
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
    NxErrorComponent,
  ],
})
export class InputTemplateDrivenExampleComponent {
  currentExampleValue = '';
}

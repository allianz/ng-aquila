import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Template-driven example with ngModel
 */
@Component({
  selector: 'checkbox-template-driven-example',
  templateUrl: './checkbox-template-driven-example.html',
  styleUrls: ['./checkbox-template-driven-example.css'],
  imports: [FormsModule, NxCheckboxComponent],
})
export class CheckboxTemplateDrivenExampleComponent {
  checked = false;
}

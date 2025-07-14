import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Label size example
 */
@Component({
  selector: 'checkbox-label-size-example',
  templateUrl: './checkbox-label-size-example.html',
  styleUrls: ['./checkbox-label-size-example.css'],
  imports: [FormsModule, NxCheckboxComponent],
})
export class CheckboxLabelSizeExampleComponent {}

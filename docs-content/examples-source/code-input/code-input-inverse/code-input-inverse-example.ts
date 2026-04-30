import { NxCodeInputComponent } from '@allianz/ng-aquila/code-input';
import { Component } from '@angular/core';

/**
 * @title Inverse styling example
 */
@Component({
  selector: 'code-input-inverse-example',
  templateUrl: 'code-input-inverse-example.html',
  styleUrls: ['./code-input-inverse-example.css'],
  imports: [NxCodeInputComponent],
})
export class CodeInputInverseExampleComponent {
  inputValue = '';
}

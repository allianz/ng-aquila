import { NxCodeInputComponent } from '@allianz/ng-aquila/code-input';
import { Component } from '@angular/core';

/**
 * @title Negative styling example
 */
@Component({
  selector: 'code-input-negative-example',
  templateUrl: 'code-input-negative-example.html',
  styleUrls: ['./code-input-negative-example.css'],
  imports: [NxCodeInputComponent],
})
export class CodeInputNegativeExampleComponent {
  inputValue = '';
}

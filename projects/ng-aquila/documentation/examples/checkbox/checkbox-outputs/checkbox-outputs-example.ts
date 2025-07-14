import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import { Component } from '@angular/core';

/**
 * @title Outputs example
 */
@Component({
  selector: 'checkbox-outputs-example',
  templateUrl: './checkbox-outputs-example.html',
  styleUrls: ['./checkbox-outputs-example.css'],
  imports: [NxCheckboxComponent, NxButtonComponent],
})
export class CheckboxOutputsExampleComponent {
  logMessage = '';
  messages: string[] = [];

  log(value: string) {
    this.messages.push(value);
    this.logMessage = this.messages.join('\n');
  }
}

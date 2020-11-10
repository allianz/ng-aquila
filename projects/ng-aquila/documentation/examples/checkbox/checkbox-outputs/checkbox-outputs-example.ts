import { Component } from '@angular/core';

/**
* @title Outputs example
*/
@Component({
  templateUrl: './checkbox-outputs-example.html'
})

export class CheckboxOutputsExampleComponent {
  public logMessage: string;
  public messages = [];

  public log(value) {
    this.messages.push(value);
    this.logMessage = this.messages.join('\n');
  }
}

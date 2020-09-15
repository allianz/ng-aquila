import { Component } from '@angular/core';

/**
 * @title Tag Output Example
 */
@Component({
  selector: 'nx-taglist-output-example',
  templateUrl: './taglist-output-example.html'
})
export class TagListOutputExampleComponent {
  tags = ['Apples', 'Oranges'];
  messages = [];
  logMessage;

  log(value) {
    this.messages.push(value);
    this.logMessage = this.messages.join('\n');
  }
}

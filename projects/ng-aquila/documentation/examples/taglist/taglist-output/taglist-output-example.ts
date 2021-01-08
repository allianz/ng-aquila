import { Component } from '@angular/core';

/**
 * @title Tag Output Example
 */
@Component({
  selector: 'taglist-output-example',
  templateUrl: './taglist-output-example.html',
  styleUrls: ['./taglist-output-example.css']
})
export class TaglistOutputExampleComponent {
  tags = ['Apples', 'Oranges'];
  messages = [];
  logMessage;

  log(value) {
    this.messages.push(value);
    this.logMessage = this.messages.join('\n');
  }
}

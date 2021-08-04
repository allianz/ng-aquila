import { Component, EventEmitter } from '@angular/core';

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
  messages: Array<any> = [];
  logMessage: string = '';

  log(value: Event) {
    this.messages.push(value);
    this.logMessage = this.messages.join('\n');
  }
}

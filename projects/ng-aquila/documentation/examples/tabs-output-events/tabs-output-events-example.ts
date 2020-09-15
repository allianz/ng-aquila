import { Component } from '@angular/core';

/**
 * @title Output events
 */
@Component({
  templateUrl: './tabs-output-events-example.html',
  styleUrls: ['./tabs-output-events-example.css']
})
export class TabsOutputEventsExampleComponent {

  messages = [];
  logMessage: string;

  tabChanged($event) {
    this.messages.push(`Selected Index: ${$event.index} Label: ${$event.tab.label}`);
    Promise.resolve().then( () => this.logMessage = this.messages.join('\n'));
  }

  tabFocused($event) {
    this.messages.push(`Focused Index: ${$event.index} Label: ${$event.tab.label}`);
    Promise.resolve().then(() => this.logMessage = this.messages.join('\n'));
  }
}

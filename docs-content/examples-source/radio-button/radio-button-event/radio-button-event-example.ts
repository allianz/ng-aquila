import { NxLabelComponent } from '@allianz/ng-aquila/base';
import {
  NxRadioComponent,
  NxRadioGroupComponent,
} from '@allianz/ng-aquila/radio-button';
import { Component } from '@angular/core';

/**
 * @title Event Example
 */
@Component({
  selector: 'radio-button-event-example',
  templateUrl: './radio-button-event-example.html',
  styleUrls: ['./radio-button-event-example.css'],
  imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent],
})
export class RadioButtonEventExampleComponent {
  logMessage!: string;
  messages: string[] = [];
  log(value: string) {
    this.messages.push(value);
    this.logMessage = this.messages.join('\n');
  }
}

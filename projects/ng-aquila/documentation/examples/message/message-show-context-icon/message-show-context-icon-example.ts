import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title Message context icon example
 */
@Component({
  selector: 'message-show-context-icon-example',
  templateUrl: './message-show-context-icon-example.html',
  styleUrls: ['./message-show-context-icon-example.css'],
  imports: [NxMessageComponent, NxButtonComponent],
})
export class MessageShowContextIconExampleComponent {
  showContextIcon = true;
}

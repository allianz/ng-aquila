import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title Closable example
 */
@Component({
  selector: 'message-closable-example',
  templateUrl: './message-closable-example.html',
  styleUrls: ['./message-closable-example.css'],
  imports: [NxMessageComponent, NxButtonComponent],
})
export class MessageClosableExampleComponent {
  closed = false;
}

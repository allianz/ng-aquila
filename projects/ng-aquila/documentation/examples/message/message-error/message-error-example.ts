import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title Error context example
 */
@Component({
  selector: 'message-error-example',
  templateUrl: './message-error-example.html',
  styleUrls: ['./message-error-example.css'],
  imports: [NxHeadlineComponent, NxMessageComponent, NxErrorComponent],
})
export class MessageErrorExampleComponent {}

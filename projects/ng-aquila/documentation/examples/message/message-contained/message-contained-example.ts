import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxMessageComponent } from '@allianz/ng-aquila/message';
import { Component } from '@angular/core';

/**
 * @title Contained message example
 */
@Component({
  selector: 'message-contained-example',
  templateUrl: './message-contained-example.html',
  styleUrls: ['./message-contained-example.css'],
  imports: [NxHeadlineComponent, NxMessageComponent, NxErrorComponent],
})
export class MessageContainedExampleComponent {}

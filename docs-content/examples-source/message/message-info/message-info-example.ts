import { Component } from '@angular/core';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Info context example
 */
@Component({
    selector: 'message-info-example',
    templateUrl: './message-info-example.html',
    styleUrls: ['./message-info-example.css'],
    standalone: true,
    imports: [NxMessageComponent],
})
export class MessageInfoExampleComponent {}

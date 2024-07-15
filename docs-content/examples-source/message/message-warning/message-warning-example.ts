import { Component } from '@angular/core';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Warning context example
 */
@Component({
    selector: 'message-warning-example',
    templateUrl: './message-warning-example.html',
    styleUrls: ['./message-warning-example.css'],
    standalone: true,
    imports: [NxMessageComponent],
})
export class MessageWarningExampleComponent {}

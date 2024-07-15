import { Component } from '@angular/core';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Success context example
 */
@Component({
    selector: 'message-success-example',
    templateUrl: './message-success-example.html',
    styleUrls: ['./message-success-example.css'],
    standalone: true,
    imports: [NxMessageComponent],
})
export class MessageSuccessExampleComponent {}

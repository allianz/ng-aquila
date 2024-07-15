import { Component } from '@angular/core';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Error context example
 */
@Component({
    selector: 'message-error-example',
    templateUrl: './message-error-example.html',
    styleUrls: ['./message-error-example.css'],
    standalone: true,
    imports: [NxHeadlineComponent, NxMessageComponent, NxErrorComponent],
})
export class MessageErrorExampleComponent {}

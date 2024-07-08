import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxMessageComponent } from '@aposin/ng-aquila/message';

/**
 * @title Closable example
 */
@Component({
    selector: 'message-closable-example',
    templateUrl: './message-closable-example.html',
    styleUrls: ['./message-closable-example.css'],
    standalone: true,
    imports: [NgIf, NxMessageComponent, NxButtonComponent],
})
export class MessageClosableExampleComponent {
    closed = false;
}

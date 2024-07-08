import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NxLabelComponent } from '@aposin/ng-aquila/base';
import {
    NxRadioComponent,
    NxRadioGroupComponent,
} from '@aposin/ng-aquila/radio-button';

/**
 * @title Event Example
 */
@Component({
    selector: 'radio-button-event-example',
    templateUrl: './radio-button-event-example.html',
    styleUrls: ['./radio-button-event-example.css'],
    standalone: true,
    imports: [NxRadioGroupComponent, NxLabelComponent, NxRadioComponent, NgIf],
})
export class RadioButtonEventExampleComponent {
    logMessage!: string;
    messages: string[] = [];
    log(value: string) {
        this.messages.push(value);
        this.logMessage = this.messages.join('\n');
    }
}

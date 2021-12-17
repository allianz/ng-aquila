import { Component } from '@angular/core';

/**
 * @title Event Example
 */
@Component({
    selector: 'radio-button-event-example',
    templateUrl: './radio-button-event-example.html',
    styleUrls: ['./radio-button-event-example.css'],
})
export class RadioButtonEventExampleComponent {
    public logMessage!: string;
    public messages: string[] = [];
    public log(value: string) {
        this.messages.push(value);
        this.logMessage = this.messages.join('\n');
    }
}

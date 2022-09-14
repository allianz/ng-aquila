import { Component } from '@angular/core';

/**
 * @title Outputs example
 */
@Component({
    selector: 'checkbox-outputs-example',
    templateUrl: './checkbox-outputs-example.html',
    styleUrls: ['./checkbox-outputs-example.css'],
})
export class CheckboxOutputsExampleComponent {
    logMessage = '';
    messages: string[] = [];

    log(value: string) {
        this.messages.push(value);
        this.logMessage = this.messages.join('\n');
    }
}

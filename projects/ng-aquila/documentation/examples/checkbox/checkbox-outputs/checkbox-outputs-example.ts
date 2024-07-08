import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';

/**
 * @title Outputs example
 */
@Component({
    selector: 'checkbox-outputs-example',
    templateUrl: './checkbox-outputs-example.html',
    styleUrls: ['./checkbox-outputs-example.css'],
    standalone: true,
    imports: [NxCheckboxComponent, NxButtonComponent, NgIf],
})
export class CheckboxOutputsExampleComponent {
    logMessage = '';
    messages: string[] = [];

    log(value: string) {
        this.messages.push(value);
        this.logMessage = this.messages.join('\n');
    }
}

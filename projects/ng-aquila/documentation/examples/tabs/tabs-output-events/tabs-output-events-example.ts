import { Component } from '@angular/core';
import { NxTabChangeEvent } from '@aposin/ng-aquila/tabs';

/**
 * @title Output events
 */
@Component({
    selector: 'tabs-output-events-example',
    templateUrl: './tabs-output-events-example.html',
    styleUrls: ['./tabs-output-events-example.css'],
})
export class TabsOutputEventsExampleComponent {
    messages: any[] = [];
    logMessage = '';

    tabChanged($event: NxTabChangeEvent) {
        this.messages.push(
            `Selected Index: ${$event.index} Label: ${$event.tab.label}`,
        );
        Promise.resolve().then(
            () => (this.logMessage = this.messages.join('\n')),
        );
    }

    tabFocused($event: NxTabChangeEvent) {
        this.messages.push(
            `Focused Index: ${$event.index} Label: ${$event.tab.label}`,
        );
        Promise.resolve().then(
            () => (this.logMessage = this.messages.join('\n')),
        );
    }
}

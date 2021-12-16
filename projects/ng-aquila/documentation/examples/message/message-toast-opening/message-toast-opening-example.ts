import { Component, ViewChild, TemplateRef } from '@angular/core';
import { NxMessageToastService } from '@aposin/ng-aquila/message';

/**
 * @title Opening example
 */
@Component({
    selector: 'message-toast-opening-example',
    templateUrl: './message-toast-opening-example.html',
    styleUrls: ['./message-toast-opening-example.css'],
})
export class MessageToastOpeningExampleComponent {
    toastText: string = 'A success message toast with a custom text.';
    @ViewChild('template') templateRef!: TemplateRef<any>;

    constructor(private messageToastService: NxMessageToastService) {}

    openFromText() {
        this.messageToastService.open(this.toastText, { context: 'success', duration: 5000 });
    }

    openFromTemplate() {
        this.messageToastService.openFromTemplate(this.templateRef, {
            announcementMessage: 'You see an info message. It will disappear in 3000 ms.',
        });
    }
}

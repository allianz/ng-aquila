import { Component, TemplateRef, ViewChild } from '@angular/core';
import {
    NxMessageToastRef,
    NxMessageToastService,
} from '@aposin/ng-aquila/message';

@Component({
    template: `<div class="u-text-center">
        <h3>Message from a component</h3>
        <p>This text comes from the SimpleMessageToastComponent.</p>
    </div>`,
})
export class SimpleMessageToastComponent {}

/**
 * @title Opening example
 */
@Component({
    selector: 'message-toast-opening-example',
    templateUrl: './message-toast-opening-example.html',
    styleUrls: ['./message-toast-opening-example.css'],
})
export class MessageToastOpeningExampleComponent {
    readonly toastText = 'A success message toast with a custom text.';

    @ViewChild('template') templateRef!: TemplateRef<any>;

    componentMessageToastRef?: NxMessageToastRef;

    constructor(private readonly messageToastService: NxMessageToastService) {}

    openFromText() {
        this.messageToastService.open(this.toastText, {
            context: 'success',
            duration: 5000,
        });
    }

    openFromTemplate() {
        this.messageToastService.openFromTemplate(this.templateRef, {
            announcementMessage:
                'You see an info message. It will disappear in 3000 ms.',
        });
    }

    openFromComponent(): void {
        this.componentMessageToastRef =
            this.messageToastService.openFromComponent(
                SimpleMessageToastComponent,
                {
                    duration: 5000,
                },
            );
    }
}

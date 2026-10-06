import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxMessageToastContext,
  NxMessageToastService,
} from '@allianz/ng-aquila/message';
import { Component, inject } from '@angular/core';

/**
 * @title Message toast contexts example
 */
@Component({
  selector: 'message-toast-contexts-example',
  templateUrl: './message-toast-contexts-example.html',
  styleUrls: ['./message-toast-contexts-example.css'],
  providers: [NxMessageToastService],
  imports: [NxButtonComponent],
})
export class MessageToastContextsExampleComponent {
  readonly contexts: NxMessageToastContext[] = [
    'info',
    'positive',
    'warning',
    'critical',
  ];

  showContextIcon = true;

  private readonly messageToastService = inject(NxMessageToastService);

  open(context: NxMessageToastContext) {
    this.messageToastService.open(`A ${context} message toast.`, {
      context,
      showContextIcon: this.showContextIcon,
      duration: 3000,
      announcementMessage: `A ${context} message toast.`,
    });
  }
}

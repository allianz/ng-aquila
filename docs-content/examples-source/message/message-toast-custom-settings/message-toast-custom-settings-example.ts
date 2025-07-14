import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxMessageToastConfig,
  NxMessageToastRef,
  NxMessageToastService,
} from '@allianz/ng-aquila/message';
import { Component, TemplateRef, ViewChild } from '@angular/core';

export const myCustomConfig: NxMessageToastConfig = {
  duration: 0,
  context: 'success',
  announcementMessage: 'Yay, you see a success message toast',
};

/**
 * @title Custom Settings example
 */
@Component({
  selector: 'message-toast-custom-settings-example',
  templateUrl: './message-toast-custom-settings-example.html',
  styleUrls: ['./message-toast-custom-settings-example.css'],
  providers: [NxMessageToastService],
  imports: [NxButtonComponent],
})
export class MessageToastCustomSettingsExampleComponent {
  @ViewChild('template') templateRef!: TemplateRef<any>;

  toastRef!: NxMessageToastRef;

  constructor(private readonly messageToastService: NxMessageToastService) {}

  open() {
    this.toastRef = this.messageToastService.openFromTemplate(
      this.templateRef,
      myCustomConfig,
    );
  }

  close() {
    if (this.toastRef) {
      this.toastRef.dismiss();
    }
  }
}

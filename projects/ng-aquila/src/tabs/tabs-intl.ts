import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NxTabsIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  readonly changes = new Subject<void>();

  /**
   * The aria label for a closable tab's close button. Receives the tab's label
   * so the announced text can reference which tab is being closed.
   */
  closeAriaLabel = (label: string): string => `Close ${label || 'tab'}`;

  /**
   * The message announced to screen readers after a closable tab was closed.
   * Receives the label of the closed tab.
   */
  closeAnnouncement = (label: string): string => `${label || 'Tab'} closed`;
}

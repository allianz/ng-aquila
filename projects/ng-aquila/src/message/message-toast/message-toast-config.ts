import { AriaLivePoliteness } from '@angular/cdk/a11y';

/**
 * The contextual type of a message toast.
 *
 * `'success'` is deprecated: use `'positive'` instead.
 */
export type NxMessageToastContext = 'info' | 'warning' | 'critical' | 'positive' | 'success';

/**
 * Configuration used when opening a message toast.
 */
export class NxMessageToastConfig<D = any> {
  /**
   * The politeness level for the LiveAnnouncer announcement.
   *
   * Default: `'polite'`.
   */
  politeness?: AriaLivePoliteness = 'polite';

  /**
   * Message to be announced by the LiveAnnouncer. When opening a toast message without a custom
   * component or template, the announcement message will default to the specified message.
   *
   * Default: `''`.
   */
  announcementMessage?: string = '';

  /**
   * The length of time in milliseconds to wait before automatically dismissing the message toast.
   *
   * Default: `3000`.
   */
  duration?: number = 3000;

  /**
   * Context of the message toast.
   *
   * Default: `'info'`.
   */
  context?: NxMessageToastContext = 'info';

  /**
   * Whether the context icon is shown.
   *
   * Default: `true`.
   */
  showContextIcon?: boolean = true;

  /** Data being injected into the child component. */
  data?: D | null = null;
}

/**
 * Needed so that the user text data can be injected in the message toast component.
 * @docs-private
 */
export class NxMessageToastData {
  constructor(readonly data: string) {}
}

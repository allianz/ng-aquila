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

  /**
   * Id of the `aria-live` wrapper element that holds the message toasts. Set a unique value when
   * several Angular apps share a page.
   *
   * Only honored on the root (first-created) service: passing it to `open()` has no effect,
   * and a value set on a nested/component-level provider is ignored, since child services inherit the parent's region.
   *
   * Default: `'nx-toast-message-region'`.
   */
  wrapperId?: string;
}

/** Default id of the `aria-live` wrapper element the toasts are rendered into. */
export const NX_MESSAGE_TOAST_DEFAULT_WRAPPER_ID = 'nx-toast-message-region';

/**
 * Needed so that the user text data can be injected in the message toast component.
 * @docs-private
 */
export class NxMessageToastData {
  constructor(readonly data: string) {}
}

import { NxButtonModule } from '@allianz/ng-aquila/button';
import { IconSize, NxIconModule, NxStatusIconType } from '@allianz/ng-aquila/icon';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  Input,
  input,
  signal,
} from '@angular/core';

import { NxMessageComponent, ResolvedContext } from '../message/message.component';

/**
 * The contextual type of a message banner. Banners take every message context but `'regular'`.
 *
 * `'error'` and `'success'` are deprecated: use `'critical'` and `'positive'` instead.
 */
export type BANNER_CONTEXT = 'info' | 'critical' | 'positive' | 'warning' | 'error' | 'success';

// `nx-status-icon` use error and success for the critical and positive contexts.
const STATUS_ICON_TYPES: { readonly [k in ResolvedContext]?: NxStatusIconType } = {
  info: 'info',
  critical: 'error',
  positive: 'success',
  warning: 'warning',
};

/** Where the projected actions of a message banner sit relative to its content. */
export type BANNER_ACTION_LAYOUT = 'horizontal' | 'vertical';

/** Container for the action buttons of a message banner. */
@Directive({
  selector: '[nxMessageBannerActions]',
  host: {
    '[class.nx-message-banner__actions]': 'true',
  },
  standalone: true,
})
export class NxMessageBannerActions {}

@Component({
  selector: 'nx-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['../message/message.component.scss', './message-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessageBanner',
  imports: [NxIconModule, NxButtonModule],
  host: {
    '[class.nx-message-banner--actions-horizontal]': 'actionLayout() === "horizontal"',
    '[class.nx-message-banner--actions-vertical]': 'actionLayout() === "vertical"',
  },
})
export class NxMessageBannerComponent extends NxMessageComponent {
  /**
   * Where the projected actions sit: `'horizontal'` puts them on the same line as the content,
   * next to the close button, `'vertical'` on their own line below it.
   *
   * Default: `'horizontal'`.
   */
  readonly actionLayout = input<BANNER_ACTION_LAYOUT>('horizontal');

  protected readonly _statusIconType = computed<NxStatusIconType>(
    () => STATUS_ICON_TYPES[this._effectiveContext()] ?? 'info',
  );

  protected readonly _contextIconSize = computed<IconSize>(() => (this._isA1() ? 'xl' : 's'));

  // Banners show no context icon under A1 but do under the other themes, so an unset `showContextIcon`
  // falls back to the theme instead of to a single fixed default.
  protected override readonly _showContextIcon = computed(
    () => this.showContextIcon() ?? !this._isA1(),
  );

  /**
   * Sets the context of the message banner. The message box will color accordingly.
   *
   * Default: `'info'`.
   */
  @Input() set context(value: BANNER_CONTEXT) {
    this._updateContext(value);
  }
  get context(): BANNER_CONTEXT {
    return this._context() as BANNER_CONTEXT;
  }
  _context = signal<BANNER_CONTEXT>('info');

  override _closable = signal(true);

  constructor(_fm: FocusMonitor) {
    super(_fm);
  }
}

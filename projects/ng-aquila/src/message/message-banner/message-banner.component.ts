import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  Input,
  signal,
} from '@angular/core';

import { NxMessageComponent } from '../message/message.component';

/**
 * The contextual type of a message banner. Banners take every message context but `'regular'`.
 *
 * `'error'` and `'success'` are deprecated: use `'critical'` and `'positive'` instead.
 */
export type BANNER_CONTEXT = 'info' | 'critical' | 'positive' | 'warning' | 'error' | 'success';

@Component({
  selector: 'nx-message-banner',
  templateUrl: '../message/message.component.html',
  styleUrls: ['../message/message.component.scss', './message-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessageBanner',
  imports: [NxIconModule, NxButtonModule],
})
export class NxMessageBannerComponent extends NxMessageComponent {
  protected override _hideIcon = computed(() => this._isAllianzOne());

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

  _closable = true;

  constructor(_cdr: ChangeDetectorRef, _fm: FocusMonitor) {
    super(_cdr, _fm);
  }
}

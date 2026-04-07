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

import { CONTEXT, NxMessageComponent } from '../message/message.component';

export type BANNER_CONTEXT = 'info' | 'error' | 'warning';

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
    return this._context();
  }
  _context = signal<BANNER_CONTEXT>('info');

  _closable = true;

  _allowedContexts: CONTEXT[] = ['info', 'error', 'warning'];

  constructor(_cdr: ChangeDetectorRef, _fm: FocusMonitor) {
    super(_cdr, _fm);
  }
}

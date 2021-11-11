import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { NxMessageComponent, CONTEXT } from '../message/message.component';

export type BANNER_CONTEXT = 'info' | 'error' | 'warning';

@Component({
  selector: 'nx-message-banner',
  templateUrl: '../message/message.component.html',
  styleUrls: ['../message/message.component.scss', './message-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessageBanner'
})
export class NxMessageBannerComponent extends NxMessageComponent {
  _context: CONTEXT = 'info';

  _closable: boolean = true;

  _allowedContexts: CONTEXT[] = ['info', 'error', 'warning'];

  constructor(_cdr: ChangeDetectorRef, _fm: FocusMonitor) {
    super(_cdr, _fm);
  }

  /**
  * Sets the context of the message banner.
  * The message box will color accordingly. Default: 'info'
  */
  @Input('context')
  set context(value: BANNER_CONTEXT) {
    this._updateContext(value);
  }
  get context(): BANNER_CONTEXT {
    return this._context as BANNER_CONTEXT;
  }
}

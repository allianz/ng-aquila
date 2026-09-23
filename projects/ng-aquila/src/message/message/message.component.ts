import { NxButtonModule } from '@allianz/ng-aquila/button';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

import { NxMessageBase } from '../message-base';

export { CONTEXT, ResolvedContext } from '../message-base';

const ICONS: { readonly [k: string]: string } = {
  info: 'info-circle',
  critical: 'exclamation-triangle',
  positive: 'check-circle',
  warning: 'exclamation-circle-warning',
};

const A1ICONS: { readonly [k: string]: string } = {
  info: 'info-circle',
  critical: 'exclamation-circle',
  positive: 'check-circle',
  warning: 'exclamation-triangle',
};

@Component({
  selector: 'nx-message',
  templateUrl: './message.component.html',
  styleUrls: ['../message-base.scss', './message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'nxMessage',
  imports: [NxIconModule, NxButtonModule],
  host: {
    '[class.nx-message--plain]': '!contained()',
  },
})
export class NxMessageComponent extends NxMessageBase {
  /** Whether the message is rendered inside a filled, bordered surface (`true`, default) or as plain icon and text (`false`). */
  readonly contained = input(true, { transform: booleanAttribute });

  // A plain message must not show a close button.
  protected override readonly _showCloseButton = computed(
    () => this._closable() && this.contained(),
  );

  // `regular` is absent from both maps, which is what renders a message without an icon.
  readonly _iconName = computed<string>(
    () => (this._isA1() ? A1ICONS : ICONS)[this._effectiveContext()] ?? '',
  );
}

import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxButtonBase } from './button-base';

/**
 * Accepts multiple tokens via the `nxButton` attribute:
 *
 * - type (required):       'primary' | 'secondary' | 'tertiary' | 'cta' | 'emphasis' | 'attention'
 * - size (optional):       'small' | 'small-medium' | 'medium' | 'large'
 * - variant (optional):    'negative' | 'block' | 'danger'
 *
 * Examples: <button nxButton="{type} {size} {variant}"/>
 */
@Component({
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  selector: 'button[nxButton], a[nxButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxButton'],
  providers: [{ provide: NxTriggerButton, useExisting: NxButtonComponent }],
  host: {
    class: 'nx-button',
  },
  standalone: true,
  imports: [NxSpinnerComponent],
})
export class NxButtonComponent extends NxButtonBase {
  constructor() {
    super();
  }
}

export { NxButtonComponent as NxAnchorButtonComponent };

import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxButtonBase } from './button-base';

/**
 * @description
 * The `nxButton` attribute applies button styles based on the provided type.
 * @required type: 'primary' | 'secondary' | 'tertiary' | 'cta' | 'emphasis' | 'attention'
 * @example
 * ```html
 * <button nxButton="primary"></button>
 * <a nxButton="secondary"></a>
 * ```
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

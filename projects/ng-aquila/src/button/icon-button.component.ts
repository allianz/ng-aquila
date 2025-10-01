import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { NxSpinnerComponent } from '@allianz/ng-aquila/spinner';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxButtonBase } from './button-base';

@Component({
  selector: 'button[nxIconButton], a[nxIconButton]',
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxIconButton'],
  providers: [{ provide: NxTriggerButton, useExisting: NxIconButtonComponent }],
  host: {
    class: 'nx-icon-button',
  },
  standalone: true,
  imports: [NxSpinnerComponent],
})
export class NxIconButtonComponent extends NxButtonBase {
  constructor() {
    super();
  }
}

export { NxIconButtonComponent as NxAnchorIconButtonComponent };

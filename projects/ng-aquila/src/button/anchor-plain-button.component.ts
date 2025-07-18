import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxAnchorButtonBase } from './button-base';

@Component({
  templateUrl: './plain-button.component.html',
  styleUrls: ['plain-button.component.scss'],
  selector: 'a[nxPlainButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxPlainButton'],
  providers: [{ provide: NxTriggerButton, useExisting: NxAnchorPlainButtonComponent }],
  host: {
    class: 'nx-plain-button',
  },
  standalone: true,
})
export class NxAnchorPlainButtonComponent extends NxAnchorButtonBase {}

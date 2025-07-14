import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxAnchorButtonBase } from './button-base';

@Component({
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  selector: 'a[nxIconButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxIconButton'],
  providers: [{ provide: NxTriggerButton, useExisting: NxAnchorIconButtonComponent }],
  host: {
    class: 'nx-icon-button',
  },
  standalone: true,
})
export class NxAnchorIconButtonComponent extends NxAnchorButtonBase {}

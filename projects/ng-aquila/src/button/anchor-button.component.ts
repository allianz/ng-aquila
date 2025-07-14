import { NxTriggerButton } from '@allianz/ng-aquila/overlay';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NxAnchorButtonBase } from './button-base';

@Component({
  templateUrl: './button.html',
  styleUrls: ['button.scss'],
  selector: 'a[nxButton]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['classNames:nxButton'],
  providers: [{ provide: NxTriggerButton, useExisting: NxAnchorButtonComponent }],
  host: {
    class: 'nx-button',
  },
  standalone: true,
})
export class NxAnchorButtonComponent extends NxAnchorButtonBase {}

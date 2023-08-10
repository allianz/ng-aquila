import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

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
})
export class NxAnchorIconButtonComponent extends NxAnchorButtonBase {}

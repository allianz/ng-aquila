import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

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
})
export class NxAnchorButtonComponent extends NxAnchorButtonBase {}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxTriggerButton } from '@aposin/ng-aquila/overlay';

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
})
export class NxAnchorPlainButtonComponent extends NxAnchorButtonBase {}

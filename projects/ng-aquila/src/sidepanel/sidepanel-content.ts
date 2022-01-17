import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nx-sidepanel-content',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sidepanel-content.scss'],
    host: {
        tabindex: '0',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSidepanelContentComponent {}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nx-sidepanel-header',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sidepanel-header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxSidepanelHeaderComponent {}

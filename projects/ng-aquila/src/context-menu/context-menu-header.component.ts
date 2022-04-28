import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'nx-context-menu-header',
    template: '<ng-content></ng-content>',
    host: {
        class: 'nx-context-menu-header',
    },
    styleUrls: ['./context-menu-header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxContextMenuHeaderComponent {}

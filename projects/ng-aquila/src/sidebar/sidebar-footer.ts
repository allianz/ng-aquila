import { Component } from '@angular/core';

@Component({
    selector: 'nx-sidebar-footer',
    host: {
        class: 'nx-sidebar__footer',
    },
    styleUrls: ['./sidebar-footer.scss'],
    template: '<div class="nx-sidebar__footer-container"><ng-content></ng-content></div>',
})
export class NxSidebarFooterComponent {}

import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@Component({
    selector: 'li[nxListIcon]',
    host: {
        '[class.nx-list__icon-wrapper]': 'true',
    },
    template: `<span class="nx-list__icon">
            <nx-icon [name]="name" aria-hidden="true"></nx-icon>
        </span>
        <ng-content></ng-content>`,
    standalone: true,
    imports: [NxIconModule],
})
export class NxListIconComponent {
    /** @docs-private */
    @ViewChild('viewRefPrefix', { read: ViewContainerRef }) viewRefPrefix!: ViewContainerRef;

    /** Sets the name of the icon to be displayed. */
    @Input('nxListIcon') name!: string;
}

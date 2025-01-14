import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { randomString } from '@aposin/ng-aquila/utils';

@Component({
    selector: 'nx-dropdown-group',
    templateUrl: 'dropdown-group.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['dropdown-group.scss'],
    standalone: true,
    host: {
        role: 'group',
        '[attr.aria-labelledby]': 'id',
    },
})
export class NxDropdownGroupComponent {
    private static nextId = 0;

    id = `nx-dropdown-group-${randomString()}-${NxDropdownGroupComponent.nextId++}`;

    /** Label displayed in the group. */
    @Input() label!: string;
}

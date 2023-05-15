import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'nx-dropdown-group',
    templateUrl: 'dropdown-group.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['dropdown-group.scss'],
})
export class NxDropdownGroupComponent {
    /** Label displayed in the group. */
    @Input() label!: string;
}

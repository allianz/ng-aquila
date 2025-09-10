import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';

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
  id = inject(IdGenerationService).nextId('nx-dropdown-group');
  /** Label displayed in the group. */
  @Input() label!: string;
}

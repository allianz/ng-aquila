import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

@Component({
  selector: 'nx-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nx-sidebar-group',
    role: 'group',
    '[attr.aria-labelledby]': 'label() ? _labelId : null',
  },
})
export class NxSidebarGroupComponent {
  /** The group header. Screen readers announce it as the name of the group. */
  readonly label = input<string>();

  protected readonly _labelId = inject(IdGenerationService).nextId('nx-sidebar-group-label');
}

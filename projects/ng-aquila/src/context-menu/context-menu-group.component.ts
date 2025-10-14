import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { IdGenerationService } from '@allianz/ng-aquila/utils';

@Component({
  selector: 'nx-context-menu-group',
  templateUrl: './context-menu-group.component.html',
  styleUrls: ['./context-menu-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.role]': '"group"',
  },
})
export class NxContextMenuGroupComponent {
  private readonly _idService = inject(IdGenerationService);

  readonly label = input<string>();
  readonly labelId = this._idService.nextId('context-menu-group-label');
}

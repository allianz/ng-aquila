import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-divider',
  template: '',
  styleUrls: ['divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'separator',
    class: 'nx-divider',
  },
  standalone: true,
})
export class NxDividerComponent {}

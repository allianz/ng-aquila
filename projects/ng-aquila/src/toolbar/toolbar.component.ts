import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nx-toolbar',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['toolbar.component.scss'],
  standalone: true,
})
export class NxToolbarComponent {}

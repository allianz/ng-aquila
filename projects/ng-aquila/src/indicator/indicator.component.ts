
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'nx-indicator',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./indicator.component.scss']
})
export class NxIndicatorComponent { }

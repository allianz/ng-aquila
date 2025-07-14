import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxStatusIconComponent } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Status icon Example
 */

@Component({
  selector: 'status-icon-example',
  templateUrl: './status-icon-example.html',
  styleUrls: ['./status-icon-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxHeadlineComponent, NxStatusIconComponent],
})
export class StatusIconExampleComponent {}

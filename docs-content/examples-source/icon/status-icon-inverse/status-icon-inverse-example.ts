import {
  NxStatusIconComponent,
  NxStatusIconType,
} from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Status icon inverse Example
 */
@Component({
  selector: 'status-icon-inverse-example',
  templateUrl: './status-icon-inverse-example.html',
  styleUrls: ['./status-icon-inverse-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxStatusIconComponent],
})
export class StatusIconInverseExampleComponent {
  protected readonly types: NxStatusIconType[] = [
    'success',
    'warning',
    'info',
    'error',
  ];
}

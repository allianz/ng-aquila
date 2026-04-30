import {
  NxStatusIconComponent,
  NxStatusIconSize,
  NxStatusIconType,
} from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Status icon Example
 */

@Component({
  selector: 'status-icon-sizes-example',
  templateUrl: './status-icon-sizes-example.html',
  styleUrls: ['./status-icon-sizes-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxStatusIconComponent],
})
export class StatusIconSizesExampleComponent {
  protected readonly types: NxStatusIconType[] = [
    'success',
    'warning',
    'info',
    'error',
  ];
  protected readonly sizes: NxStatusIconSize[] = ['s', 'm', 'l', 'xl', '2xl'];
}

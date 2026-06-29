import {
  NxStatusIconComponent,
  NxStatusIconSize,
  NxStatusIconType,
} from '@allianz/ng-aquila/icon';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Status icon contained Example
 */
@Component({
  selector: 'status-icon-contained-example',
  templateUrl: './status-icon-contained-example.html',
  styleUrls: ['./status-icon-contained-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxStatusIconComponent, NxSwitcherComponent, FormsModule],
})
export class StatusIconContainedExampleComponent {
  protected readonly inverse = signal(false);
  protected readonly types: NxStatusIconType[] = [
    'success',
    'warning',
    'info',
    'error',
  ];
  protected readonly sizes: NxStatusIconSize[] = ['s', 'm', 'l', 'xl', '2xl'];
}

import { NxCardModule } from '@allianz/ng-aquila/card';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Clickable Card Example
 */
@Component({
  selector: 'clickable-card-example',
  templateUrl: './clickable-card-example.html',
  styleUrl: './clickable-card-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCardModule, NxLinkModule, NxIconModule],
})
export class ClickableCardExampleComponent {
  edit() {
    alert('clicked on edit button');
  }
}

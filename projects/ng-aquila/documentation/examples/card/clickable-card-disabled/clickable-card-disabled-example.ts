import { NxCardModule } from '@allianz/ng-aquila/card';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * @title Disabled clickable card
 */
@Component({
  selector: 'clickable-card-disabled-example',
  templateUrl: './clickable-card-disabled-example.html',
  styleUrl: './clickable-card-disabled-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCardModule, RouterModule],
})
export class ClickableCardDisabledExampleComponent {
  disabled = true;
}

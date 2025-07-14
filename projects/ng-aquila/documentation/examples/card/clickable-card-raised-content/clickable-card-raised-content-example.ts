import { NxCardModule } from '@allianz/ng-aquila/card';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxLinkModule } from '@allianz/ng-aquila/link';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Raising content in a clickable card
 */
@Component({
  selector: 'clickable-card-raised-content-example',
  templateUrl: './clickable-card-raised-content-example.html',
  styleUrl: './clickable-card-raised-content-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxCardModule, NxLinkModule, NxIconModule],
})
export class ClickableCardRaisedContentExampleComponent {}

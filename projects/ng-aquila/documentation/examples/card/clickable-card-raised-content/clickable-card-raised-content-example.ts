import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';

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

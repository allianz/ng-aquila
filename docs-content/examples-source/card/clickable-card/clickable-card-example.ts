import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NxCardModule } from '@aposin/ng-aquila/card';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxLinkModule } from '@aposin/ng-aquila/link';

/**
 * @title Clickable Card Example
 */
@Component({
    selector: 'clickable-card-example',
    templateUrl: './clickable-card-example.html',
    styleUrl: './clickable-card-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NxCardModule, NxLinkModule, NxIconModule],
})
export class ClickableCardExampleComponent {
    edit() {
        alert('clicked on edit button');
    }
}

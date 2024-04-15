import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Disabled clickable card
 */
@Component({
    selector: 'clickable-card-disabled-example',
    templateUrl: './clickable-card-disabled-example.html',
    styleUrl: './clickable-card-disabled-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickableCardDisabledExampleComponent {
    disabled = true;
}

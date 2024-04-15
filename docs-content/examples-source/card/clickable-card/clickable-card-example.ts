import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Clickable Card Example
 */
@Component({
    selector: 'clickable-card-example',
    templateUrl: './clickable-card-example.html',
    styleUrl: './clickable-card-example.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickableCardExampleComponent {
    edit() {
        alert('clicked on edit button');
    }
}

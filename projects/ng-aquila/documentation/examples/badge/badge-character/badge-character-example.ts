import { Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
/**
 * @title Basic badge example
 */
@Component({
    selector: 'badge-character-example',
    templateUrl: './badge-character-example.html',
    styleUrls: ['./badge-character-example.css'],
    standalone: true,
    imports: [NxBadgeComponent],
})
export class BadgeCharacterExampleComponent {}

import { Component } from '@angular/core';
import { NxBadgeComponent } from '@aposin/ng-aquila/badge';
/**
 * @title Basic badge example
 */
@Component({
    selector: 'badge-example',
    templateUrl: './badge-example.html',
    styleUrls: ['./badge-example.css'],
    standalone: true,
    imports: [NxBadgeComponent],
})
export class BadgeExampleComponent {}

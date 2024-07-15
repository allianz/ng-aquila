import { Component } from '@angular/core';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import { NxSwipebarComponent } from '@aposin/ng-aquila/swipebar';

/**
 * @title Basic Swipebar
 */
@Component({
    selector: 'swipebar-example',
    templateUrl: './swipebar-example.html',
    styleUrls: ['swipebar-example.css'],
    standalone: true,
    imports: [NxSwipebarComponent, NxCopytextComponent],
})
export class SwipebarExampleComponent {}

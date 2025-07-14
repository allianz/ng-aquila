import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import { NxSwipebarComponent } from '@allianz/ng-aquila/swipebar';
import { Component } from '@angular/core';

/**
 * @title Basic Swipebar
 */
@Component({
  selector: 'swipebar-example',
  templateUrl: './swipebar-example.html',
  styleUrls: ['swipebar-example.css'],
  imports: [NxSwipebarComponent, NxCopytextComponent],
})
export class SwipebarExampleComponent {}

import { NxProgressbarComponent } from '@allianz/ng-aquila/progressbar';
import { Component } from '@angular/core';

/**
 * @title Progress Bar Basic Example
 */
@Component({
  selector: 'progressbar-basic-example',
  templateUrl: './progressbar-basic-example.html',
  styleUrls: ['./progressbar-basic-example.css'],
  imports: [NxProgressbarComponent],
})
export class ProgressbarBasicExampleComponent {
  myProgress = 0.3;
}

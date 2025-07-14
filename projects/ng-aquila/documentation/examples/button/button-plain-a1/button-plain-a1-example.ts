import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Plain Button One Allianz additions
 */
@Component({
  selector: 'button-plain-a1-example',
  templateUrl: './button-plain-a1-example.html',
  styleUrls: ['./button-plain-a1-example.css'],
  imports: [NxHeadlineComponent, NxPlainButtonComponent, NxIconComponent],
})
export class ButtonPlainA1ExampleComponent {}

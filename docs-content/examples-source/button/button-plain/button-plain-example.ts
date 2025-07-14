import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Plain Buttons Example
 */
@Component({
  selector: 'button-plain-example',
  templateUrl: './button-plain-example.html',
  styleUrls: ['./button-plain-example.css'],
  imports: [NxPlainButtonComponent, NxIconComponent],
})
export class ButtonPlainExampleComponent {}

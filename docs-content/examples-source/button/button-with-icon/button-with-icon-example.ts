import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Icon Example
 */
@Component({
  selector: 'button-with-icon-example',
  templateUrl: './button-with-icon-example.html',
  styleUrls: ['./button-with-icon-example.css'],
  imports: [NxButtonComponent, NxIconComponent],
})
export class ButtonWithIconExampleComponent {}

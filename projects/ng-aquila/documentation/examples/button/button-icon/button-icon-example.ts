import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Icon Button Example
 */
@Component({
  selector: 'button-icon-example',
  templateUrl: './button-icon-example.html',
  styleUrls: ['./button-icon-example.css'],
  imports: [NxIconButtonComponent, NxIconComponent],
})
export class ButtonIconExampleComponent {}

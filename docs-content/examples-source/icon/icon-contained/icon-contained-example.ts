import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { Component } from '@angular/core';

/**
 * @title Icons Contained Example
 */
@Component({
  selector: 'icon-contained-example',
  templateUrl: './icon-contained-example.html',
  styleUrls: ['./icon-contained-example.css'],
  imports: [NxIconComponent, A11yModule],
})
export class IconContainedExampleComponent {}

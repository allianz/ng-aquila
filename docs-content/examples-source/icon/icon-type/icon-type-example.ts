import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { Component } from '@angular/core';

/**
 * @title Icons Type Example
 */
@Component({
  selector: 'icon-type-example',
  templateUrl: './icon-type-example.html',
  styleUrls: ['./icon-type-example.css'],
  imports: [NxIconComponent, A11yModule],
})
export class IconTypeExampleComponent {}

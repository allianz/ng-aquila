import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { A11yModule } from '@angular/cdk/a11y';
import { Component } from '@angular/core';

/**
 * @title Icons Emphasis Example
 */
@Component({
  selector: 'icon-emphasis-example',
  templateUrl: './icon-emphasis-example.html',
  styleUrls: ['./icon-emphasis-example.css'],
  imports: [NxIconComponent, A11yModule],
})
export class IconEmphasisExampleComponent {}

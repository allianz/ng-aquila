import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { A11yModule } from '@angular/cdk/a11y';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Icons Attention Colors Example
 */
@Component({
  selector: 'icon-attention-colors-example',
  templateUrl: './icon-attention-colors-example.html',
  styleUrls: ['./icon-attention-colors-example.css'],
  imports: [NxIconComponent, NxSwitcherComponent, FormsModule, A11yModule],
})
export class IconAttentionColorsExampleComponent {
  inverse = signal(false);
}

import { IconSize, NxIconComponent } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Icons Contained Sizes Example
 */
@Component({
  selector: 'icon-contained-sizes-example',
  templateUrl: './icon-contained-sizes-example.html',
  styleUrls: ['./icon-contained-sizes-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NxIconComponent],
})
export class IconContainedSizesExampleComponent {
  protected readonly sizes: IconSize[] = ['s', 'm', 'l', 'xl', '2xl'];
}

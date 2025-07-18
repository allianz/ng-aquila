import { NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';

/**
 * @title Tag Accessibility Example
 */
@Component({
  selector: 'taglist-a11y-example',
  templateUrl: './taglist-a11y-example.html',
  styleUrls: ['./taglist-a11y-example.css'],
  imports: [NxTaglistComponent],
})
export class TaglistA11yExampleComponent {
  tags = ['Apples', 'Oranges', 'Bananas', 'Strawberries', 'Melons', 'Lemons'];
}

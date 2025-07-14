import { NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';

/**
 * @title Tag Delete Tag Example
 */
@Component({
  selector: 'taglist-delete-example',
  templateUrl: './taglist-delete-example.html',
  styleUrls: ['./taglist-delete-example.css'],
  imports: [NxTaglistComponent],
})
export class TaglistDeleteExampleComponent {
  tags: string[] = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
}

import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { Component, signal } from '@angular/core';

/**
 * @title Tag Inverse Example
 */
@Component({
  selector: 'tag-inverse-example',
  templateUrl: './tag-inverse-example.html',
  styleUrls: ['./tag-inverse-example.css'],
  standalone: true,
  imports: [NxTagGroupComponent, NxTagComponent],
})
export class TagInverseExampleComponent {
  tags = signal(['Apples', 'Oranges', 'Bananas', 'Strawberries']);
  removableTags = signal(['Lemons', 'Melons', 'Grapes']);
  selectedReadonly = ['selected'];

  removeTag(tag: string) {
    this.removableTags.update((tags) => tags.filter((t) => t !== tag));
  }
}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { TitleCasePipe } from '@angular/common';
import { Component, signal } from '@angular/core';

/**
 * @title Tags rendering example
 */
@Component({
  selector: 'tag-label-rendering-example',
  templateUrl: './tag-label-rendering-example.html',
  styleUrls: ['./tag-label-rendering-example.css'],
  standalone: true,
  imports: [
    NxTagGroupComponent,
    NxTagComponent,
    TitleCasePipe,
    NxButtonComponent,
    NxCopytextComponent,
  ],
})
export class TagLabelRenderingExampleComponent {
  private readonly initialTags = ['fruits', 'vegetables', 'meat', 'fish'];
  private readonly initialTagsWithCount = [
    { label: 'fruits', count: 2 },
    { label: 'vegetables', count: 5 },
    { label: 'meat', count: 3 },
    { label: 'fish', count: 8 },
  ];

  tags = signal([...this.initialTags]);
  tagsWithCount = signal([...this.initialTagsWithCount]);

  removeTag(tag: string) {
    this.tags.update((tags) => tags.filter((t) => t !== tag));
  }

  removeTagWithCount(label: string) {
    this.tagsWithCount.update((tags) => tags.filter((t) => t.label !== label));
  }

  reset() {
    this.tags.set([...this.initialTags]);
    this.tagsWithCount.set([...this.initialTagsWithCount]);
  }
}

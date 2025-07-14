import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * @title Tag Group Example
 */
@Component({
  selector: 'tag-group-example',
  templateUrl: './tag-group-example.html',
  styleUrls: ['./tag-group-example.css'],
  standalone: true,
  imports: [NxTagGroupComponent, NxTagComponent, ReactiveFormsModule],
})
export class TagGroupExampleComponent {
  tags: string[] = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
}

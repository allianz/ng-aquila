import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * @title Tag Group Readonly Example
 */
@Component({
  selector: 'tags-readonly-example',
  templateUrl: './tags-readonly-example.html',
  styleUrls: ['./tags-readonly-example.css'],
  standalone: true,
  imports: [
    NxTagGroupComponent,
    NxTagComponent,
    ReactiveFormsModule,
    NxCopytextComponent,
  ],
})
export class TagsReadonlyExampleComponent {
  tags: string[] = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
}

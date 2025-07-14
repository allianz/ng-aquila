import { NxButtonComponent } from '@allianz/ng-aquila/button';
import { NxCopytextComponent } from '@allianz/ng-aquila/copytext';
import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Tag Group Readonly Example
 */
@Component({
  selector: 'tags-disabled-example',
  templateUrl: './tags-disabled-example.html',
  styleUrls: ['./tags-disabled-example.css'],
  standalone: true,
  imports: [
    NxTagGroupComponent,
    NxTagComponent,
    ReactiveFormsModule,
    NxCopytextComponent,
    ReactiveFormsModule,
    NxButtonComponent,
  ],
})
export class TagsDisabledExampleComponent {
  tags: string[] = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
  tagsControl = new FormControl({ value: '', disabled: true });

  toggleDisabled() {
    if (this.tagsControl.disabled) {
      this.tagsControl.enable();
    } else {
      this.tagsControl.disable();
    }
  }
}

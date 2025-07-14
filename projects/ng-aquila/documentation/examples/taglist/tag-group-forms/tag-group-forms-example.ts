import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { JsonPipe } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * @title Tag Group Forms Example
 */
@Component({
  selector: 'tag-group-forms-example',
  templateUrl: './tag-group-forms-example.html',
  styleUrls: ['./tag-group-forms-example.css'],
  standalone: true,
  imports: [
    NxTagGroupComponent,
    NxTagComponent,
    ReactiveFormsModule,
    JsonPipe,
    FormsModule,
    NxSwitcherComponent,
  ],
})
export class TagGroupFormsExampleComponent {
  tags: string[] = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
  control = new FormControl<string[]>(['melons']);
  value = signal<string[]>(['apples', 'oranges']);
  disabled = signal(false);

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    });
  }
}

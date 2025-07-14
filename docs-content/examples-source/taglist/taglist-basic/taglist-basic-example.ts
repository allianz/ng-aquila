import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';

/**
 * @title Tag Basic Example
 */
@Component({
  selector: 'taglist-basic-example',
  templateUrl: './taglist-basic-example.html',
  styleUrls: ['./taglist-basic-example.css'],
  imports: [
    NxTaglistComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxButtonComponent,
  ],
})
export class TaglistBasicExampleComponent {
  tags: string[] = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
}

import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

/**
 * @title Tag Objects Example
 */
@Component({
  selector: 'taglist-objects-example',
  templateUrl: './taglist-objects-example.html',
  styleUrls: ['./taglist-objects-example.css'],
  imports: [
    NxTaglistComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxButtonComponent,
    JsonPipe,
  ],
})
export class TaglistObjectsExampleComponent {
  tags: any[] = [
    { nxTaglistLabel: 'Apples' },
    { nxTaglistLabel: 'Oranges' },
    { nxTaglistLabel: 'asd' },
  ];
}

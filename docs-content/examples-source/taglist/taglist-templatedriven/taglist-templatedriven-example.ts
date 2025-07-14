import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldComponent,
  NxFormfieldHintDirective,
} from '@allianz/ng-aquila/formfield';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxTaglistComponent } from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Tag Template Driven Example
 */
@Component({
  selector: 'taglist-templatedriven-example',
  templateUrl: './taglist-templatedriven-example.html',
  styleUrls: ['./taglist-templatedriven-example.css'],
  imports: [
    FormsModule,
    NxTaglistComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxFormfieldHintDirective,
    NxButtonComponent,
  ],
})
export class TaglistTemplatedrivenExampleComponent {
  templateModel = [
    'Apples',
    'Oranges',
    'Bananas',
    'Strawberries',
    'Melons',
    'Lemons',
  ];
}

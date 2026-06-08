import {
  NxTagComponent,
  NxTagGroupComponent,
} from '@allianz/ng-aquila/taglist';
import { Component } from '@angular/core';

/**
 * @title Tag Count Example
 */
@Component({
  selector: 'tag-count-example',
  templateUrl: './tag-count-example.html',
  standalone: true,
  imports: [NxTagGroupComponent, NxTagComponent],
})
export class TagCountExampleComponent {}

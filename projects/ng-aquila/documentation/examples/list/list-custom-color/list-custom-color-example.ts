import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

/**
 * @title Custom list item color example
 */
@Component({
  selector: 'list-custom-color-example',
  templateUrl: './list-custom-color-example.html',
  styleUrls: ['./list-custom-color-example.css'],
  imports: [NxListComponent, NxListIconComponent],
})
export class ListCustomColorExampleComponent {}

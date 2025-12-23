import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

/**
 * @title List type example
 */
@Component({
  selector: 'list-type-example',
  templateUrl: './list-type-example.html',
  styleUrls: ['./list-type-example.css'],
  imports: [NxListComponent, NxListIconComponent],
})
export class ListTypeExampleComponent {}

import { NxListComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

/**
 * @title Nested lists
 */
@Component({
  selector: 'list-nesting-example',
  templateUrl: './list-nesting-example.html',
  styleUrls: ['./list-nesting-example.css'],
  imports: [NxListComponent],
})
export class ListNestingExampleComponent {}

import { NxHeadlineModule } from '@allianz/ng-aquila/headline';
import { NxListModule } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

/**
 * @title Condensed list example
 */
@Component({
  selector: 'list-condensed-example',
  templateUrl: './list-condensed-example.html',
  styleUrls: ['./list-condensed-example.css'],
  imports: [NxHeadlineModule, NxListModule],
})
export class ListCondensedExampleComponent {}

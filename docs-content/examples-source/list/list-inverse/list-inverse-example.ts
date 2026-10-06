import { NxListComponent, NxListIconComponent } from '@allianz/ng-aquila/list';
import { Component } from '@angular/core';

/**
 * @title Inverse styling example
 */
@Component({
  selector: 'list-inverse-example',
  templateUrl: './list-inverse-example.html',
  styleUrls: ['./list-inverse-example.css'],
  imports: [NxListComponent, NxListIconComponent],
})
export class ListInverseExampleComponent {}

import {
  NxHeaderCellDirective,
  NxTableCellComponent,
  NxTableComponent,
  NxTableRowComponent,
} from '@allianz/ng-aquila/table';
import { Component } from '@angular/core';

/**
 * @title Headline Sizes Mapping Example
 */
@Component({
  selector: 'headline-sizes-mapping-example',
  templateUrl: './headline-sizes-mapping-example.html',
  styleUrls: ['./headline-sizes-mapping-example.css'],
  imports: [
    NxTableComponent,
    NxTableRowComponent,
    NxHeaderCellDirective,
    NxTableCellComponent,
  ],
})
export class HeadlineSizesMappingExampleComponent {}

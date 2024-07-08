import { Component } from '@angular/core';
import {
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
} from '@aposin/ng-aquila/table';

/**
 * @title Headline Sizes Mapping Example
 */
@Component({
    selector: 'headline-sizes-mapping-example',
    templateUrl: './headline-sizes-mapping-example.html',
    styleUrls: ['./headline-sizes-mapping-example.css'],
    standalone: true,
    imports: [
        NxTableComponent,
        NxTableRowComponent,
        NxHeaderCellDirective,
        NxTableCellComponent,
    ],
})
export class HeadlineSizesMappingExampleComponent {}

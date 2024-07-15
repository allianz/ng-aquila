import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxHeaderCellDirective,
    NxTableCellComponent,
    NxTableComponent,
    NxTableRowComponent,
} from '@aposin/ng-aquila/table';

/**
 * @title Hidden classes
 */
@Component({
    selector: 'hidden-classes-example',
    templateUrl: './hidden-classes-example.html',
    styleUrls: ['./hidden-classes-example.css'],
    standalone: true,
    imports: [
        NxTableComponent,
        NxTableRowComponent,
        NxHeaderCellDirective,
        NgStyle,
        NxTableCellComponent,
    ],
})
export class HiddenClassesExampleComponent {
    breakpoints = [
        {
            name: 'tiny',
            prefix: 'xs',
        },
        {
            name: 'small',
            prefix: 's',
        },
        {
            prefix: 'm',
            name: 'medium',
        },
        {
            name: 'large',
            prefix: 'l',
        },
        {
            name: 'xlarge',
            prefix: 'xl',
        },
        {
            name: '2xlarge',
            prefix: '2xl',
        },
        {
            name: '3xlarge',
            prefix: '3xl',
        },
    ];
}

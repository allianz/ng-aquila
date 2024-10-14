import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxSliderComponent } from '@aposin/ng-aquila/slider';

/**
 * @title Container Query Example
 */
@Component({
    selector: 'grid-query-comparison-example',
    templateUrl: './grid-query-comparison-example.html',
    styleUrls: ['./grid-query-comparison-example.css'],
    standalone: true,
    imports: [
        NxSliderComponent,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
    ],
})
export class GridQueryComparisonComponent implements AfterViewInit {
    exampleGridWidth!: number;
    maxExampleGridWidth!: number;
    appendPx = (value: number | string) => `${value}px`;

    constructor(private readonly el: ElementRef) {}

    ngAfterViewInit(): void {
        this.exampleGridWidth = this.el.nativeElement.offsetWidth;
        this.maxExampleGridWidth = this.exampleGridWidth;
    }
}

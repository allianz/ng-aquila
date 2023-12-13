import { AfterViewInit, Component, ElementRef } from '@angular/core';

/**
 * @title Container Query Example
 */
@Component({
    selector: 'grid-query-comparison-example',
    templateUrl: './grid-query-comparison-example.html',
    styleUrls: ['./grid-query-comparison-example.scss'],
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

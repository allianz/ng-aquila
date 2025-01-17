import { Component, OnInit } from '@angular/core';
import { NxProgressbarComponent } from '@aposin/ng-aquila/progressbar';

/**
 * @title Progress Bar Example
 */
@Component({
    selector: 'progressbar-custom-range-example',
    templateUrl: './progressbar-custom-range-example.html',
    styleUrls: ['./progressbar-custom-range-example.css'],
    imports: [NxProgressbarComponent],
})
export class ProgressbarCustomRangeExampleComponent implements OnInit {
    value = 15;
    min = 5;
    max = 80;

    ngOnInit(): void {
        (async () => {
            while (this.value !== 80) {
                await new Promise(resolve => setTimeout(resolve, 2000));

                this.value = (this.value + 10) % this.max;
            }
        })();
    }

    getCompletedPercentage() {
        return Math.round(
            ((this.value - this.min) / (this.max - this.min)) * 100,
        );
    }
}

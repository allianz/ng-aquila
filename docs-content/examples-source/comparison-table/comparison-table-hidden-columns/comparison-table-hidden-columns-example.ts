import { Component } from '@angular/core';

/** @title Hidden Columns */
@Component({
    selector: 'nx-comparison-table-hidden-columns-example',
    templateUrl: './comparison-table-hidden-columns-example.html',
    styleUrls: ['./comparison-table-hidden-columns-example.css'],
})
export class ComparisonTableHiddenColumnsExampleComponent {
    hiddenIndexes: number[] = [];

    selectedColumnIndex = 1;

    isHiddenIndex = (index: number) => this.hiddenIndexes.includes(index);

    toggleHiddenIndexes(index: number) {
        if (index === this.selectedColumnIndex) {
            return;
        }

        if (!this.hiddenIndexes.includes(index)) {
            this.hiddenIndexes.push(index);
        } else {
            this.hiddenIndexes = this.hiddenIndexes.filter(
                value => value !== index,
            );
        }
    }

    selectedIndexChange(selectedColumnIndex: number) {
        this.selectedColumnIndex = selectedColumnIndex;
    }
}

import { Component } from '@angular/core';

/** @title Hidden Columns */
@Component({
  selector: 'nx-comparison-table-hidden-columns-example',
  templateUrl: './comparison-table-hidden-columns-example.html',
  styleUrls: ['./comparison-table-hidden-columns-example.css'],
})
export class ComparisonTableHiddenColumnsExampleComponent {
  hiddenIndexes = [];
  selectedColumnIndex = 1;

  isHiddenIndex = index => this.hiddenIndexes.indexOf(index) !== -1;

  toggleHiddenIndexes(index:number){
    if(index === this.selectedColumnIndex){
      return;
    }

    if(this.hiddenIndexes.indexOf(index) === -1){
      this.hiddenIndexes.push(index);
    } else {
      this.hiddenIndexes = this.hiddenIndexes.filter((value) => { 
        return value !== index;
      });
    }
  }

  selectedIndexChange(selectedColumnIndex: any){
    this.selectedColumnIndex = selectedColumnIndex;
  }
}

import {
  NxFormfieldComponent,
  NxFormfieldSuffixDirective,
} from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { NxPageSearchComponent } from '@allianz/ng-aquila/page-search';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Button click example
 */
@Component({
  selector: 'page-search-click-example',
  templateUrl: './page-search-click-example.html',
  styleUrls: ['./page-search-click-example.css'],
  imports: [
    NxPageSearchComponent,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxInputDirective,
    FormsModule,
    NxFormfieldSuffixDirective,
    NxIconComponent,
  ],
})
export class PageSearchClickExampleComponent {
  valuesByClick: string[] = [];
  searchTerm = '';

  onButtonClick(value: string) {
    this.valuesByClick.push(value);
  }
}

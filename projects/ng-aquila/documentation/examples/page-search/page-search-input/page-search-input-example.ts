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
 * @title Simple input example
 */
@Component({
  selector: 'page-search-input-example',
  templateUrl: './page-search-input-example.html',
  styleUrls: ['./page-search-input-example.css'],
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
export class PageSearchInputExampleComponent {
  searchTerm = '';
}

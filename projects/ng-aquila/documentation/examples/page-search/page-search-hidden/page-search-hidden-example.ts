import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxFormfieldComponent,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import { NxPageSearchComponent } from '@aposin/ng-aquila/page-search';

/**
 * @title Hidden search button example
 */
@Component({
    selector: 'page-search-hidden-example',
    templateUrl: './page-search-hidden-example.html',
    styleUrls: ['./page-search-hidden-example.css'],
    standalone: true,
    imports: [
        NxPageSearchComponent,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        FormsModule,
        NgIf,
        NxFormfieldSuffixDirective,
        NxIconComponent,
    ],
})
export class PageSearchHiddenExampleComponent {
    searchTerm = '';
}

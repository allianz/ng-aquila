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

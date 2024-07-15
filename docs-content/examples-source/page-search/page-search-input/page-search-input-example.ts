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
 * @title Simple input example
 */
@Component({
    selector: 'page-search-input-example',
    templateUrl: './page-search-input-example.html',
    styleUrls: ['./page-search-input-example.css'],
    standalone: true,
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

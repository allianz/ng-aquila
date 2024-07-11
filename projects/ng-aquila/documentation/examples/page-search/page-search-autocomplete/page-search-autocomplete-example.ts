import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    NxAutocompleteComponent,
    NxAutocompleteTriggerDirective,
} from '@aposin/ng-aquila/autocomplete';
import {
    NxFormfieldComponent,
    NxFormfieldPrefixDirective,
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
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class WikipediaService {
    private readonly WIKIPEDIA_URL = 'https://en.wikipedia.org/w/api.php';

    constructor(private readonly client: HttpClient) {}

    search(term: string): Observable<any[]> {
        const url = searchUrl(term, this.WIKIPEDIA_URL);
        return this.client
            .jsonp(url, 'callback')
            .pipe(
                map((response: any) =>
                    response[1].map((item: any) => ({ value: item })),
                ),
            );

        function searchUrl(searchTeam: string, base: string) {
            const params = new HttpParams()
                .append('action', 'opensearch')
                .append('search', encodeURIComponent(searchTeam))
                .append('format', 'json');
            return `${base}?${params.toString()}`;
        }
    }
}

/**
 * @title Autocomplete Example
 */
@Component({
    selector: 'page-search-autocomplete-example',
    templateUrl: './page-search-autocomplete-example.html',
    styleUrls: ['./page-search-autocomplete-example.css'],
    providers: [WikipediaService],
    standalone: true,
    imports: [
        NxPageSearchComponent,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxAutocompleteTriggerDirective,
        FormsModule,
        NxAutocompleteComponent,
        NxFormfieldPrefixDirective,
        NxIconComponent,
        NxFormfieldSuffixDirective,
    ],
})
export class PageSearchAutocompleteExampleComponent {
    searchFunction: (term: string) => Observable<string[]>;

    searchTerm1 = '';
    searchTerm2 = '';

    constructor(readonly wikipediaService: WikipediaService) {
        this.searchFunction = (term: string) =>
            wikipediaService
                .search(term)
                .pipe(
                    map((items: any) => items.map((item: any) => item.value)),
                );
    }
}

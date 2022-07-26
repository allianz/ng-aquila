import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
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

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
 * @title Default item rendering example
 */
@Component({
    selector: 'autocomplete-default-rendering-example',
    templateUrl: './autocomplete-default-rendering-example.html',
    styleUrls: ['./autocomplete-default-rendering-example.css'],
    providers: [WikipediaService],
})
export class AutocompleteDefaultRenderingExampleComponent {
    dynamicBackendOptions: (term: string) => Observable<string[]>;

    constructor(readonly wikipediaService: WikipediaService) {
        this.dynamicBackendOptions = (term: string) =>
            wikipediaService
                .search(term)
                .pipe(
                    map((items: any) => items.map((item: any) => item.value)),
                );
    }
}

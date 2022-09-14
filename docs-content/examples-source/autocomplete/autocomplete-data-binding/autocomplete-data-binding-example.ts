import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
 * @title Data binding examples
 */
@Component({
    selector: 'autocomplete-data-binding-example',
    templateUrl: './autocomplete-data-binding-example.html',
    styleUrls: ['./autocomplete-data-binding-example.css'],
    providers: [WikipediaService],
})
export class AutocompleteDataBindingExampleComponent {
    modelBoundData = 'asdf';

    testForm = new FormBuilder().group({
        autocomplete: [null, Validators.required],
    });

    dynamicBackendOptions: (term: string) => Observable<string[]>;

    constructor(readonly wikipediaService: WikipediaService) {
        this.dynamicBackendOptions = (term: string) =>
            wikipediaService
                .search(term)
                .pipe(
                    map((items: any) => items.map((item: any) => item.value)),
                );
    }

    simpleFilteredOptions(value: string): string[] {
        if (!value) {
            return [];
        }
        const data = (
            'Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,' +
            'Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,' +
            'Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow'
        ).split(',');
        return data.filter(d => d.toLowerCase().includes(value.toLowerCase()));
    }
}

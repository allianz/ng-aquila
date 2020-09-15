import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WikipediaService } from '../../common/wikipedia.service';

/**
* @title Autocomplete Example
*/
@Component({
  templateUrl: './page-search-autocomplete-example.html',
  providers: [ WikipediaService ]
})
export class PageSearchAutocompleteExampleComponent {

  searchFunction: (term: string) => Observable<string[]>;
  searchTerm1: string;
  searchTerm2: string;

  constructor(public wikipediaService: WikipediaService) {
    this.searchFunction = (term: string) => wikipediaService
      .search(term)
      .pipe(map((items: any) => items.map((item) => item.value)));
  }

}

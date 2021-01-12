import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WikipediaService } from '../../../common/wikipedia.service';

/**
* @title Default item rendering example
*/
@Component({
  selector: 'autocomplete-default-rendering-example',
  templateUrl: './autocomplete-default-rendering-example.html',
  styleUrls: ['./autocomplete-default-rendering-example.css'],
  providers: [ WikipediaService ]
})

export class AutocompleteDefaultRenderingExampleComponent {

  dynamicBackendOptions: (term: string) => Observable<string[]>;

  constructor(public wikipediaService: WikipediaService) {
    this.dynamicBackendOptions = (term: string) => wikipediaService
      .search(term)
      .pipe(map((items: any) => items.map((item) => item.value)));
  }
}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WikipediaService } from '../../../common/wikipedia.service';

/**
* @title Data binding examples
*/
@Component({
  templateUrl: './autocomplete-data-binding-example.html',
  providers: [ WikipediaService ]
})

export class AutocompleteDataBindingExampleComponent {

  modelBoundData: string = 'asdf';

  testForm = new FormBuilder().group({
    autocomplete: [null, Validators.required]
  });

  dynamicBackendOptions: (term: string) => Observable<string[]>;

  constructor(public wikipediaService: WikipediaService) {
    this.dynamicBackendOptions = (term: string) => wikipediaService
      .search(term)
      .pipe(map((items: any) => items.map((item) => item.value)));
  }

  simpleFilteredOptions(value: string): string[] {
    if (!value) {return []; }
    const data = ('Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,' +
      'Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,' +
      'Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow')
      .split(',');
    return data.filter(item => {
      return item.toLowerCase().indexOf(value.toLowerCase()) >= 0;
    });
  }
}

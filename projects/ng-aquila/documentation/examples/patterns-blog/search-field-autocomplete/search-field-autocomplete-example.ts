import {
  NxAutocompleteComponent,
  NxAutocompleteTriggerDirective,
} from '@allianz/ng-aquila/autocomplete';
import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxFormfieldAppendixDirective,
  NxFormfieldComponent,
  NxFormfieldPrefixDirective,
} from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';

/**
 * @title Search Field with Autocomplete Example
 */
@Component({
  selector: 'search-field-autocomplete-example',
  templateUrl: './search-field-autocomplete-example.html',
  imports: [
    FormsModule,
    NxFormfieldComponent,
    NxFormfieldPrefixDirective,
    NxFormfieldAppendixDirective,
    NxInputDirective,
    NxAutocompleteTriggerDirective,
    NxAutocompleteComponent,
    NxButtonComponent,
    NxIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldAutocompleteExampleComponent {
  private readonly options = [
    'Chimpanzee',
    'Chinchilla',
    'Chipmunk',
    'Coati',
    'Cobra',
    'Condor',
    'Cougar',
    'Coyote',
    'Crab',
    'Crane',
    'Crocodile',
    'Crow',
  ];

  searchTerm = '';
  readonly submittedTerm = signal('');

  readonly searchFunction = (term: string): Observable<string[]> =>
    of(
      this.options.filter((option) =>
        option.toLowerCase().includes(term.toLowerCase()),
      ),
    );

  search() {
    this.submittedTerm.set(this.searchTerm);
  }
}

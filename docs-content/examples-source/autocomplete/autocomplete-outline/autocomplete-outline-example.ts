import {
  NxAutocompleteComponent,
  NxAutocompleteOptionComponent,
  NxAutocompleteTriggerDirective,
} from '@allianz/ng-aquila/autocomplete';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import {
  NxColComponent,
  NxLayoutComponent,
  NxRowComponent,
} from '@allianz/ng-aquila/grid';
import { NxHeadlineComponent } from '@allianz/ng-aquila/headline';
import { NxInputDirective } from '@allianz/ng-aquila/input';
import { Component } from '@angular/core';

/**
 * @title Autocomplete with formfield example
 */
@Component({
  selector: 'autocomplete-outline-example',
  templateUrl: './autocomplete-outline-example.html',
  styleUrls: ['./autocomplete-outline-example.css'],
  imports: [
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxHeadlineComponent,
    NxFormfieldComponent,
    NxInputDirective,
    NxAutocompleteTriggerDirective,
    NxAutocompleteComponent,
    NxAutocompleteOptionComponent,
  ],
})
export class AutocompleteOutlineExampleComponent {
  filteredOptions: string[];
  options = [
    'Chimpanzee',
    'Chinchilla',
    'Chipmunk',
    'Coati',
    'Cicada',
    'Clam',
    'Clownfish',
    'Cobra',
    'Cockroach',
    'Cod',
    'Condor',
    'Constrictor',
    'Coral',
    'Cougar',
    'Cow',
    'Coyote',
    'Coypu',
    'Crab',
    'Crane',
    'Crane fly',
    'Crawdad',
    'Crayfish',
    'Cricket',
    'Crocodile',
    'Crow',
  ];

  constructor() {
    this.filteredOptions = this.options.slice();
  }

  filter(value: any) {
    this.filteredOptions = this.options.filter((s) =>
      new RegExp(value, 'gi').test(s),
    );
  }
}

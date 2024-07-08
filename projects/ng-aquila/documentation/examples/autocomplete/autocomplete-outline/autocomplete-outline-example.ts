import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import {
    NxAutocompleteComponent,
    NxAutocompleteOptionComponent,
    NxAutocompleteTriggerDirective,
} from '@aposin/ng-aquila/autocomplete';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Autocomplete with formfield example
 */
@Component({
    selector: 'autocomplete-outline-example',
    templateUrl: './autocomplete-outline-example.html',
    styleUrls: ['./autocomplete-outline-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxHeadlineComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxAutocompleteTriggerDirective,
        NxAutocompleteComponent,
        NgFor,
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
        this.filteredOptions = this.options.filter(s =>
            new RegExp(value, 'gi').test(s),
        );
    }
}

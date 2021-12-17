import { Component } from '@angular/core';

/**
 * @title Autocomplete filtering example
 */
@Component({
    selector: 'autocomplete-filtering-example',
    templateUrl: './autocomplete-filtering-example.html',
    styleUrls: ['./autocomplete-filtering-example.css'],
})
export class AutocompleteFilteringExampleComponent {
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

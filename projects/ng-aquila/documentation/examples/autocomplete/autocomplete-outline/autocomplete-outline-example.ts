import { Component } from '@angular/core';

/**
 * @title Autocomplete with formfield example
 */
@Component({
    selector: 'autocomplete-outline-example',
    templateUrl: './autocomplete-outline-example.html',
    styleUrls: ['./autocomplete-outline-example.css'],
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

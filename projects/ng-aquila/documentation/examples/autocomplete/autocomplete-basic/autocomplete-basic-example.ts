import { Component } from '@angular/core';

/**
 * @title Autocomplete example
 */
@Component({
    selector: 'autocomplete-basic-example',
    templateUrl: './autocomplete-basic-example.html',
    styleUrls: ['./autocomplete-basic-example.css'],
})
export class AutocompleteBasicExampleComponent {
    options = `Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,
    Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,
    Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`.split(
        ',',
    );
}

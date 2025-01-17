import { Component } from '@angular/core';
import {
    NxAutocompleteComponent,
    NxAutocompleteOptionComponent,
    NxAutocompleteTriggerDirective,
} from '@aposin/ng-aquila/autocomplete';

/**
 * @title Autocomplete example
 */
@Component({
    selector: 'autocomplete-basic-example',
    templateUrl: './autocomplete-basic-example.html',
    styleUrls: ['./autocomplete-basic-example.css'],
    imports: [
        NxAutocompleteTriggerDirective,
        NxAutocompleteComponent,
        NxAutocompleteOptionComponent,
    ],
})
export class AutocompleteBasicExampleComponent {
    options = `Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,
    Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,
    Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`.split(
        ',',
    );
}

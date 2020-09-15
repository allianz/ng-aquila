import { Component } from '@angular/core';

/**
* @title Autocomplete example
*/
@Component({
  templateUrl: './autocomplete-basic-example.html'
})

export class AutocompleteBasicExampleComponent {
  options = (`Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,
    Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,
    Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`)
  .split(',');
}

import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import {
    NX_AUTOCOMPLETE_SCROLL_STRATEGY,
    NxAutocompleteComponent,
    NxAutocompleteOptionComponent,
    NxAutocompleteTriggerDirective,
} from '@aposin/ng-aquila/autocomplete';

const words = `Chimpanzee,Chinchilla,Chipmunk,Coati,Cicada,Clam,Clownfish,Cobra,Cockroach,Cod,Condor,Constrictor,Coral,Cougar,Cow,Coyote,Coypu,Crab,Crane,Crane fly,Crawdad,Crayfish,Cricket,Crocodile,Crow`;

function scrollStrategyFactory(overlay: Overlay): () => ScrollStrategy {
    return () => overlay.scrollStrategies.close();
}

/**
 * @title Scroll Strategy Provider Example
 */
@Component({
    selector: 'autocomplete-scroll-strategy-provider-example',
    templateUrl: './autocomplete-scroll-strategy-provider-example.html',
    styleUrls: ['./autocomplete-scroll-strategy-provider-example.css'],
    providers: [
        {
            provide: NX_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: scrollStrategyFactory,
            deps: [Overlay],
        },
    ],
    imports: [
        NxAutocompleteTriggerDirective,
        NxAutocompleteComponent,
        NxAutocompleteOptionComponent,
    ],
})
export class AutocompleteScrollStrategyProviderExampleComponent {
    options = words.split(',');
}

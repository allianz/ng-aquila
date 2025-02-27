import { LowerCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormBuilder,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    NxAutocompleteComponent,
    NxAutocompleteOptionComponent,
    NxAutocompleteTriggerDirective,
} from '@aposin/ng-aquila/autocomplete';
import {
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxInputDirective } from '@aposin/ng-aquila/input';
import {
    NxNaturalLanguageFormComponent,
    NxWordComponent,
} from '@aposin/ng-aquila/natural-language-form';

/**
 * @title Panel grow and Panel max width examples
 */
@Component({
    selector: 'autocomplete-panel-grow-example',
    templateUrl: './autocomplete-panel-grow-example.html',
    styleUrls: ['./autocomplete-panel-grow-example.css'],
    standalone: true,
    imports: [
        NxFormfieldComponent,
        NxInputDirective,
        NxAutocompleteTriggerDirective,
        FormsModule,
        NxAutocompleteComponent,
        NxAutocompleteOptionComponent,
        ReactiveFormsModule,
        NxNaturalLanguageFormComponent,
        NxWordComponent,
        NxFormfieldErrorDirective,
        LowerCasePipe,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
    ],
})
export class AutocompletePanelGrowExampleComponent {
    modelBoundData = 'a';
    modelBoundData2 = 'c';
    modelPanelGrow = true;
    modelPanelMaxWidth = 400;

    testForm = new FormBuilder().group({
        autocomplete: [null, Validators.required],
    });

    constructor() {}

    simpleFilteredOptions(value: string): string[] {
        if (!value) {
            return [];
        }
        const data = [
            'apple banana cherry grape strawberry watermelon pineapple mango',
            'audi bmw mercedes chevrolet ford toyota honda nissan volkswagen',
            'cat dog bear elephant fish bee hippo kangaroo lion tiger',
        ];

        return data.filter(d => d.toLowerCase().includes(value.toLowerCase()));
    }
}

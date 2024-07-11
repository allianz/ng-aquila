import { Component } from '@angular/core';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { NxGridModule } from '@aposin/ng-aquila/grid';

/**
 * @title PanelGrow and panelMaxWidth dropdown example
 */
@Component({
    selector: 'dropdown-panelgrow-example',
    templateUrl: './dropdown-panelgrow-example.html',
    styleUrls: ['./dropdown-panelgrow-example.css'],
    standalone: true,
    imports: [NxGridModule, NxFormfieldModule, NxDropdownModule],
})
export class DropdownPanelgrowExampleComponent {
    options = [
        'BMW',
        'Lorem ipsum dolor sit amet, consectetur adipisici elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua, sed eiusmod tempor incidunt ut.',
        'Audi',
        'VW',
        'Mercedes',
        'Porsche',
        'Tesla',
        'Lada',
        'Opel',
        'Fiat',
        'Ford',
        'Kia',
        'Toyota',
        'Ferrari',
    ];
}

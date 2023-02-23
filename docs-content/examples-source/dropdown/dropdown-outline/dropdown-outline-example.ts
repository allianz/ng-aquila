import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { NxDropdownComponent } from '@aposin/ng-aquila/dropdown';
import { FORMFIELD_DEFAULT_OPTIONS } from '@aposin/ng-aquila/formfield';

/**
 * @title Outline formfield example
 */
@Component({
    selector: 'dropdown-outline-example',
    templateUrl: './dropdown-outline-example.html',
    styleUrls: ['./dropdown-outline-example.css'],
    providers: [
        {
            provide: FORMFIELD_DEFAULT_OPTIONS,
            useValue: { appearance: 'outline', nxFloatLabel: 'always' },
        },
    ],
})
export class DropdownOutlineExampleComponent implements AfterContentInit {
    options: string[] = [
        'BMW',
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

    groups = [
        {
            label: 'Birds',
            items: ['Parrot', 'Pidgin', 'Swallow'],
        },
        {
            label: 'Fish',
            items: ['Salmon', 'Mackerel', 'Catfish'],
        },
    ];

    model = 'Catfish';
    modelBlank!: '';

    brands: string[] = [];

    @ViewChild('exampleErrorNgModel', { static: true })
    exampleErrorNgModel!: NxDropdownComponent;

    ngAfterContentInit(): void {
        this.exampleErrorNgModel.ngControl?.control?.markAsTouched();
    }
}

import { NgFor } from '@angular/common';
import { AfterContentInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDropdownComponent,
    NxDropdownComponent as NxDropdownComponent_1,
    NxDropdownGroupComponent,
    NxDropdownItemComponent,
    NxMultiSelectComponent,
} from '@aposin/ng-aquila/dropdown';
import {
    FORMFIELD_DEFAULT_OPTIONS,
    NxFormfieldAppendixDirective,
    NxFormfieldComponent,
    NxFormfieldErrorDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxHeadlineComponent } from '@aposin/ng-aquila/headline';
import { NxIconComponent } from '@aposin/ng-aquila/icon';

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
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxHeadlineComponent,
        NxFormfieldComponent,
        NxDropdownComponent_1,
        NgFor,
        NxDropdownItemComponent,
        FormsModule,
        NxErrorComponent,
        NxFormfieldErrorDirective,
        NxIconComponent,
        NxFormfieldAppendixDirective,
        NxDropdownGroupComponent,
        NxMultiSelectComponent,
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

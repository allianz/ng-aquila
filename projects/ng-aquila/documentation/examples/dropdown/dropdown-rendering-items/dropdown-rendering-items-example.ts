import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxAvatarModule } from '@aposin/ng-aquila/avatar';
import {
    NxDropdownClosedLabelDirective,
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Examples for rendering items
 */
@Component({
    selector: 'dropdown-rendering-items-example',
    templateUrl: './dropdown-rendering-items-example.html',
    styleUrls: ['./dropdown-rendering-items-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxAvatarModule,
        FormsModule,
        NxDropdownClosedLabelDirective,
    ],
})
export class DropdownRenderingItemsExampleComponent {
    value: any;

    demoData = [
        { id: '1', avatar: 'B', brand: 'BMW', year: '1983' },
        { id: '2', avatar: 'A', brand: 'Audi', year: '2009' },
        { id: '3', avatar: 'V', brand: 'VW', year: '2024' },
        { id: '4', avatar: 'T', brand: 'Tesla', year: '2004' },
        { id: '5', avatar: 'L', brand: 'Lada', year: '2005' },
        { id: '6', avatar: 'O', brand: 'Opel', year: '2013' },
        { id: '7', avatar: 'F', brand: 'Fiat', year: '2017' },
        { id: '8', avatar: 'F', brand: 'Ford', year: '1979' },
        { id: '9', avatar: 'K', brand: 'Kia', year: '2000' },
        { id: '10', avatar: 'T', brand: 'Toyota', year: '2021' },
        { id: '11', avatar: 'F', brand: 'Ferrari', year: '2023' },
    ];

    toText(value: string): string | null {
        return value ? value.toUpperCase() : null;
    }
}

import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import {
    NxFormfieldComponent,
    NxFormfieldNoteDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';

/**
 * @title Focus out example
 */
@Component({
    selector: 'dropdown-focus-out-example',
    templateUrl: './dropdown-focus-out-example.html',
    styleUrls: ['./dropdown-focus-out-example.css'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxFormfieldNoteDirective,
    ],
})
export class DropdownFocusOutExampleComponent {
    form = new FormBuilder().group({
        dropdown: ['BMW'],
    });

    focusing = false;

    onFocusOut() {
        this.focusing = false;
    }

    onFocus() {
        this.focusing = true;
    }
}

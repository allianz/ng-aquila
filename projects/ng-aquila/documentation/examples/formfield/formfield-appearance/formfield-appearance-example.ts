import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import {
    NxDatefieldDirective,
    NxDatepickerComponent,
    NxDatepickerToggleComponent,
} from '@aposin/ng-aquila/datefield';
import {
    NxDropdownComponent,
    NxDropdownItemComponent,
} from '@aposin/ng-aquila/dropdown';
import {
    NxFormfieldAppendixDirective,
    NxFormfieldComponent,
    NxFormfieldHintDirective,
    NxFormfieldPrefixDirective,
    NxFormfieldSuffixDirective,
} from '@aposin/ng-aquila/formfield';
import {
    NxColComponent,
    NxLayoutComponent,
    NxRowComponent,
} from '@aposin/ng-aquila/grid';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Appearance example
 */
@Component({
    selector: 'formfield-appearance-example',
    templateUrl: './formfield-appearance-example.html',
    styleUrls: ['./formfield-appearance-example.css'],
    standalone: true,
    imports: [
        NxLayoutComponent,
        NxRowComponent,
        NxColComponent,
        NxFormfieldComponent,
        NxInputDirective,
        NxFormfieldPrefixDirective,
        NxIconComponent,
        NxFormfieldAppendixDirective,
        NxDropdownComponent,
        NxDropdownItemComponent,
        NxDatefieldDirective,
        FormsModule,
        NxDatepickerToggleComponent,
        NxFormfieldSuffixDirective,
        NxDatepickerComponent,
        NxFormfieldHintDirective,
        NgIf,
        NxErrorComponent,
    ],
})
export class FormfieldAppearanceExampleComponent {
    currentDate: Date | null = null;

    @ViewChild('inputToCount', { read: NxInputDirective, static: true })
    input!: NxInputDirective;

    count = 0;

    onInput() {
        this.count = this.input.value.length;
    }
}

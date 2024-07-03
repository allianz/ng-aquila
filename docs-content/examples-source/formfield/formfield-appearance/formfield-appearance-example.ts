import { Component, ViewChild } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Appearance example
 */
@Component({
    selector: 'formfield-appearance-example',
    templateUrl: './formfield-appearance-example.html',
    styleUrls: ['./formfield-appearance-example.css'],
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

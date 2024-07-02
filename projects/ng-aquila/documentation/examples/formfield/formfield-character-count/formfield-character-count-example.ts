import { Component, ViewChild } from '@angular/core';
import { NxInputDirective } from '@aposin/ng-aquila/input';

/**
 * @title Character count example
 */
@Component({
    selector: 'formfield-character-count-example',
    templateUrl: './formfield-character-count-example.html',
    styleUrls: ['./formfield-character-count-example.css'],
})
export class FormfieldCharacterCountExampleComponent {
    @ViewChild('inputToCount', { read: NxInputDirective, static: true })
    input!: NxInputDirective;

    count = 0;

    onInput() {
        this.count = this.input.value.length;
    }
}

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxTimefieldComponent } from '@aposin/ng-aquila/timefield';
/**
 * @title Timefield inputmode example
 */
@Component({
    selector: 'timefield-with-inputmode',
    imports: [FormsModule, NxTimefieldComponent],
    templateUrl: './timefield-with-inputmode-example.html',
    styleUrl: './timefield-with-inputmode-example.scss',
})
export class TimefieldWithInputmode {}

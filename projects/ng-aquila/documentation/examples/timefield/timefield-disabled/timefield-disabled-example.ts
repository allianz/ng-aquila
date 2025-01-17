import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxTimefieldComponent } from '@aposin/ng-aquila/timefield';
/**
 * @title Timefield disabled example
 */
@Component({
    selector: 'timefield-disabled-example',
    templateUrl: './timefield-disabled-example.html',
    styleUrls: ['./timefield-disabled-example.css'],
    imports: [FormsModule, NxTimefieldComponent],
})
export class TimefieldDisabledExampleComponent {
    templateModel = '12:54';
}

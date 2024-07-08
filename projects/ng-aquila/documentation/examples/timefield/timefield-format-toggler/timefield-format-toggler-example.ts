import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NxErrorComponent } from '@aposin/ng-aquila/base';
import { NxTimefieldComponent } from '@aposin/ng-aquila/timefield';
/**
 * @title Timefield format toggler example
 */
@Component({
    selector: 'timefield-format-toggler-example',
    templateUrl: './timefield-format-toggler-example.html',
    styleUrls: ['./timefield-format-toggler-example.css'],
    standalone: true,
    imports: [FormsModule, NxTimefieldComponent, NgIf, NxErrorComponent],
})
export class TimefieldFormatTogglerExampleComponent {
    templateModel = '12:01';
}

import { Component } from '@angular/core';
import { NxCopytextModule } from '@aposin/ng-aquila/copytext';
import { NxTimefieldModule } from '@aposin/ng-aquila/timefield';

/**
 * @title Timefield different options
 */
@Component({
    selector: 'timefield-options-interval-example',
    templateUrl: './timefield-options-interval-example.html',
    styleUrls: ['./timefield-options-interval-example.css'],
    imports: [NxTimefieldModule, NxCopytextModule],
})
export class TimefieldOptionsIntervalExampleComponent {}

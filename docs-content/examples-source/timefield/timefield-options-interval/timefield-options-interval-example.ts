import { NxCopytextModule } from '@allianz/ng-aquila/copytext';
import { NxTimefieldModule } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';

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

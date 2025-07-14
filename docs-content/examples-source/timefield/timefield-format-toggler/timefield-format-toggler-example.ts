import { NxErrorComponent } from '@allianz/ng-aquila/base';
import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 * @title Timefield format toggler example
 */
@Component({
  selector: 'timefield-format-toggler-example',
  templateUrl: './timefield-format-toggler-example.html',
  styleUrls: ['./timefield-format-toggler-example.css'],
  imports: [FormsModule, NxTimefieldComponent, NxErrorComponent],
})
export class TimefieldFormatTogglerExampleComponent {
  templateModel = '12:01';
}

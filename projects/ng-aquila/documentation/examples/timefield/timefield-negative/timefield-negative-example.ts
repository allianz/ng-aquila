import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 * @title Timefield negative example
 */
@Component({
  selector: 'timefield-negative-example',
  templateUrl: './timefield-negative-example.html',
  styleUrls: ['./timefield-negative-example.css'],
  imports: [FormsModule, NxTimefieldComponent],
})
export class TimefieldNegativeExampleComponent {
  templateModel = '00:54';
  templateModel2 = '12:54';
}

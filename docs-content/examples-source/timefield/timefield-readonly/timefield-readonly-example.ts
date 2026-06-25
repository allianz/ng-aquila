import { NxTimefieldComponent } from '@allianz/ng-aquila/timefield';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
/**
 * @title Timefield readonly example
 */
@Component({
  selector: 'timefield-readonly-example',
  templateUrl: './timefield-readonly-example.html',
  styleUrls: ['./timefield-readonly-example.css'],
  imports: [FormsModule, NxTimefieldComponent],
})
export class TimefieldReadonlyExampleComponent {
  templateModel = '12:54';
}

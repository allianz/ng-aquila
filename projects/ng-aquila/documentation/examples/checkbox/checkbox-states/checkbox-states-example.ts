import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Checkbox States
 */
@Component({
  selector: 'checkbox-states-example',
  templateUrl: './checkbox-states-example.html',
  styleUrls: ['./checkbox-states-example.css'],
  imports: [NxCheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxStatesExampleComponent {}

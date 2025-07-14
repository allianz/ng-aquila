import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Readonly checkbox
 */
@Component({
  selector: 'checkbox-readonly-example',
  templateUrl: './checkbox-readonly-example.html',
  styleUrls: ['./checkbox-readonly-example.css'],
  imports: [NxCheckboxComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxReadonlyExampleComponent {
  readonly = true;
}

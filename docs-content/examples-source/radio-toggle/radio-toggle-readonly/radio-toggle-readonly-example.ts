import {
  NxRadioToggleButtonComponent,
  NxRadioToggleComponent,
} from '@allianz/ng-aquila/radio-toggle';
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * @title Readonly Toggle Button Example
 */
@Component({
  selector: 'radio-toggle-readonly-example',
  imports: [NxRadioToggleButtonComponent, NxRadioToggleComponent],
  templateUrl: './radio-toggle-readonly-example.html',
  styleUrl: './radio-toggle-readonly-example.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioToggleReadonlyExampleComponent {}

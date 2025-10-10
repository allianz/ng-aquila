import {
  NxButtonComponent,
  NxButtonSize,
  NxIconButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxDropdownComponent } from '@allianz/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@allianz/ng-aquila/formfield';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { NxSwitcherComponent } from '@allianz/ng-aquila/switcher';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Loading Example
 */
@Component({
  selector: 'button-loading-example',
  templateUrl: './button-loading-example.html',
  styleUrls: ['./button-loading-example.css'],
  imports: [
    NxButtonComponent,
    NxIconButtonComponent,
    NxIconComponent,
    NxPlainButtonComponent,
    NxSwitcherComponent,
    FormsModule,
    NxDropdownComponent,
    NxFormfieldComponent,
  ],
})
export class ButtonLoadingExampleComponent {
  loading = signal(true);
  readonly size = signal<NxButtonSize>('medium');
  readonly negative = signal(false);

  sizeOptions: { value: NxButtonSize; label: string }[] = [
    {
      label: 'Small',
      value: 'small',
    },
    {
      label: 'Small Medium',
      value: 'small-medium',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Large',
      value: 'large',
    },
  ];
}

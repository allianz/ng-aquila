import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxCheckboxComponent,
  NxCheckboxGroupComponent,
} from '@allianz/ng-aquila/checkbox';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * @title Context Menu Selection Multiple example
 */
@Component({
  selector: 'context-menu-selecti-multiple-example',
  templateUrl: './context-menu-select-multiple-example.html',
  styleUrls: ['./context-menu-select-multiple-example.css'],
  imports: [
    NxCheckboxGroupComponent,
    FormsModule,
    NxCheckboxComponent,
    NxButtonComponent,
    NxIconComponent,
    NxContextMenuModule,
  ],
})
export class ContextMenuSelectMultipleExampleComponent {
  options = [
    { label: 'Front window', value: 'front' },
    { label: 'Driver Window', value: 'driver' },
    { label: 'Rear Window', value: 'rear' },
  ];

  selected = ['driver'];
}

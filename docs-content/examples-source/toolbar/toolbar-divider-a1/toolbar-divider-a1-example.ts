import {
  NxButtonComponent,
  NxPlainButtonComponent,
} from '@allianz/ng-aquila/button';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  NxToolbarComponent,
  NxToolbarDividerComponent,
} from '@allianz/ng-aquila/toolbar';
import { Component } from '@angular/core';

/**
 * @title Toolbar divider example
 */
@Component({
  selector: 'toolbar-divider-a1-example',
  templateUrl: './toolbar-divider-a1-example.html',
  styleUrls: ['./toolbar-divider-a1-example.css'],
  imports: [
    NxToolbarComponent,
    NxPlainButtonComponent,
    NxIconComponent,
    NxToolbarDividerComponent,
    NxButtonComponent,
  ],
})
export class ToolbarDividerA1ExampleComponent {}

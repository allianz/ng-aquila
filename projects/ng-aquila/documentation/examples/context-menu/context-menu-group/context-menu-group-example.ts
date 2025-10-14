import { NxIconButtonComponent } from '@allianz/ng-aquila/button';
import { NxContextMenuModule } from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Grouped Context Menu Example
 */
@Component({
  selector: 'context-menu-group-example',
  templateUrl: './context-menu-group-example.html',
  styleUrls: ['./context-menu-group-example.css'],
  imports: [NxContextMenuModule, NxIconButtonComponent, NxIconComponent],
})
export class ContextMenuGroupExampleComponent {}

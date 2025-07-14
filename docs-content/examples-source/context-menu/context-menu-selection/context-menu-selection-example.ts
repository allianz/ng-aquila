import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuHeaderComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { Component } from '@angular/core';

/**
 * @title Context Menu Single Selection Example
 */
@Component({
  selector: 'context-menu-selection-example',
  templateUrl: './context-menu-selection-example.html',
  styleUrls: ['./context-menu-selection-example.css'],
  imports: [
    NxContextMenuComponent,
    NxContextMenuHeaderComponent,
    NxContextMenuItemComponent,
    NxIconComponent,
    NxButtonComponent,
    NxContextMenuTriggerDirective,
  ],
})
export class ContextMenuSelectionExampleComponent {
  selectedLanguage = 'de';

  options = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Chinese', value: 'cn' },
  ];
}

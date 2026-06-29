import { NxButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuModule,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * @title Context Menu Single Selectable Example
 */
@Component({
  selector: 'context-menu-single-selectable-example',
  templateUrl: './context-menu-single-selectable-example.html',
  styleUrls: ['./context-menu-single-selectable-example.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NxContextMenuModule,
    NxIconComponent,
    NxButtonComponent,
    NxContextMenuTriggerDirective,
  ],
})
export class ContextMenuSingleSelectableExampleComponent {
  readonly selectedLanguage = signal('de');

  selectLanguage(value: string) {
    this.selectedLanguage.set(value);
  }

  options = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
    { label: 'Chinese', value: 'cn' },
  ];
}

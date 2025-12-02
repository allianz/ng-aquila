import { NxIconModule } from '@allianz/ng-aquila/icon';
import { Component, input, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'li[nxListIcon]',
  host: {
    '[class.nx-list__icon-wrapper]': 'true',
  },
  template: `<span class="nx-list__icon">
      <nx-icon [name]="name()" aria-hidden="true"></nx-icon>
    </span>
    <ng-content></ng-content>`,
  imports: [NxIconModule],
})
export class NxListIconComponent {
  /** @docs-private */
  @ViewChild('viewRefPrefix', { read: ViewContainerRef }) viewRefPrefix!: ViewContainerRef;

  /** Sets the name of the icon to be displayed. */
  readonly name = input.required<string>({ alias: 'nxListIcon' });
}

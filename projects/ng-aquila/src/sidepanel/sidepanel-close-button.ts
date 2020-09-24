import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NxSidepanelComponent } from './sidepanel';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[nxSidepanelCloseButton]',
  template: `<nx-icon name="close" size="s" aria-hidden="true"></nx-icon>`,
  styleUrls: ['./sidepanel-close-button.scss'],
  host: {
    '(click)': '_toggle()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSidepanelCloseButtonComponent {

  _toggle() {
    this._sidepanel.toggle();
  }

  constructor(private _sidepanel: NxSidepanelComponent) {}
}

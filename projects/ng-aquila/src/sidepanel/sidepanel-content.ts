import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NxSidepanelComponent } from './sidepanel';

@Component({
  selector: 'nx-sidepanel-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./sidepanel-content.scss'],
  host: {
    '[style.height.px]': '_sidepanel._getContentHeight()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NxSidepanelContentComponent {

  constructor(public _sidepanel: NxSidepanelComponent) {}

}

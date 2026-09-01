import {
  NxTabComponent,
  NxTabGroupComponent,
  NxTabsIntl,
} from '@allianz/ng-aquila/tabs';
import { Component, Injectable } from '@angular/core';

@Injectable()
export class MyIntl extends NxTabsIntl {
  closeAriaLabel = (label: string) => `${label} schließen`;
  closeAnnouncement = (label: string) => `${label} geschlossen`;
}

/**
 * @title Tabs localization example
 */
@Component({
  selector: 'tabs-localize-example',
  templateUrl: './tabs-localize-example.html',
  styleUrls: ['./tabs-localize-example.css'],
  providers: [{ provide: NxTabsIntl, useClass: MyIntl }],
  imports: [NxTabGroupComponent, NxTabComponent],
})
export class TabsLocalizeExampleComponent {
  tabs = [
    { label: 'Erster Tab' },
    { label: 'Zweiter Tab' },
    { label: 'Dritter Tab' },
  ];

  closeTab(index: number) {
    this.tabs = this.tabs.filter((_, i) => i !== index);
  }
}

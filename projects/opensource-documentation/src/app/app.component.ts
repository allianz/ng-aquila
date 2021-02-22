import { Component } from '@angular/core';
import { NxvNavigationService } from '@aposin/ngx-docs-ui';

@Component({
  selector: 'doc-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'documentation';

  constructor(
      private _navigationService: NxvNavigationService) {
    this._navigationService.resetScrollPositionWatcher();
  }
}

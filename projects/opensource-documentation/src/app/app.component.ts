import { NxvNavigationService } from '@allianz/ngx-docs-ui';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'doc-root',
  template: `<router-outlet></router-outlet>`,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private readonly _navigationService: NxvNavigationService) {}

  ngOnInit(): void {
    this._navigationService.resetScrollPositionWatcher();
  }
}

import { Component, OnInit } from '@angular/core';
import { NxvNavigationService } from '@aposin/ngx-docs-ui';

@Component({
    selector: 'doc-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    constructor(private _navigationService: NxvNavigationService) {}

    ngOnInit() {
        this._navigationService.resetScrollPositionWatcher();
    }
}

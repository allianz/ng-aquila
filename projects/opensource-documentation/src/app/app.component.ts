import { NxvNavigationService } from '@allianz/ngx-docs-ui';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'doc-root',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    constructor(private readonly _navigationService: NxvNavigationService) {}

    ngOnInit(): void {
        this._navigationService.resetScrollPositionWatcher();
    }
}

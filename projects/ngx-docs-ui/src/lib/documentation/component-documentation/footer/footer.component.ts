import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';

import { NXV_FOOTER } from './../../../core/tokens';

@Component({
    selector: 'nxv-footer',
    templateUrl: './footer.component.html',
    styles: [
        `
            :host {
                display: block;
                flex-shrink: 0;
            }
        `,
    ],
})
export class NxvFooterComponent implements OnInit {
    constructor(
        @Inject(NXV_FOOTER) private readonly _footerComponent: any,
        private readonly _viewContainerRef: ViewContainerRef,
    ) {}

    ngOnInit(): void {
        this._viewContainerRef.createComponent(this._footerComponent);
    }
}

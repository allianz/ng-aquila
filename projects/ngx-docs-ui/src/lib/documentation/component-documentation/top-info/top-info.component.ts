import { Component, Inject, OnInit, ViewContainerRef } from '@angular/core';

import { NXV_TOP_INFO } from './../../../core/tokens';

@Component({
    selector: 'nxv-top-info',
    template: '',
})
export class NxvTopInfoComponent implements OnInit {
    constructor(
        @Inject(NXV_TOP_INFO) private readonly _topInfoComponent: any,
        private readonly _viewContainerRef: ViewContainerRef,
    ) {}

    ngOnInit(): void {
        this._viewContainerRef.createComponent(this._topInfoComponent);
    }
}

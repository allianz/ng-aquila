import { Component, ComponentFactoryResolver, Inject, OnInit, ViewContainerRef } from '@angular/core';

import { NXV_TOP_INFO } from './../../../core/tokens';

@Component({
    selector: 'nxv-top-info',
    template: '',
})
export class NxvTopInfoComponent implements OnInit {
    constructor(
        @Inject(NXV_TOP_INFO) private _topInfoComponent: any,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerRef: ViewContainerRef,
    ) {}

    ngOnInit(): void {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._topInfoComponent);
        const componentRef = this._viewContainerRef.createComponent(componentFactory);
    }
}

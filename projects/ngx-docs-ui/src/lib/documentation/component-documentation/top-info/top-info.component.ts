import { Component, ComponentFactoryResolver, Inject, OnInit, ViewContainerRef } from '@angular/core';

import { NXV_TOP_INFO } from './../../../core/tokens';

@Component({
    selector: 'nxv-top-info',
    template: '',
})
export class NxvTopInfoComponent implements OnInit {
    constructor(
        @Inject(NXV_TOP_INFO) private readonly _topInfoComponent: any,
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _viewContainerRef: ViewContainerRef,
    ) {}

    ngOnInit(): void {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._topInfoComponent);
        this._viewContainerRef.createComponent(componentFactory);
    }
}

import { Component, ComponentFactoryResolver, Inject, OnInit, ViewContainerRef } from '@angular/core';

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
        @Inject(NXV_FOOTER) private _footerComponent: any,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerRef: ViewContainerRef,
    ) {}

    ngOnInit() {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._footerComponent);
        const componentRef = this._viewContainerRef.createComponent(componentFactory);
    }
}

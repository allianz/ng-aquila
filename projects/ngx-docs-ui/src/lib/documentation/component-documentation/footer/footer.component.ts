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
        @Inject(NXV_FOOTER) private readonly _footerComponent: any,
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _viewContainerRef: ViewContainerRef,
    ) {}

    ngOnInit(): void {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(this._footerComponent);
        this._viewContainerRef.createComponent(componentFactory);
    }
}

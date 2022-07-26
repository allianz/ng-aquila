import { ComponentPortal, DomPortalHost } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { ApplicationRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Input, Output, ViewContainerRef } from '@angular/core';

import { ExampleViewerComponent } from '../example-viewer/example-viewer.component';

const EXAMPLE_SELECTOR = 'nx-docs-example';

@Component({
    selector: 'nxv-example-loader',
    templateUrl: 'example-loader.component.html',
})
export class ExampleLoaderComponent {
    @Input() file!: string;
    @Input() examples: string[] = [];

    @Output() readonly contentLoaded = new EventEmitter<any>();

    constructor(
        private readonly _appRef: ApplicationRef,
        private readonly _http: HttpClient,
        private readonly _elementRef: ElementRef,
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _viewContainerRef: ViewContainerRef,
        private readonly _injector: Injector,
    ) {}

    onContentLoaded() {
        this.contentLoaded.emit();
        this.collectExamples();
    }

    private collectExamples() {
        const componentClass = ExampleViewerComponent;
        const exampleElements = this._elementRef.nativeElement.querySelectorAll(`[${EXAMPLE_SELECTOR}]`);

        Array.prototype.slice.call(exampleElements).forEach((exampleElement: Element) => {
            exampleElement.innerHTML = '';
            const example = exampleElement.getAttribute(EXAMPLE_SELECTOR);
            const portalHost = new DomPortalHost(exampleElement, this._componentFactoryResolver, this._appRef, this._injector);
            const examplePortal = new ComponentPortal(componentClass, this._viewContainerRef);
            const exampleViewer = portalHost.attach(examplePortal);
            exampleViewer.instance.example = example as string;

            const config = exampleElement.getAttribute('config')?.replace(/'/g, `"`);
            exampleViewer.instance.config = config ? JSON.parse(config) : {};
        });
    }
}

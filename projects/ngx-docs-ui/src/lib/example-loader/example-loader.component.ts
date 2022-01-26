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
    constructor(
        private _appRef: ApplicationRef,
        private _http: HttpClient,
        private _elementRef: ElementRef,
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _viewContainerRef: ViewContainerRef,
        private _injector: Injector,
    ) {}

    @Input()
    file!: string;
    @Input() examples: string[] = [];
    @Output() contentLoaded = new EventEmitter<any>();

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

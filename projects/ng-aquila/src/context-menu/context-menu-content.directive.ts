import { DomPortalOutlet, TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ApplicationRef, ComponentFactoryResolver, Directive, Inject, Injector, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Context menu content that will be rendered lazily once the menu is opened.
 */
@Directive({
    selector: 'ng-template[nxContextMenuContent]',
})
export class NxContextMenuContentDirective implements OnDestroy {
    private _portal!: TemplatePortal;
    private _outlet!: DomPortalOutlet;

    /** Emits when the menu content has been attached. */
    readonly _attached = new Subject<void>();

    constructor(
        private readonly _template: TemplateRef<any>,
        private readonly _componentFactoryResolver: ComponentFactoryResolver,
        private readonly _appRef: ApplicationRef,
        private readonly _injector: Injector,
        private readonly _viewContainerRef: ViewContainerRef,
        @Inject(DOCUMENT) private readonly _document: Document,
    ) {}

    /**
     * Attaches the content with a particular context.
     * @docs-private
     */
    attach(context: any = {}) {
        if (!this._portal) {
            this._portal = new TemplatePortal(this._template, this._viewContainerRef);
        }

        this.detach();

        if (!this._outlet) {
            this._outlet = new DomPortalOutlet(this._document.createElement('div'), this._componentFactoryResolver, this._appRef, this._injector);
        }

        const element: HTMLElement = this._template.elementRef.nativeElement;

        // Because we support opening the same menu from different triggers (which in turn have their
        // own `OverlayRef` panel), we have to re-insert the host element every time, otherwise we
        // risk it staying attached to a pane that's no longer in the DOM.
        if (element.parentNode) {
            element.parentNode.insertBefore(this._outlet.outletElement, element);
        }
        this._portal.attach(this._outlet, context);
        this._attached.next();
    }

    /**
     * Detaches the content.
     * @docs-private
     */
    detach() {
        if (this._portal.isAttached) {
            this._portal.detach();
        }
    }

    ngOnDestroy(): void {
        if (this._outlet) {
            this._outlet.dispose();
        }
    }
}

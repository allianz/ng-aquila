import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NxButtonBase } from '@aposin/ng-aquila/button';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxModalService } from './modal.service';

@Directive({ selector: '[nxOpenModalOnClick]' })
export class NxOpenModalOnClickDirective implements OnInit, OnDestroy {
    /**
     * One or multiple template reference variables pointing to elements
     * which should trigger opening the modal on click.
     *
     * Value: A single template reference variable or an array of template reference variables.
     */
    @Input() set nxOpenModalOnClick(elements: NxButtonBase | NxButtonBase[]) {
        // also support the case where only one element is passed, check for the length property to be sure elements is an array
        if (Array.isArray(elements)) {
            this.elements = elements;
        } else {
            this.elements = [elements];
        }
        // add a click event listener to any element passed as property to this directive
        this.elements.forEach(el => {
            if (el.addEventListener) {
                el.addEventListener('click', this.clickHandler);
                // workaround until refactoring: if the reference is a component
                // reference the component has to implement a getter to its own elementRef
            } else if (el.elementRef) {
                el.elementRef.nativeElement.addEventListener('click', this.clickHandler);
            } else {
                console.warn(`nxOpenModalOnClick: Given Element doesn't appear to be an ElementRef.`, el);
            }
        });
    }

    /** @docs-private */
    elements!: any[];

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly templateRef: TemplateRef<any>,
        private readonly viewContainer: ViewContainerRef,
        private readonly modalService: NxModalService,
    ) {}

    ngOnInit(): void {
        this.modalService.close$.pipe(takeUntil(this._destroyed)).subscribe(() => this.viewContainer.clear());
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();

        this.elements.forEach(el => {
            if (el.removeEventListener) {
                el.removeEventListener('click', this.clickHandler);
            }
        });
    }

    /** @docs-private */
    clickHandler = (event: Event) => {
        this.viewContainer.clear();
        // instantiate the template onto which this directive is applied
        const viewRef = this.viewContainer.createEmbeddedView(this.templateRef);
        // we need to mark the viewRef explicitly if the modal is used inside another
        // component that is using onPush change detection
        viewRef.markForCheck();
        event.preventDefault();
        event.stopPropagation();
    };
}

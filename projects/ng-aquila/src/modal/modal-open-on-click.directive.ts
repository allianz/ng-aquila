import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NxButtonBase } from '@aposin/ng-aquila/button';
import { SubscriptionLike as ISubscription } from 'rxjs';

import { NxModalService } from './modal.service';

@Directive({ selector: '[nxOpenModalOnClick]' })
export class NxOpenModalOnClickDirective implements OnInit, OnDestroy {
    /** @docs-private */
    elements!: any[];

    private subscription!: ISubscription;

    constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private modalService: NxModalService) {}

    ngOnInit() {
        this.subscription = this.modalService.close$.subscribe(() => this.viewContainer.clear());
    }

    ngOnDestroy() {
        this.elements.forEach(el => {
            if (el.removeEventListener) {
                el.removeEventListener('click', this.clickHandler);
            }
        });

        this.subscription.unsubscribe();
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

    /**
     * One or multiple template reference variables pointing to elements
     * which should trigger opening the modal on click.
     *
     * Value: A single template reference variable or an array of template reference variables.
     */
    @Input()
    set nxOpenModalOnClick(elements: NxButtonBase | NxButtonBase[]) {
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
}

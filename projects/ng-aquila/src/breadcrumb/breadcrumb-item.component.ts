import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { NxIconModule } from '@aposin/ng-aquila/icon';

@Component({
    selector: '[nxBreadcrumbItem]',
    templateUrl: 'breadcrumb-item.component.html',
    styleUrls: ['breadcrumb-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'nx-breadcrumb-item',
    },
    standalone: true,
    imports: [NxIconModule],
})
export class NxBreadcrumbItemComponent implements OnDestroy, AfterViewInit {
    constructor(
        private readonly _renderer: Renderer2,
        private readonly _elemRef: ElementRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elemRef);
    }

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._elemRef);
    }

    ngOnDestroy(): void {
        this._focusMonitor.stopMonitoring(this._elemRef);
    }

    /** @docs-private */
    setAsLast() {
        this._renderer.setAttribute(this._elemRef.nativeElement, 'aria-current', 'page');
    }

    /** @docs-private */
    resetAriaLabel() {
        this._renderer.removeAttribute(this._elemRef.nativeElement, 'aria-current');
    }

    // prevent location change when the user clicks on the chevron arrow
    _onIconClick(event: Event) {
        event.stopPropagation();
        event.preventDefault();
    }
}

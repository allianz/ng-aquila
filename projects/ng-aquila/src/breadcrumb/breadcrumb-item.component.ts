import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, Renderer2, ElementRef, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a[nxBreadcrumbItem]',
  templateUrl: 'breadcrumb-item.component.html',
  styleUrls: ['breadcrumb-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nx-breadcrumb-item'
  }
})
export class NxBreadcrumbItemComponent implements OnDestroy {

  constructor(
    private _renderer: Renderer2,
    private _elemRef: ElementRef,
    private _focusMonitor: FocusMonitor
  ) {
    this._focusMonitor.monitor(this._elemRef);
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._elemRef);
  }

  /**@docs-private */
  setAsLast() {
    this._renderer.setAttribute(this._elemRef.nativeElement, 'aria-current', 'page');
  }

  /**@docs-private */
  resetAriaLabel() {
    this._renderer.removeAttribute(this._elemRef.nativeElement, 'aria-current');
  }

  // prevent location change when the user clicks on the chevron arrow
  _onIconClick(event) {
    event.stopPropagation();
    event.preventDefault();
  }
}

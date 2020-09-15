import { Component, Renderer2, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a[nxBreadcrumbItem]',
  templateUrl: 'breadcrumb-item.component.html',
  styleUrls: ['breadcrumb-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'nx-breadcrumb-item',
  }
})
export class NxBreadcrumbItemComponent {

  constructor(private _renderer: Renderer2, private _elemRef: ElementRef) { }

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

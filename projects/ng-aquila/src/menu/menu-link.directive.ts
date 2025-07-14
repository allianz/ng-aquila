import { FocusMonitor } from '@angular/cdk/a11y';
import { AfterViewInit, Directive, ElementRef, OnDestroy } from '@angular/core';

/**
 * This is a menu link.
 * It adds styling to a link and is usually used within a [nxMenuItem].
 */
@Directive({
  selector: 'a[nxMenuLink]',
  host: {
    class: 'nx-menu__link',
  },
  standalone: true,
})
export class NxMenuLinkDirective implements OnDestroy, AfterViewInit {
  constructor(
    private readonly _elementRef: ElementRef,
    private readonly _focusMonitor: FocusMonitor,
  ) {}

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
}

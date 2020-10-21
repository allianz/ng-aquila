import { Directive, ElementRef, Input, TemplateRef } from '@angular/core';
import { NxOverlayConfig, NxOverlayRef, NxOverlayService } from '@aposin/ng-aquila/overlay';
import { take } from 'rxjs/operators';

const DEFAULT_CONFIG: NxOverlayConfig = {
  direction: 'bottom-start',
  fallbackOrientation: 'vertical',
  autoFocus: true,
  offset: 8
};

@Directive({
  selector: '[nxNotificationPanelTriggerFor]',
  host: {
    '(click)': 'open()'
  }
})
export class NxNotificationPanelTriggerDirective {

  private _panelTemplate: TemplateRef<any>;
  private _overlayRef: NxOverlayRef<any>;

  @Input('nxNotificationPanelTriggerFor')
  set notificationPanel(value: TemplateRef<any>) {
    this._panelTemplate = value;
  }
  get notificationPanel() {
    return this._panelTemplate;
  }

  constructor(
    private _nxOverlay: NxOverlayService,
    private _element: ElementRef<HTMLElement>) { }

  open() {
    if (this._overlayRef) {
      return;
    }
    this._overlayRef = this._nxOverlay.open(this._panelTemplate, this._element, DEFAULT_CONFIG);
    this._overlayRef.afterClosed().pipe(take(1)).subscribe(() => this.close());
  }

  close() {
    if (this._overlayRef) {
      this._overlayRef.close();
      this._overlayRef = null;
    }
  }
}

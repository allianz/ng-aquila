import { NxOverlayDirection, NxOverlayService, NxOverlayRef, NxOverlayConfig } from '@aposin/ng-aquila/overlay';
import { Component, ViewChild, TemplateRef, ElementRef } from '@angular/core';

/**
* @title Notification Panel
*/
@Component({
  selector: 'overlay-limiting-fallbacks-example',
  templateUrl: './overlay-limiting-fallbacks-example.html',
  styleUrls: ['./overlay-limiting-fallbacks-example.css']
})
export class OverlayLimitingFallbacksExampleComponent {

  fallbacks: NxOverlayDirection[] = ['top', 'bottom'];
  config: NxOverlayConfig = { width: 250, height: 250, fallbackOrientation: 'vertical', direction: 'left'};

  currentOverlay: NxOverlayRef<any>;

  @ViewChild(TemplateRef) template: TemplateRef<any>;

  constructor(public nxOverlay: NxOverlayService) {}

  open(element: ElementRef) {
    if (this.currentOverlay) {
      this.currentOverlay.close();
    }
    this.currentOverlay =
      this.nxOverlay.open(this.template, element, this.config);
  }

}

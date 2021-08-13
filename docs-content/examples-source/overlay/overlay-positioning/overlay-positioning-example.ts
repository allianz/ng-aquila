import { NxOverlayDirection, NxOverlayService, NxOverlayRef } from '@aposin/ng-aquila/overlay';
import { Component, ViewChild, TemplateRef, ElementRef } from '@angular/core';

/**
* @title Notification Panel
*/
@Component({
  selector: 'overlay-positioning-example',
  templateUrl: './overlay-positioning-example.html',
  styleUrls: ['./overlay-positioning-example.css']
})
export class OverlayPositioningExampleComponent {

  currentOverlay!: NxOverlayRef<any>;

  @ViewChild(TemplateRef) template!: TemplateRef<any>;

  constructor(public nxOverlay: NxOverlayService) {}

  open(element: ElementRef, direction: NxOverlayDirection) {
    if (this.currentOverlay) {
      this.currentOverlay.close();
    }
    this.currentOverlay = this.nxOverlay.open(this.template, element, { width: 150, height: 200, direction });
  }

}

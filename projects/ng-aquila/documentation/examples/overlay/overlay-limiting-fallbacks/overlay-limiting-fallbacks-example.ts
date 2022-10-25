import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import {
    NxOverlayConfig,
    NxOverlayDirection,
    NxOverlayRef,
    NxOverlayService,
} from '@aposin/ng-aquila/overlay';

/**
 * @title Notification Panel
 */
@Component({
    selector: 'overlay-limiting-fallbacks-example',
    templateUrl: './overlay-limiting-fallbacks-example.html',
    styleUrls: ['./overlay-limiting-fallbacks-example.css'],
})
export class OverlayLimitingFallbacksExampleComponent {
    fallbacks: NxOverlayDirection[] = ['top', 'bottom'];
    config: NxOverlayConfig = {
        width: 250,
        height: 250,
        fallbackOrientation: 'vertical',
        direction: 'left',
    };

    currentOverlay!: NxOverlayRef<any>;

    @ViewChild(TemplateRef) template!: TemplateRef<any>;

    constructor(readonly nxOverlay: NxOverlayService) {}

    open(element: ElementRef) {
        if (this.currentOverlay) {
            this.currentOverlay.close();
        }
        this.currentOverlay = this.nxOverlay.open(
            this.template,
            element,
            this.config,
        );
    }
}

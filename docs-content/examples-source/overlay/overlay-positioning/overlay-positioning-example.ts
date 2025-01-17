import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { NxButtonComponent } from '@aposin/ng-aquila/button';
import { NxCopytextComponent } from '@aposin/ng-aquila/copytext';
import {
    NxOverlayDirection,
    NxOverlayRef,
    NxOverlayService,
} from '@aposin/ng-aquila/overlay';

/**
 * @title Notification Panel
 */
@Component({
    selector: 'overlay-positioning-example',
    templateUrl: './overlay-positioning-example.html',
    styleUrls: ['./overlay-positioning-example.css'],
    imports: [NxButtonComponent, CdkOverlayOrigin, NxCopytextComponent],
})
export class OverlayPositioningExampleComponent {
    currentOverlay!: NxOverlayRef<any>;

    @ViewChild(TemplateRef) template!: TemplateRef<any>;

    constructor(readonly nxOverlay: NxOverlayService) {}

    open(element: ElementRef, direction: NxOverlayDirection) {
        if (this.currentOverlay) {
            this.currentOverlay.close();
        }
        this.currentOverlay = this.nxOverlay.open(this.template, element, {
            width: 150,
            height: 200,
            direction,
        });
    }
}

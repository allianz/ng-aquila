import { Directive, ElementRef, Input, Optional, Self, TemplateRef } from '@angular/core';
import { NxOverlayConfig, NxOverlayRef, NxOverlayService, NxTriggerButton } from '@aposin/ng-aquila/overlay';
import { take } from 'rxjs/operators';

const DEFAULT_CONFIG: NxOverlayConfig = {
    direction: 'bottom-start',
    fallbackOrientation: 'vertical',
    autoFocus: true,
    offset: 8,
};

@Directive({
    selector: '[nxNotificationPanelTriggerFor]',
    host: {
        '(click)': 'open()',
    },
})
export class NxNotificationPanelTriggerDirective {
    private _panelTemplate!: TemplateRef<any>;
    private _overlayRef!: NxOverlayRef<any> | null;

    @Input('nxNotificationPanelTriggerFor')
    set notificationPanel(value: TemplateRef<any>) {
        this._panelTemplate = value;
    }
    get notificationPanel() {
        return this._panelTemplate;
    }

    constructor(private _nxOverlay: NxOverlayService, private _element: ElementRef<HTMLElement>, @Optional() @Self() private _triggerButton: NxTriggerButton) {}

    open() {
        if (this._overlayRef) {
            return;
        }
        const config = { ...DEFAULT_CONFIG, ...{ triggerButton: this._triggerButton } };
        this._overlayRef = this._nxOverlay.open(this._panelTemplate, this._element, config);
        this._overlayRef
            .afterClosed()
            .pipe(take(1))
            .subscribe(() => this.close());
    }

    close() {
        if (this._overlayRef) {
            this._overlayRef.close();
            this._overlayRef = null;
        }
    }
}

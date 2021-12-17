import { FocusMonitor } from '@angular/cdk/a11y';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';

/**
 * @title Popover Hover Example
 */
@Component({
    selector: 'popover-hover-example',
    templateUrl: './popover-hover-example.html',
    styleUrls: ['./popover-hover-example.css'],
})
export class PopoverHoverExampleComponent implements AfterViewInit, OnDestroy {
    popoverManualOpenFlag = false;

    @ViewChild('hoverTriggerIcon') _hoverTriggerIcon!: ElementRef<HTMLElement>;

    constructor(private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._hoverTriggerIcon);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._hoverTriggerIcon);
    }
}

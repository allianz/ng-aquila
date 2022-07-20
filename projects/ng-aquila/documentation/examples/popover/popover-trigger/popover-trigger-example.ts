import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';

/**
 * @title Popover Trigger Example
 */
@Component({
    selector: 'popover-trigger-example',
    templateUrl: './popover-trigger-example.html',
    styleUrls: ['./popover-trigger-example.css'],
})
export class PopoverTriggerExampleComponent
    implements AfterViewInit, OnDestroy
{
    popoverManualOpenFlag = false;

    @ViewChild('clickTriggerIcon') _clickTriggerIcon!: ElementRef<HTMLElement>;
    @ViewChild('manualTriggerIcon')
    _manualTriggerIcon!: ElementRef<HTMLElement>;

    constructor(private _focusMonitor: FocusMonitor) {}

    ngAfterViewInit() {
        this._focusMonitor.monitor(this._clickTriggerIcon);
        this._focusMonitor.monitor(this._manualTriggerIcon);
    }

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._clickTriggerIcon);
        this._focusMonitor.stopMonitoring(this._manualTriggerIcon);
    }

    handleKeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case SPACE:
            case ENTER:
                this.popoverManualOpenFlag = !this.popoverManualOpenFlag;
                break;
            default:
        }
    }
}

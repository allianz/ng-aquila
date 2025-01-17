import { FocusMonitor } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    Component,
    ElementRef,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { NxIconButtonComponent } from '@aposin/ng-aquila/button';
import { NxIconComponent } from '@aposin/ng-aquila/icon';
import {
    NxPopoverComponent,
    NxPopoverTriggerDirective,
} from '@aposin/ng-aquila/popover';

/**
 * @title Popover Trigger Example
 */
@Component({
    selector: 'popover-trigger-example',
    templateUrl: './popover-trigger-example.html',
    styleUrls: ['./popover-trigger-example.css'],
    imports: [
        NxIconButtonComponent,
        NxPopoverTriggerDirective,
        NxIconComponent,
        NxPopoverComponent,
    ],
})
export class PopoverTriggerExampleComponent
    implements AfterViewInit, OnDestroy
{
    popoverManualOpenFlag = false;

    @ViewChild('clickTriggerIcon')
    _clickTriggerIcon!: ElementRef<HTMLButtonElement>;

    @ViewChild('manualTriggerIcon')
    _manualTriggerIcon!: ElementRef<HTMLButtonElement>;

    constructor(private readonly _focusMonitor: FocusMonitor) {}

    ngAfterViewInit(): void {
        this._focusMonitor.monitor(this._clickTriggerIcon);
        this._focusMonitor.monitor(this._manualTriggerIcon);
    }

    ngOnDestroy(): void {
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

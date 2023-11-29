import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxTabComponent } from './tab';
import { NxTabGroupBase } from './tab-group-base';

/** @docs-private */
@Component({
    selector: 'nx-tab-body',
    templateUrl: 'tab-body.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./tab-body.scss'],
})
export class NxTabBodyComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('outlet', { static: true, read: ViewContainerRef }) _outlet!: ViewContainerRef;

    @Input() tab!: NxTabComponent;

    @Input() set active(value: BooleanInput) {
        this._active = coerceBooleanProperty(value);
    }
    get active(): boolean {
        return this._active;
    }
    private _active = false;

    private readonly _destroyed = new Subject<void>();

    constructor(
        private readonly _tabGroup: NxTabGroupBase,
        private readonly _focusMonitor: FocusMonitor,
        private readonly _elementRef: ElementRef,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    ngOnInit(): void {
        this._tabGroup._appearanceChange.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.detach();
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('active' in changes) {
            const change = changes.active;
            if (change.currentValue) {
                this.attach();
            } else {
                this.detach();
            }
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    attach() {
        this._outlet.insert(this.tab.contentViewRef);
    }

    detach() {
        const index = this._outlet.indexOf(this.tab.contentViewRef);
        if (index !== -1) {
            this._outlet.detach(index);
        }
    }
}

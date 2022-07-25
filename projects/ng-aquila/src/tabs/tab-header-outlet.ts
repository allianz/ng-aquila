import { Component, EmbeddedViewRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NxTabGroupBase } from './tab-group-base';

/** @docs-private */
@Component({
    selector: 'nx-tab-header-outlet',
    template: '<ng-container #outlet></ng-container>',
})
export class NxTabHeaderOutletComponent implements OnInit, OnDestroy {
    @ViewChild('outlet', { static: true, read: ViewContainerRef }) _outlet!: ViewContainerRef;

    @Input() content!: EmbeddedViewRef<any>;

    private readonly _destroyed = new Subject<void>();

    constructor(private readonly _tabGroup: NxTabGroupBase) {}

    ngOnInit(): void {
        this._tabGroup._appearanceChange.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.detach();
        });
        this.attach();
    }

    attach() {
        this._outlet.insert(this.content);
    }

    detach() {
        const index = this._outlet.indexOf(this.content);
        if (index !== -1) {
            this._outlet.detach(index);
        }
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }
}

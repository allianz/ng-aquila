import { Component, EmbeddedViewRef, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { NxTabGroupBase } from './tab-group-base';

/** @docs-private */
@Component({
    selector: 'nx-tab-header-outlet',
    template: '<ng-container #outlet></ng-container>',
})
export class NxTabHeaderOutletComponent implements OnInit, OnDestroy {
    @ViewChild('outlet', { static: true, read: ViewContainerRef }) _outlet!: ViewContainerRef;

    @Input() content!: EmbeddedViewRef<any>;

    constructor(private _tabGroup: NxTabGroupBase) {}

    private _appearanceSubscription!: Subscription;

    ngOnInit() {
        this._appearanceSubscription = this._tabGroup._appearanceChange.subscribe(() => {
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

    ngOnDestroy() {
        this._appearanceSubscription.unsubscribe();
    }
}

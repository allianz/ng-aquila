import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    EmbeddedViewRef,
    Host,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    SimpleChanges,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';

import { NxTabContentDirective } from './tab-content';
import { NxTabGroupBase } from './tab-group-base';
import { NxTabLabelDirective } from './tab-label';

@Component({
    selector: 'nx-tab',
    exportAs: 'nxTab',
    templateUrl: 'tab.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxTabComponent implements OnChanges, OnDestroy, AfterContentInit {
    /** Emits whenever the internal state of the tab changes. */
    readonly _stateChanges = new Subject<void>();

    /**
     * Content for the tab label given by `<ng-template nxTabLabel>`.
     * @docs-private
     */
    @ContentChild(NxTabLabelDirective, { read: TemplateRef, static: true }) set templateLabel(value: TemplateRef<any>) {
        // Only update the templateLabel via query if there is actually
        // a nxTabLabel found. This works around an issue where a user may have
        // manually set `templateLabel` during creation mode, which would then get clobbered
        // by `undefined` when this query resolves.
        if (value) {
            this._templateLabel = value;
        }
    }
    get templateLabel(): TemplateRef<any> {
        return this._templateLabel;
    }

    private _templateLabel!: TemplateRef<any>;

    /** Template inside the NxTab view that contains an `<ng-content>`. */
    @ViewChild(TemplateRef, { static: true }) _implicitContent!: TemplateRef<any>;
    /**
     * Template provided in the tab content that will be used if present, used to enable lazy-loading.
     */
    @ContentChild(NxTabContentDirective, { read: TemplateRef, static: true }) _explicitContent!: TemplateRef<any>;

    /** Sets the label of the tab shown in the tablist. */
    @Input() set label(value: string) {
        if (this._label !== value) {
            this._label = value;
        }
    }
    get label(): string {
        return this._label;
    }
    private _label!: string;

    /** Sets the tab to disabled. */
    @Input() set disabled(value: BooleanInput) {
        const coercedValue = coerceBooleanProperty(value);

        if (this._disabled !== coercedValue) {
            this._disabled = coercedValue;
        }
    }
    get disabled(): boolean {
        return this._tabGroup?.disabled || this._disabled;
    }
    private _disabled = false;

    private _headerViewRef!: EmbeddedViewRef<any>;
    private _contentViewRef!: EmbeddedViewRef<any>;

    /** @docs-private */
    get headerViewRef() {
        return this._headerViewRef;
    }

    /** @docs-private */
    get contentViewRef() {
        // for lazy loading we only create the viewref when it is asked for
        if (!this._contentViewRef) {
            const contentTemplate = this._explicitContent || this._implicitContent;
            this._contentViewRef = contentTemplate.createEmbeddedView({});
        }
        return this._contentViewRef;
    }

    /**
     * Whether the tab is currently active.
     */
    isActive = false;

    constructor(@Inject(NxTabGroupBase) @Optional() @Host() private readonly _tabGroup: NxTabGroupBase | null) {
        if (!this._tabGroup) {
            throw Error(`The nx-tab element has to be wrapped in a nx-tab-group to work.
      Please provide a nx-tab-group element and place your tabs inside it.`);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ({}.hasOwnProperty.call(changes, 'label') || {}.hasOwnProperty.call(changes, 'disabled')) {
            this._stateChanges.next();
        }
    }

    ngAfterContentInit(): void {
        if (this.templateLabel) {
            this._headerViewRef = this.templateLabel.createEmbeddedView({});
        }
    }

    ngOnDestroy(): void {
        this._stateChanges.complete();
        this._contentViewRef.destroy();
        if (this._headerViewRef) {
            this._headerViewRef.destroy();
        }
    }
}

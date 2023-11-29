import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { Observable, Subject, Subscription } from 'rxjs';

import { NxAutocompleteOptionComponent } from './autocomplete-option.component';

/**
 * Autocomplete IDs need to be unique across components, so this counter exists outside of
 * the component definition.
 */
let _uniqueAutocompleteIdCounter = 0;

/** Event object that is emitted when an autocomplete option is selected. */
export class NxAutocompleteSelectedEvent {
    constructor(
        /** Reference to the autocomplete panel that emitted the event. */
        readonly source: NxAutocompleteComponent,
        /** Option that was selected. */
        readonly option: NxAutocompleteOptionComponent,
    ) {}
}

@Component({
    selector: 'nx-autocomplete',
    templateUrl: 'autocomplete.component.html',
    styleUrls: ['autocomplete.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'nxAutocomplete',
    host: {
        class: 'nx-autocomplete',
    },
})
export class NxAutocompleteComponent implements AfterViewInit, OnDestroy {
    /** Manages active item in option list based on key events. */
    _keyManager!: ActiveDescendantKeyManager<NxAutocompleteOptionComponent>;

    /** Whether the autocomplete panel should be visible, depending on option length. */
    showPanel = false;

    /** Whether the autocomplete panel is open. */
    get isOpen(): boolean {
        return this._isOpen && this.showPanel;
    }
    _isOpen = false;

    /** @docs-private */
    @ViewChild(TemplateRef) template!: TemplateRef<any>;

    /**
     * Element for the panel containing the autocomplete options.
     * @docs-private
     */
    @ViewChild('panel') panel!: ElementRef;

    /** Items observable. If given, autocomplete takes care of the options and ng-content is discarderd */
    @Input() set items(val: string[] | Observable<string[]>) {
        this._hasItems = true;
        if (Array.isArray(val)) {
            this._items = val;
        } else if (val instanceof Observable) {
            this._itemsSubscription?.unsubscribe();
            this._itemsSubscription = val.subscribe(itms => {
                this._items = itms;
                this._cdr.markForCheck();
                // and check visibility in next cycle, when options are set
                setTimeout(() => this._setVisibility());
            });
        } else if (val === null) {
            this._items = val;
        } else {
            throw new Error('Invalid argument for autocomplete items. It has to be Array<string> or Observable<Array<string>>');
        }
    }
    get items(): string[] {
        return this._items!; // TODO properly coerce input as empty array
    }
    private _items: string[] | null = null;
    private _itemsSubscription?: Subscription;

    /**
     * Is items observable set.
     * @docs-private
     */
    get hasItems(): boolean {
        return this._hasItems;
    }
    private _hasItems = false;

    /** Event that is emitted whenever an option from the list is selected. */
    @Output() readonly optionSelected = new EventEmitter<NxAutocompleteSelectedEvent>();

    /** Event that is emitted when the autocomplete panel is opened. */
    @Output() readonly opened = new EventEmitter<void>();

    /** Event that is emitted when the autocomplete panel is closed. */
    @Output() readonly closed = new EventEmitter<void>();

    /** Autocomplete options in view - ie from items */
    @ViewChildren(NxAutocompleteOptionComponent)
    private _vOptions!: QueryList<NxAutocompleteOptionComponent>;

    /** Autocomplete options in content - ie user provided */
    @ContentChildren(NxAutocompleteOptionComponent, { descendants: true }) private _cOptions!: QueryList<NxAutocompleteOptionComponent>;

    /** Autocomplete options */
    get options(): QueryList<NxAutocompleteOptionComponent> {
        return this.hasItems ? this._vOptions : this._cOptions;
    }

    /**
     * Takes classes set on the host nx-autocomplete element and applies them to the panel
     * inside the overlay container to allow for easy styling.
     */
    @Input('class') set classList(value: string) {
        if (value?.length) {
            value.split(' ').forEach(className => (this._classList[className.trim()] = true));
            this._elementRef.nativeElement.className = '';
        }
    }
    _classList: { [key: string]: boolean } = {};

    /** Unique ID to be used by autocomplete trigger's "aria-owns" property. */
    id = `nx-autocomplete-${_uniqueAutocompleteIdCounter++}`;

    private readonly _destroyed = new Subject<void>();

    /**
     * Value to string converter function.
     * As an autocomplete option can hold any value, a converter might be needed
     * to get a string representation of the value, which can be stored in the input.
     *
     * Default: `value => value ? value.toString() : null`.
     */
    @Input() valueFormatter: (value: any) => string = (value: any) => (value ? value.toString() : null);

    constructor(
        private readonly _cdr: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        @Optional() private readonly formFieldComponent: NxFormfieldComponent | null,
    ) {}

    ngAfterViewInit(): void {
        this._keyManager = new ActiveDescendantKeyManager<NxAutocompleteOptionComponent>(this.options).withWrap();
        this._setVisibility();
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        this._itemsSubscription?.unsubscribe();
    }

    /**
     * Sets the panel scrollTop. This allows us to manually scroll to display options
     * above or below the fold, as they are not actually being focused when active.
     */
    _setScrollTop(scrollTop: number): void {
        if (this.panel) {
            this.panel.nativeElement.scrollTop = scrollTop;
        }
    }

    /** Returns the panel's scrollTop. */
    _getScrollTop(): number {
        return this.panel ? this.panel.nativeElement.scrollTop : 0;
    }

    /** Panel should hide itself when the option list is empty. */
    _setVisibility() {
        this.showPanel = !!this.options?.length;
        this._classList['nx-autocomplete-visible'] = this.showPanel;
        this._classList['nx-autocomplete-hidden'] = !this.showPanel;
        this._cdr.markForCheck();
    }

    /** Emits the `select` event. */
    _emitSelectEvent(option: NxAutocompleteOptionComponent): void {
        const event = new NxAutocompleteSelectedEvent(this, option);
        this.optionSelected.emit(event);
    }

    get _isInOutlineField(): boolean {
        return this.formFieldComponent !== null && this.formFieldComponent.appearance === 'outline';
    }
}

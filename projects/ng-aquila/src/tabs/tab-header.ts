import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { END, ENTER, HOME, SPACE } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    Optional,
    Output,
    QueryList,
    ViewChild,
} from '@angular/core';
import { NxViewportService } from '@aposin/ng-aquila/utils';

import { NxScrollableTabBar } from './scrollable-tab-bar';
import { NxTabGroupBase } from './tab-group-base';
import { NxTabLabelWrapperDirective } from './tab-label-wrapper';

/** @docs-private */
@Component({
    selector: 'nx-tab-header',
    templateUrl: 'tab-header.html',
    styleUrls: ['./tab-header.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.at-start]': '_isScrolledToStart',
        '[class.scrollable]': 'scrollable',
    },
})
export class NxTabHeaderComponent extends NxScrollableTabBar implements AfterContentInit, AfterViewInit {
    private _keyManager!: FocusKeyManager<NxTabLabelWrapperDirective>;

    @ViewChild('tabsList') scrollableTabsList!: ElementRef<HTMLElement>;

    @ContentChildren('tabButton') tabButtons!: QueryList<HTMLElement>;

    @Input() set selectedIndex(value: number) {
        this._selectedIndex = value;
        if (this._keyManager) {
            this._keyManager.updateActiveItem(value);
        }
        this.scrollToButton(value);
    }
    get selectedIndex(): number {
        return this._selectedIndex;
    }
    private _selectedIndex = 0;

    set focusIndex(value: number) {
        if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) {
            return;
        }
        this._keyManager.setActiveItem(value);
    }
    get focusIndex(): number {
        return this._keyManager ? this._keyManager.activeItemIndex! : 0;
    }

    @Input() set autoselect(value: boolean) {
        this._autoselect = value;
    }
    get autoselect(): boolean {
        return this._autoselect;
    }
    private _autoselect = true;

    @Output() readonly selectFocusedIndex = new EventEmitter<number>();
    @Output() readonly indexFocused = new EventEmitter<number>();

    @ContentChildren(NxTabLabelWrapperDirective) labels!: QueryList<NxTabLabelWrapperDirective>;

    constructor(
        _cdr: ChangeDetectorRef,
        @Optional() _dir: Directionality | null,
        @Optional() readonly _tabGroup: NxTabGroupBase | null,
        _element: ElementRef,
        viewportService: NxViewportService,
    ) {
        super(_cdr, _dir, _element, viewportService);
    }

    ngAfterContentInit(): void {
        super.ngAfterContentInit();
        this._keyManager = new FocusKeyManager<NxTabLabelWrapperDirective>(this.labels).withHorizontalOrientation('ltr').withWrap();
        this._keyManager.updateActiveItem(0);

        this._cdr.markForCheck();
    }

    ngAfterViewInit(): void {
        this.scrollToButton(this.selectedIndex);
    }

    private _isValidIndex(idx: number) {
        if (!this.labels) {
            return true;
        }
        const tab = this.labels.toArray()[idx] || null;
        return !!tab && !tab.disabled;
    }

    scrollToButton(index: number) {
        if (!this.labels || !this.scrollableTabsList) {
            return;
        }
        const container = this.scrollableTabsList.nativeElement;

        const button = this.labels.get(index)?.elementRef.nativeElement;

        if (container && button) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = button.getBoundingClientRect();
            const scrollLeft = buttonRect.left - containerRect.left + container.scrollLeft;
            const centerPosition = scrollLeft - (containerRect.width - buttonRect.width) / 2;

            container.scrollTo({
                left: centerPosition,
                behavior: 'smooth',
            });
        }
    }

    /**
     * Handles keyboard inputs on the labels
     * If autoselect is enabled the tab gets changed immediately
     * If autoselect is disabled only the focus changes but the user still has to select the item by himself.
     */
    handleKeydown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case HOME:
                this._keyManager.setFirstItemActive();
                event.preventDefault();
                break;
            case END:
                this._keyManager.setLastItemActive();
                event.preventDefault();
                break;
            case ENTER:
            case SPACE:
                this.selectFocusedIndex.emit(this._keyManager.activeItemIndex!);
                event.preventDefault();
                break;
            default:
                this._keyManager.onKeydown(event);
        }

        if (this.autoselect) {
            this.selectFocusedIndex.emit(this._keyManager.activeItemIndex!);
        } else if (event.keyCode !== ENTER && event.keyCode !== SPACE) {
            this.indexFocused.emit(this._keyManager.activeItemIndex!);
        }
    }
}

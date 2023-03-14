import { Directionality } from '@angular/cdk/bidi';
import { coerceArray, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    ViewChild,
} from '@angular/core';
import { NxViewportService } from '@aposin/ng-aquila/utils';
import { delay, takeUntil } from 'rxjs/operators';

import { NxComparisonTableCell } from './cell/cell.component';
import { NxComparisonTableViewType } from './comparison-table.models';
import { NxComparisonTableBase } from './comparison-table-base';
import { NxComparisonTableRowDirective } from './comparison-table-row.directive';
import { NxComparisonTableRowGroupDirective } from './comparison-table-row-group.directive';
import { NxComparisonTableFlexRow } from './flex-row/flex-row.component';
import { NxComparisonTablePopularCell } from './popular-cell/popular-cell.component';
import { NxTableContentElement } from './table-content-element.directive';
import { NxToggleSectionDirective } from './toggle-section/toggle-section.directive';
import { NxToggleSectionAnimations } from './toggle-section/toggle-section-animations';

@Component({
    selector: 'nx-comparison-table',
    templateUrl: './comparison-table.component.html',
    styleUrls: ['./comparison-table.component.scss'],
    animations: [NxToggleSectionAnimations.bodyExpansion],
    providers: [{ provide: NxComparisonTableBase, useExisting: NxComparisonTableComponent }],
})
export class NxComparisonTableComponent extends NxComparisonTableBase implements OnInit, AfterViewInit, OnDestroy {
    // Attention: this contains all rows and toggle sections, AND all rows contained in a toggle section!
    /** @docs-private */
    @ContentChildren(NxTableContentElement, { descendants: true }) elements!: QueryList<NxTableContentElement>;

    @Input() set isError(error: boolean) {
        this._isError = error;
    }
    get isError(): boolean {
        return this._isError;
    }
    private _isError!: boolean;

    private readonly _scrollableArea = new CdkScrollable(this._element, this.scrollDispatch, this._ngZone);

    @ViewChild('headerRow') _headerRowElement!: NxComparisonTableFlexRow;
    @ViewChild('desktopContent') _desktopContentDiv!: ElementRef;

    /** The top value for the clip-path of the _desktopContentDiv. */
    _desktopContentClip = 0;

    @ViewChild('stickyMobileCell') _stickyMobileCell!: ElementRef;

    /**
     * The value of the right or left edge of the first column of the mobile table,
     * that describes the threshold for how much clip-path is needed.
     */
    private _mobileStickyEdge?: number;

    /** Sets which info column is selected. */
    @Input() set selectedIndex(value: NumberInput) {
        const newValue = coerceNumberProperty(value);
        if (this._selectedIndex !== newValue) {
            this._selectedIndex = newValue;
            this.selectedIndexChange.emit(this._selectedIndex);
        }
    }
    get selectedIndex(): number {
        return this._selectedIndex!;
    }
    private _selectedIndex?: number;

    /** An event that is is dispatched each time selected index of the table has changed. */
    @Output() readonly selectedIndexChange = new EventEmitter<number>();

    /** Sets which column is hidden. */
    @Input() set hiddenIndexes(value: number[]) {
        const newValue = coerceArray(value);
        if (this._hiddenIndexes !== newValue) {
            this._hiddenIndexes = newValue;
        }
    }
    get hiddenIndexes(): number[] {
        return this._hiddenIndexes;
    }

    /** Sets the layout explicitely. If not specified, a layout will be set based on the viewport. */
    @Input() set view(value: NxComparisonTableViewType | null | undefined) {
        this._view = value;
        this._viewChanges.next();
    }
    get view(): NxComparisonTableViewType | null | undefined {
        return this._view;
    }

    constructor(
        private readonly _element: ElementRef,
        @Optional() private readonly _dir: Directionality | null,
        viewportService: NxViewportService,
        protected readonly _cdr: ChangeDetectorRef,
        private readonly scrollDispatch: ScrollDispatcher,
        private readonly _ngZone: NgZone,
    ) {
        super(viewportService, _cdr);
    }

    /** @docs-private */
    @HostBinding('attr.dir') get dir() {
        return this._dir?.value || 'ltr';
    }

    ngOnInit(): void {
        window.addEventListener('scroll', this._scrollHandler, true);
        this.scrollDispatch.register(this._scrollableArea);
        // set the clipping for the cells once at the beginnig
        setTimeout(() => this._updateCellClipping());
    }

    ngAfterViewInit(): void {
        this._getHeaderRow()
            ?._requestCellClippingUpdate$.pipe(delay(0), takeUntil(this._destroyed))
            .subscribe(() => this._updateCellClipping());
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
        window.removeEventListener('scroll', this._scrollHandler, true);
        this.scrollDispatch.deregister(this._scrollableArea);
    }

    private _scrollHandler = (event: Event): void => {
        this._updateCellClipping();
    };

    _updateCellClipping() {
        if (this.viewType === 'desktop' || this.viewType === 'tablet') {
            const headerRect = this._headerRowElement.elementRef.nativeElement.getBoundingClientRect();
            const contentRect = this._desktopContentDiv.nativeElement.getBoundingClientRect();
            const newContentClip = headerRect.bottom - contentRect.top;
            if (this._desktopContentClip !== newContentClip) {
                this._desktopContentClip = newContentClip;
                this._cdr.markForCheck();
            }
        } else if (this.viewType === 'mobile') {
            if (this._stickyMobileCell) {
                const stickyRect = this._stickyMobileCell.nativeElement.getBoundingClientRect();
                const isRTL = this._dir && this._dir.value === 'rtl';
                this._mobileStickyEdge = isRTL ? stickyRect.left : stickyRect.right;
                this._cdr.markForCheck();

                // clip paths for placeholder cells with borders
                const placeholderCells = this._element.nativeElement.getElementsByClassName('needs-clipping');
                for (const cell of placeholderCells) {
                    const cellRect = cell.getBoundingClientRect();
                    cell.style['clip-path'] = `inset(${this._getMobileClipPathInset(cellRect)})`;
                }
            }
        }
    }

    _getMobileClipPathInset(cellRect: DOMRect): string {
        if (!this._mobileStickyEdge) {
            return '0';
        }

        if (this._dir && this._dir.value === 'rtl') {
            const clip = cellRect.right - this._mobileStickyEdge;
            return clip > 0 ? `0 ${clip}px 0 0` : '0';
        }
        const clip = this._mobileStickyEdge - cellRect.left;
        return clip > 0 ? `0 0 0 ${clip}px` : '0';
    }

    /** Whether the element is a row. */
    _isRow(element: NxTableContentElement): element is NxComparisonTableRowDirective {
        return element instanceof NxComparisonTableRowDirective;
    }

    /** Whether the element is a toggle section. */
    _isToggleSection(element: NxTableContentElement): element is NxToggleSectionDirective {
        return element instanceof NxToggleSectionDirective;
    }

    /** Whether the element is a row group. */
    _isRowGroup(element: NxTableContentElement): element is NxComparisonTableRowGroupDirective {
        return element instanceof NxComparisonTableRowGroupDirective;
    }

    /** Whether row is the first item in a new block of rows or a section. */
    _isFirstInfoOfBlock(rowIndex: number): boolean {
        const elements = this.elements.toArray();

        // if first row after header
        let firstRowAfterHeader = 1;
        while (!this._isRow(elements[firstRowAfterHeader])) {
            firstRowAfterHeader++;
        }
        if (rowIndex === firstRowAfterHeader) {
            return true;
        }

        // if first row: false
        if (rowIndex === 0) {
            return false;
        }

        // if toggle section
        if (this._isToggleSection(elements[rowIndex])) {
            return true;
        }

        // if first row after a section
        if (
            this._isRow(elements[rowIndex]) &&
            elements[rowIndex - 1] instanceof NxComparisonTableRowDirective &&
            (elements[rowIndex - 1] as NxComparisonTableRowDirective)._isPartOfToggleSection()
        ) {
            return true;
        }

        // if last row and the last row is a footer row: true
        if (rowIndex === elements.length - 1 && this._isRow(elements[rowIndex] && (elements[rowIndex] as NxComparisonTableRowDirective).type === 'footer')) {
            return true;
        }

        return false;
    }

    _getHeaderCells(): NxComparisonTableCell[] {
        const row = this.elements.find(element => this._isRow(element) && element.type === 'header');
        return (row as NxComparisonTableRowDirective).cells.toArray();
    }

    _getPopularCell(): NxComparisonTablePopularCell {
        const row = this.elements.find(element => this._isRow(element) && element.type === 'header');
        return (row as NxComparisonTableRowDirective).popularCell;
    }

    _getFooterCells(): NxComparisonTableCell[] {
        const row = this.elements.find(element => this._isRow(element) && element.type === 'footer');

        return row ? (row as NxComparisonTableRowDirective).cells.toArray() : [];
    }

    _containsToggleSection(): boolean {
        return this.elements.filter(element => this._isToggleSection(element)).length > 0;
    }

    _infoColumnCount(): number {
        return this._getHeaderCells().length - this.hiddenIndexes.length;
    }

    _getMobileColumnCount() {
        return this._getFooterCells().length ? this.elements.length - 1 : this.elements.length;
    }

    _isMobileRowDisabled(i: number) {
        return this._getHeaderCells ? this._getHeaderCells()[i].disabledColumn : false;
    }

    _addDisabledColumn(disabledColumn: number): void {
        if (!this._disabledIndexes.includes(disabledColumn)) {
            this._disabledIndexes.push(disabledColumn);
        }
    }

    _removeDisabledColumn(enabledColumn: number): void {
        const indexOfElement = this._disabledIndexes.indexOf(enabledColumn);
        if (indexOfElement !== -1) {
            this._disabledIndexes.splice(indexOfElement, 1);
        }
    }

    _getHeaderRow(): NxComparisonTableRowDirective {
        const headerRow = this.elements.find(element => this._isRow(element) && element.type === 'header');
        return headerRow as NxComparisonTableRowDirective;
    }

    _scrollElementIntoView(element: ElementRef, additionalSpacing = 0): void {
        // check if element starts above the bottom of the header
        // if yes: modify scrollTop position
        const scrolledParent = this._getScrollParent(element.nativeElement);
        if (!scrolledParent) {
            return;
        }
        const headerBottom =
            this._headerRowElement.elementRef.nativeElement.offsetTop + this._headerRowElement.elementRef.nativeElement.getBoundingClientRect().height;
        const elementTop = element.nativeElement.offsetTop;

        if (elementTop < headerBottom) {
            const diff = headerBottom - elementTop;
            scrolledParent.scrollTop = scrolledParent.scrollTop - diff - additionalSpacing;
        }
    }

    // Taken from https://github.com/olahol/scrollparent.js (MIT License)
    private _getScrollParent(node: any) {
        const regex = /(auto|scroll)/;
        const parents: any = (_node: any, ps: any) => {
            if (_node.parentNode === null) {
                return ps;
            }
            return parents(_node.parentNode, ps.concat([_node]));
        };

        const style = (_node: Element, prop: string) => getComputedStyle(_node, null).getPropertyValue(prop);
        const overflow = (_node: any) => style(_node, 'overflow') + style(_node, 'overflow-y') + style(_node, 'overflow-x');
        const scroll = (_node: any) => regex.test(overflow(_node));

        const scrollParent = (_node: { parentNode: any }) => {
            if (!(_node instanceof HTMLElement || _node instanceof SVGElement)) {
                return;
            }
            const ps = parents(_node.parentNode, []);
            for (let i = 0; i < ps.length; i += 1) {
                if (scroll(ps[i])) {
                    return ps[i];
                }
            }
            return document.scrollingElement || document.documentElement;
        };
        return scrollParent(node);
    }
}

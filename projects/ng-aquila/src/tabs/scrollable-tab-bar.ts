import { Direction, Directionality } from '@angular/cdk/bidi';
import { AfterContentInit, ChangeDetectorRef, Directive, ElementRef, OnDestroy, Optional, QueryList } from '@angular/core';
import { NxViewportService } from '@aposin/ng-aquila/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const SPACE_BETWEEN_TABS = 32;
const START_BUTTON_WIDTH = 40;

/** @docs-private */
@Directive()
export abstract class NxScrollableTabBar implements AfterContentInit, OnDestroy {
    tabHeaderContainer!: ElementRef<HTMLElement>;
    scrollableTabsList!: ElementRef<HTMLElement>;
    tabButtons!: QueryList<HTMLElement>;

    _isScrolledToStart = true;
    _isScrolledToEnd = true;

    private readonly _destroyed = new Subject<void>();

    constructor(
        protected readonly _cdr: ChangeDetectorRef,
        @Optional() private readonly _dir: Directionality | null,
        private readonly _element: ElementRef,
        private readonly viewportService: NxViewportService,
    ) {
        this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
            if (this.scrollableTabsList?.nativeElement.scrollLeft !== 0) {
                const absoluteScrollLeft = Math.abs(this.scrollableTabsList?.nativeElement.scrollLeft);
                setTimeout(() => {
                    this.scrollableTabsList.nativeElement.scrollLeft = this.direction === 'ltr' ? absoluteScrollLeft : -absoluteScrollLeft;
                });
            }
        });
        this.viewportService.viewportChange$.pipe(takeUntil(this._destroyed)).subscribe(() => this._updateScrollButtons());
    }

    ngAfterContentInit(): void {
        this.tabButtons.changes.pipe(takeUntil(this._destroyed)).subscribe(() => setTimeout(() => this._updateScrollButtons()));
        setTimeout(() => {
            this.scrollableTabsList.nativeElement.addEventListener('scroll', this._scrollHandler);
            this._updateScrollButtons();
        });
    }

    ngOnDestroy(): void {
        this._destroyed.next();
        this._destroyed.complete();
    }

    _scrollHandler = (event: Event): void => {
        this._updateScrollButtons();
    };

    get direction(): Direction {
        return this._dir?.value || 'ltr';
    }

    get scrollable(): boolean {
        return !this._isScrolledToStart || !this._isScrolledToEnd;
    }

    scrollToStart() {
        const scrollListElement = this.scrollableTabsList.nativeElement;
        const tabsListWidth = scrollListElement.getBoundingClientRect().width;
        const headerScrollPosition = Math.abs(scrollListElement.scrollLeft);
        let lastVisiblePosition = 0;
        let itemToScrollTo!: number;

        for (let i = 0; i < scrollListElement.children.length; i++) {
            const currentChildWidth = scrollListElement.children[i].getBoundingClientRect().width;
            const currentChildStartsBeforeLeftEdge = lastVisiblePosition < headerScrollPosition;
            const currentChildFullyVisible = currentChildStartsBeforeLeftEdge && lastVisiblePosition + currentChildWidth >= headerScrollPosition;
            const currentChildNotFullyVisible = currentChildStartsBeforeLeftEdge && lastVisiblePosition + currentChildWidth < headerScrollPosition;
            const nextChildFullyVisible = lastVisiblePosition + currentChildWidth + SPACE_BETWEEN_TABS >= headerScrollPosition;

            if (currentChildFullyVisible || (currentChildNotFullyVisible && nextChildFullyVisible)) {
                // add width of current child. This is now the point which has to be visible on the right side:
                lastVisiblePosition += currentChildWidth;
                itemToScrollTo = i;
                break;
            } else {
                // current and next child are fully visible: continue
                lastVisiblePosition += currentChildWidth + SPACE_BETWEEN_TABS;
            }
        }

        // now go back to start one by one and find the item most to the start where the lastVisibleItem is still fully visible
        let newPosition = lastVisiblePosition;
        for (let i = itemToScrollTo; i >= 0; i--) {
            const currentChildWidth = scrollListElement.children[i].getBoundingClientRect().width;
            const previousChildWidth = i > 0 ? scrollListElement.children[i - 1].getBoundingClientRect().width : 0;

            const currentChildFitsInWidth = lastVisiblePosition - (newPosition - currentChildWidth) <= tabsListWidth;
            const previousChildFitsInWidth = lastVisiblePosition - (newPosition - currentChildWidth - SPACE_BETWEEN_TABS - previousChildWidth) <= tabsListWidth;

            if (!previousChildWidth) {
                this._scrollTabListTo(0);
                return;
            } else if (currentChildWidth > tabsListWidth || (currentChildFitsInWidth && !previousChildFitsInWidth)) {
                // found item where scrolling should be starting: beginning of currentChild
                newPosition -= currentChildWidth;
                this._scrollTabListTo(this.direction === 'ltr' ? newPosition : -newPosition);
                return;
            }
            // current and previous child fit: continue
            newPosition -= currentChildWidth + SPACE_BETWEEN_TABS;
        }
    }

    scrollToEnd() {
        const scrollListElement = this.scrollableTabsList.nativeElement;
        const tabsListWidth = scrollListElement.getBoundingClientRect().width;
        const headerScrollPosition = Math.abs(scrollListElement.scrollLeft);
        let newPosition = 0;

        for (let i = 0; i < scrollListElement.children.length; i++) {
            const currentChildWidth = scrollListElement.children[i].getBoundingClientRect().width;
            const nextChildWidth = i < scrollListElement.children.length - 1 ? scrollListElement.children[i + 1].getBoundingClientRect().width : 0;
            const currentChildFullyVisible = newPosition + currentChildWidth <= headerScrollPosition + tabsListWidth;
            const nextChildFullyVisible = newPosition + currentChildWidth + SPACE_BETWEEN_TABS + nextChildWidth <= headerScrollPosition + tabsListWidth;
            const currentChildHalfVisible = currentChildWidth - START_BUTTON_WIDTH + SPACE_BETWEEN_TABS + nextChildWidth > tabsListWidth;

            if (currentChildFullyVisible && !nextChildFullyVisible) {
                // current item is the one to scroll to (minus space for scrollStartButton)
                // calculate: if nextChild is too long and does not fit fully in header, then the next child should be the first one visible

                if (Math.abs(headerScrollPosition - Math.round(newPosition + currentChildWidth + SPACE_BETWEEN_TABS)) <= 2) {
                    // it is already scrolled to the nextChild, but nextChild is longer than whole tabsListWidth => scroll to nextNextChild
                    // this is done if the current scrollLeft Position is ~ the start of nextChild
                    newPosition += currentChildWidth + SPACE_BETWEEN_TABS + nextChildWidth + SPACE_BETWEEN_TABS;
                } else if (currentChildHalfVisible) {
                    // if currentItem is half visible, the nextItem would be not fully visible
                    // => new scroll position: show nextItem right after scrollToStart button
                    newPosition += currentChildWidth + SPACE_BETWEEN_TABS;
                } else {
                    // else: currentItem should be half visible, scrollToStart button is covering half of it
                    newPosition += START_BUTTON_WIDTH;
                }
                this._scrollTabListTo(this.direction === 'ltr' ? newPosition : -newPosition);
                return;
            }
            // current and next element are fully visible: add width of current element and continue
            newPosition += currentChildWidth + SPACE_BETWEEN_TABS;
        }
    }

    _updateScrollButtons() {
        const scrollListElement = this.scrollableTabsList.nativeElement;
        if (Math.round(this._element.nativeElement.getBoundingClientRect().width) >= scrollListElement.scrollWidth) {
            // not scrollable
            if (!this._isScrolledToStart || !this._isScrolledToEnd) {
                this._isScrolledToStart = true;
                this._isScrolledToEnd = true;
                this._cdr.markForCheck();
            }
            return;
        }

        // scrollable
        if (this.scrollableTabsList?.nativeElement.scrollLeft === 0 && !this._isScrolledToStart) {
            this._isScrolledToStart = true;
            this._cdr.markForCheck();
        } else if (this.scrollableTabsList?.nativeElement.scrollLeft !== 0 && this._isScrolledToStart) {
            this._isScrolledToStart = false;
            this._cdr.markForCheck();
        }

        const scrollRight = Math.round(Math.abs(scrollListElement.scrollLeft) + scrollListElement.getBoundingClientRect().width);

        if (scrollRight === scrollListElement.scrollWidth && !this._isScrolledToEnd) {
            this._isScrolledToEnd = true;
            this._cdr.markForCheck();
        } else if (scrollRight !== scrollListElement.scrollWidth && this._isScrolledToEnd) {
            this._isScrolledToEnd = false;
            this._cdr.markForCheck();
        }
    }

    private _scrollTabListTo(scrollLeft: number) {
        if (typeof this.scrollableTabsList?.nativeElement.scrollTo === 'function') {
            this.scrollableTabsList?.nativeElement.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        } else {
            // scrollTo() is not defined on IE
            this.scrollableTabsList.nativeElement.scrollLeft = scrollLeft;
        }
    }
}

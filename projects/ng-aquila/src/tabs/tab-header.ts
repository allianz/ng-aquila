import { NxViewportService } from '@allianz/ng-aquila/utils';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
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
  output,
  QueryList,
  ViewChild,
} from '@angular/core';

import { NxTabScrollIndicator } from './scroll-indicator/scroll-indicator';
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
    '[class.at-end]': '_isScrolledToEnd',
    '[class.scrollable]': 'scrollable',
  },
  imports: [NxTabScrollIndicator],
})
export class NxTabHeaderComponent
  extends NxScrollableTabBar
  implements AfterContentInit, AfterViewInit
{
  private _keyManager!: FocusKeyManager<NxTabLabelWrapperDirective>;

  @ViewChild('tabsList') scrollableTabsList!: ElementRef<HTMLElement>;

  @ContentChildren('tabButton', { descendants: true }) tabButtons!: QueryList<HTMLElement>;

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

  /**
   * Moves focus to the tab at the given index, or to the nearest enabled tab
   * if that tab is disabled. Returns whether a tab could be focused.
   */
  focusTab(index: number): boolean {
    if (!this._keyManager || !this.labels?.length) {
      return false;
    }
    const items = this.labels.toArray();
    const clamped = Math.max(0, Math.min(index, items.length - 1));

    for (let offset = 0; offset < items.length; offset++) {
      const forwardIndex = clamped + offset;
      if (items[forwardIndex] && !items[forwardIndex].disabled) {
        this._keyManager.setActiveItem(forwardIndex);
        return true;
      }
      const backwardIndex = clamped - offset;
      if (
        backwardIndex !== forwardIndex &&
        items[backwardIndex] &&
        !items[backwardIndex].disabled
      ) {
        this._keyManager.setActiveItem(backwardIndex);
        return true;
      }
    }

    return false;
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

  /** Emits the index of the focused tab when the user requests to close it via the keyboard. */
  readonly closeFocusedIndex = output<number>();

  @ContentChildren(NxTabLabelWrapperDirective, { descendants: true })
  labels!: QueryList<NxTabLabelWrapperDirective>;

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
    this._keyManager = new FocusKeyManager<NxTabLabelWrapperDirective>(this.labels)
      .withHorizontalOrientation('ltr')
      .withWrap()
      // A disabled tab has to stay reachable by the arrow keys so that assistive technology can
      // announce its state; activating it is prevented instead. Without this the manager's default
      // predicate skips it and the tab is silently unreachable.
      .skipPredicate(() => false);
    // the `selectedIndex` input is set before the key manager exists, so its sync is a
    // no-op on init and the preselected tab has to be picked up here
    this._keyManager.updateActiveItem(this._selectedIndex);

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
    if (!this._platform.isBrowser || !this.labels || !this.scrollableTabsList) {
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
   * Syncs the key manager's bookkeeping to a tab that received DOM focus outside of its own
   * keyboard handling (e.g. native Tab/Shift+Tab into the tablist, or a mouse click). Uses
   * `updateActiveItem` rather than `setActiveItem` so it never re-focuses the element the
   * browser already focused.
   */
  updateFocusedIndex(index: number) {
    if (this._keyManager.activeItemIndex !== index) {
      this._keyManager.updateActiveItem(index);
      this.indexFocused.emit(index);
    }
  }

  /**
   * Handles keyboard inputs on the labels
   * If autoselect is enabled the tab gets changed immediately
   * If autoselect is disabled only the focus changes but the user still has to select the item by himself.
   */
  handleKeydown(event: KeyboardEvent) {
    // ignore Enter and Space keydown events on the close button,
    // since the close button handles those itself.
    if (
      (event.key === 'Enter' || event.key === ' ') &&
      (event.target as HTMLElement).closest('.nx-tab-header__close')
    ) {
      return;
    }

    const previousIndex = this._keyManager.activeItemIndex;

    switch (event.key) {
      case 'Home':
        this._keyManager.setFirstItemActive();
        event.preventDefault();
        break;
      case 'End':
        this._keyManager.setLastItemActive();
        event.preventDefault();
        break;
      case 'Enter':
      case ' ':
        if (!this._isDisabled(this._keyManager.activeItemIndex!)) {
          this.selectFocusedIndex.emit(this._keyManager.activeItemIndex!);
        }
        event.preventDefault();
        break;
      case 'Delete':
      case 'Backspace':
        this.closeFocusedIndex.emit(this._keyManager.activeItemIndex!);
        event.preventDefault();
        return;
      default:
        this._keyManager.onKeydown(event);
    }

    const activeIndex = this._keyManager.activeItemIndex!;

    if (this.autoselect && !this._isDisabled(activeIndex)) {
      this.selectFocusedIndex.emit(activeIndex);
    } else if (activeIndex !== previousIndex) {
      this.indexFocused.emit(activeIndex);
    }
  }

  private _isDisabled(index: number): boolean {
    return !!this.labels?.toArray()[index]?.disabled;
  }
}

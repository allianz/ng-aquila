import { FocusKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { END, ENTER, HOME, SPACE } from '@angular/cdk/keycodes';
import {
  AfterContentInit,
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
    '[class.scrollable]': 'scrollable'
  }
})

export class NxTabHeaderComponent extends NxScrollableTabBar implements AfterContentInit {

  private _keyManager!: FocusKeyManager<NxTabLabelWrapperDirective>;

  @ViewChild('tabsList') scrollableTabsList!: ElementRef<HTMLElement>;
  @ContentChildren('tabButton') tabButtons!: QueryList<HTMLElement>;

  private _selectedIndex: number = 0;

  @Input()
  get selectedIndex(): number {
    return this._selectedIndex;
  }
  set selectedIndex(value: number) {
    this._selectedIndex = value;
    if (this._keyManager) {
      this._keyManager.updateActiveItem(value);
    }
  }

  get focusIndex(): number {
    return this._keyManager ? this._keyManager.activeItemIndex as number : 0;
  }
  set focusIndex(value: number) {
    if (!this._isValidIndex(value) || this.focusIndex === value || !this._keyManager) { return; }
    this._keyManager.setActiveItem(value);
  }

  private _autoselect: boolean = true;

  @Input()
  get autoselect(): boolean {
    return this._autoselect;
  }
  set autoselect(value: boolean) {
    this._autoselect = value;
  }

  @Output() readonly selectFocusedIndex: EventEmitter<number> = new EventEmitter<number>();
  @Output() readonly indexFocused: EventEmitter<number> = new EventEmitter<number>();

  @ContentChildren(NxTabLabelWrapperDirective) labels!: QueryList<NxTabLabelWrapperDirective>;

  constructor(
    public _changeDetectorRef: ChangeDetectorRef,
    _dir: Directionality,
    @Optional() public _tabGroup: NxTabGroupBase,
    _element: ElementRef
  ) {
    super(_changeDetectorRef, _dir, _element);
  }

  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._keyManager = new FocusKeyManager<NxTabLabelWrapperDirective>(this.labels).withHorizontalOrientation('ltr').withWrap();
    this._keyManager.updateActiveItem(0);
    this._changeDetectorRef.markForCheck();
  }
  private _isValidIndex(idx: number) {
    if (!this.labels) { return true; }
    const tab = this.labels.toArray()[idx] || null;
    return !!tab && !tab.disabled;
  }

  /**
   * Handles keyboard inputs on the labels
   * If autoselect is enabled the tab gets changed immediately
   * If autoselect is disabled only the focus changes but the user still has to select the item
   * by himself
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
        this.selectFocusedIndex.emit(this._keyManager.activeItemIndex as number);
        event.preventDefault();
        break;
      default:
        this._keyManager.onKeydown(event);
    }

    if (this.autoselect) {
      this.selectFocusedIndex.emit(this._keyManager.activeItemIndex as number);
    } else if (event.keyCode !== ENTER && event.keyCode !== SPACE) {
      this.indexFocused.emit(this._keyManager.activeItemIndex as number);
    }
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Optional,
  Input,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { NxContextMenuComponent } from './context-menu.component';
import { coerceBooleanProperty, BooleanInput } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';

/**
 * This directive is intended to be used inside an nx-context-menu tag.
 * It exists mostly to set the role attribute, disabled state and styling.
 */
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nxContextMenuItem]',
  exportAs: 'nxContextMenuItem',
  host: {
    class: 'nx-context-menu-item',
    role: 'menuitem',
    '[class.is-highlighted]': '_highlighted',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled || null',
    '(mouseenter)': '_handleMouseEnter()',
    '(click)': '_checkDisabled($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-context-menu-item__content-wrapper" [class.has-submenu]="_triggersSubmenu">
      <ng-content></ng-content>
      <nx-icon *ngIf="_triggersSubmenu"
        class="nx-context-menu-item__expand"
        name="chevron-right-small">
      </nx-icon>
    </div>
    `,
  styleUrls: ['./context-menu-item.component.scss']
})
export class NxContextMenuItemComponent implements OnDestroy {
  private _document: Document;

  /** Stream that emits when the context menu item is hovered. */
  readonly _hovered: Subject<NxContextMenuItemComponent> = new Subject<NxContextMenuItemComponent>();

  /** Whether the context menu item is disabled. */
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._changeDetectorRef.markForCheck();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled: boolean = false;

  /** Whether the context menu item is highlighted. */
  _highlighted: boolean = false;

  /** Whether the context menu item acts as a trigger for a sub-menu. */
  _triggersSubmenu: boolean = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) document: any,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(NxContextMenuComponent)
    @Optional() private _parentMenu: NxContextMenuComponent,
    private _focusMonitor: FocusMonitor
  ) {

    if (_parentMenu && _parentMenu.addItem) {
      _parentMenu.addItem(this);
    }

    this._document = document;
    this._focusMonitor.monitor(this._elementRef);
  }

  /** Focuses this context menu item. */
  focus(): void {
    this._getHostElement().focus();
  }

  ngOnDestroy() {
    if (this._parentMenu && this._parentMenu.removeItem) {
      this._parentMenu.removeItem(this);
    }

    this._hovered.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Used to set the `tabindex`. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  /** Returns the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /** Prevents the default element actions if it is disabled. */
  _checkDisabled(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /** Emits to the hover stream. */
  _handleMouseEnter() {
    this._hovered.next(this);
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    const element: HTMLElement = this._elementRef.nativeElement.childNodes[0] as HTMLElement;
    const textNodeType = this._document ? this._document.TEXT_NODE : 3;
    let output = '';

    if (element.childNodes) {
      const length = element.childNodes.length;

      // Go through all the top-level text nodes and extract their text.
      // We skip anything that's not a text node to prevent the text from
      // being thrown off by something like an icon.
      for (let i = 0; i < length; i++) {
        if (element.childNodes[i].nodeType === textNodeType) {
          output += element.childNodes[i].textContent;
        }
      }
    }

    return output.trim();
  }

  static ngAcceptInputType_disabled: BooleanInput;
}

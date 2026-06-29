import { NxCheckboxComponent } from '@allianz/ng-aquila/checkbox';
import type { AllianzOneOptions } from '@allianz/ng-aquila/config/allianz-one/token';
import { ALLIANZ_ONE } from '@allianz/ng-aquila/config/allianz-one/token';
import { NxIconModule } from '@allianz/ng-aquila/icon';
import { NxRadioComponent } from '@allianz/ng-aquila/radio-button';
import { IdGenerationService } from '@allianz/ng-aquila/utils';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ContentChild,
  ContentChildren,
  Directive,
  DOCUMENT,
  ElementRef,
  forwardRef,
  HostAttributeToken,
  Inject,
  inject,
  Input,
  input,
  OnDestroy,
  Optional,
  QueryList,
  signal,
} from '@angular/core';
import { Subject } from 'rxjs';

import { NxContextMenuComponent } from './context-menu.component';
import { NxContextMenuItemBase, NxContextMenuItemWrapBase } from './context-menu-item-base';

export type NxContextMenuItemSelectable = 'single' | 'multi' | boolean | null;

/** Normalize the `selectable` input to a resolved selection mode. */
function coerceSelectable(
  value: NxContextMenuItemSelectable | '' | undefined,
): NxContextMenuItemSelectable {
  if (value === 'single') {
    return 'single';
  }
  if (value === 'multi') {
    return 'multi';
  }
  if (value === null || value === false || value === undefined) {
    return false;
  }
  // let the consumer project their own icon and reserve indicator space
  return true;
}

/**
 * This directive is intended to be used inside an nx-context-menu tag.
 * It exists mostly to set the role attribute, disabled state and styling.
 */
@Component({
  selector: '[nxContextMenuItem]',
  exportAs: 'nxContextMenuItem',
  host: {
    class: 'nx-context-menu-item',
    tabindex: '0',
    '[attr.role]': '_role()',
    '[class.is-highlighted]': '_highlighted',
    '[attr.disabled]': 'null',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-checked]': "selectable === 'single' || selectable === 'multi' ? selected() : null",
    '(mouseenter)': '_handleMouseEnter()',
    '(click)': '_checkDisabled($event)',
    '[class.is-selectable]': "selectable === true || (selectable === 'single' && !_isAllianzOne())",
    '[class.is-selectable-single]': "selectable === 'single'",
    '[class.is-selectable-multi]': "selectable === 'multi'",
    '[class.is-selected]': 'selected()',
    '[class.is-disabled]': 'disabled',
    '[class.nx-context-menu-item--has-leading-icon]': '_hasLeadingIcon()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="nx-context-menu-item__content-wrapper" [class.has-submenu]="_triggersSubmenu">
      <ng-template #label><ng-content></ng-content></ng-template>
      @if (selectable === 'single') {
        @if (_isAllianzOne()) {
          <nx-radio aria-hidden="true" [name]="_radioItemName" [checked]="selected()">
            <ng-container [ngTemplateOutlet]="label"></ng-container>
          </nx-radio>
        } @else {
          @if (selected()) {
            <nx-icon class="nx-context-menu-item__indicator" name="check"></nx-icon>
          }
          <ng-container [ngTemplateOutlet]="label"></ng-container>
        }
      } @else if (selectable === 'multi') {
        <nx-checkbox aria-hidden="true" [checked]="selected()">
          <ng-container [ngTemplateOutlet]="label"></ng-container>
        </nx-checkbox>
      } @else {
        <ng-container [ngTemplateOutlet]="label"></ng-container>
      }
      @if (_triggersSubmenu) {
        <nx-icon class="nx-context-menu-item__expand" name="chevron-right-small"> </nx-icon>
      }
    </div>
  `,
  styleUrls: ['./context-menu-item.component.scss'],
  imports: [NxIconModule, NxCheckboxComponent, NxRadioComponent, NgTemplateOutlet],
  providers: [
    {
      provide: NxContextMenuItemBase,
      useExisting: forwardRef(() => NxContextMenuItemComponent),
    },
  ],
})
export class NxContextMenuItemComponent
  extends NxContextMenuItemBase
  implements OnDestroy, AfterViewInit
{
  /** Stream that emits when the context menu item is hovered. */
  readonly _hovered = new Subject<NxContextMenuItemComponent>();

  private readonly _allianzOneOptions = inject<AllianzOneOptions | null>(ALLIANZ_ONE, {
    optional: true,
  });
  protected readonly _isAllianzOne = computed(() => this._allianzOneOptions?.enabled?.() ?? false);

  /**
   * Unique name for the radio indicator. Plain `nx-radio` share `name=null` and the
   * radio's app-wide `UniqueSelectionDispatcher` would uncheck radios in other items/groups.
   */
  protected readonly _radioItemName = inject(IdGenerationService).nextId('nx-context-menu-item');

  /**
   * - `'single'` : renders a built-in radio indicator and sets `role="menuitemradio"`.
   * - `'multi'` : renders a built-in checkbox indicator and sets `role="menuitemcheckbox"`.
   * - `true` : legacy passive mode, reserves indicator space for the consumer's own content. Consumers must bind their own role.
   * - `null` / `false` : disables built-in selection.
   */
  @Input() set selectable(value: NxContextMenuItemSelectable | '') {
    this._selectable.set(coerceSelectable(value));
  }
  get selectable(): NxContextMenuItemSelectable {
    return this._selectable();
  }
  protected readonly _selectable = signal<NxContextMenuItemSelectable>(false);

  /** Whether this item is currently selected. Only meaningful when `selectable` is set. */
  readonly selected = input(false, { transform: booleanAttribute });

  /**
   * Role the consumer set statically on the host. Used as the fallback so a consumer-provided
   * role survives in plain mode instead of being overwritten by the `[attr.role]` host binding.
   */
  private readonly _userRole = inject(new HostAttributeToken('role'), { optional: true });

  /** Resolved ARIA role based on the selection mode. */
  protected readonly _role = computed<string>(() => {
    if (this._selectable() === 'single') {
      return 'menuitemradio';
    }
    if (this._selectable() === 'multi') {
      return 'menuitemcheckbox';
    }
    // Legacy passive mode (`true`) honor a consumer-provided role.
    // otherwise fall back to the default `menuitem`.
    return this._userRole ?? 'menuitem';
  });

  /** Whether the context menu item is disabled. */
  @Input() set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get disabled(): boolean {
    return this._disabled;
  }
  private _disabled = false;

  /** Whether the context menu close on select. */
  @Input() set disableCloseOnSelect(value: BooleanInput) {
    this._disableCloseOnSelect = coerceBooleanProperty(value);
    this._cdr.markForCheck();
  }
  get disableCloseOnSelect(): boolean {
    return this._disableCloseOnSelect;
  }
  private _disableCloseOnSelect = false;

  /** Whether the context menu item is highlighted. */
  _highlighted = false;

  /** Whether the context menu item acts as a trigger for a sub-menu. */
  _triggersSubmenu = false;

  protected readonly _hasLeadingIcon = signal(false);

  private _updateHasLeadingIcon(): void {
    const wrapper = this._elementRef.nativeElement.querySelector<HTMLElement>(
      '.nx-context-menu-item__content-wrapper',
    );
    if (!wrapper) {
      this._hasLeadingIcon.set(false);
      return;
    }
    const textNodeType = this._document ? this._document.TEXT_NODE : 3;
    const elementNodeType = this._document ? this._document.ELEMENT_NODE : 1;
    for (const node of Array.from(wrapper.childNodes)) {
      if (node.nodeType === textNodeType && node.textContent?.trim()) {
        this._hasLeadingIcon.set(false);
        return;
      }
      if (node.nodeType === elementNodeType) {
        const el = node as Element;
        this._hasLeadingIcon.set(
          el.tagName.toLowerCase() === 'nx-icon' &&
            !el.classList.contains('nx-context-menu-item__expand'),
        );
        return;
      }
    }
    this._hasLeadingIcon.set(false);
  }

  constructor(
    private readonly _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(DOCUMENT) private readonly _document: Document | null,
    private readonly _cdr: ChangeDetectorRef,
    private readonly _focusMonitor: FocusMonitor,
    @Optional() private readonly _parentMenu: NxContextMenuComponent | null,
  ) {
    super();
    // register a click event listener that can block if this element is disabled
    this._elementRef.nativeElement.addEventListener(
      'click',
      ($event) => {
        this._handleClick($event);
      },
      true,
    );
  }

  /** Focuses this context menu item. */
  focus(origin?: FocusOrigin): void {
    if (origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin);
    } else {
      this._getHostElement().focus();
    }
  }

  ngAfterViewInit(): void {
    this._focusMonitor.monitor(this._elementRef);
    this._updateHasLeadingIcon();
  }

  ngOnDestroy(): void {
    this._hovered.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Returns the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /**
   * Blocks the click event from propagating to the origin component if this is disabled.
   * If not disabled it has no effect
   * @param event The MouseEvent that happened on click
   */
  _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopImmediatePropagation();
    }
  }

  /** Prevents the default element actions if it is disabled. */
  _checkDisabled(event: Event): void {
    if (this.disableCloseOnSelect) {
      event.stopPropagation();
    }

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

  get parentMenu(): NxContextMenuComponent | null {
    return this._parentMenu;
  }
}

@Directive({
  selector: '[nxContextMenuItemCheckbox]',
  host: {
    '[attr.role]': '"menuitemcheckbox"',
    '[attr.aria-checked]': 'checkbox.checked',
    '(keydown)': 'onKeyDown($event)',
  },
  standalone: true,
})
export class NxContextMenuItemCheckboxDirective {
  @ContentChild(NxCheckboxComponent) checkbox!: NxCheckboxComponent;

  onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === ENTER) {
      this.checkbox.toggle();
    }
  }
}

/**
 * This directive is need when [nx-context-menu-item] is not directly under [nx-context-menu].
 * @example
 * <nx-context-menu>
 *      <something else> // blocker
 *        <nx-context-menu-item-wrap> // come to rescue
 *          <nx-context-menu-item/>
 *          <nx-context-menu-item/>
 *        </nx-context-menu-item-wrap>
 *      </something else>
 * </nx-context-menu>
 */
@Component({
  selector: 'nx-context-menu-item-wrap',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content></ng-content> `,
  standalone: true,
  providers: [
    {
      provide: NxContextMenuItemWrapBase,
      useExisting: forwardRef(() => NxContextMenuItemWrapComponent),
    },
  ],
})
export class NxContextMenuItemWrapComponent extends NxContextMenuItemWrapBase {
  @ContentChildren(NxContextMenuItemComponent) _items!: QueryList<NxContextMenuItemComponent>;
}

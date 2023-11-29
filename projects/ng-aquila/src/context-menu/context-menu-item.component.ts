import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { DOCUMENT } from '@angular/common';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This directive is intended to be used inside an nx-context-menu tag.
 * It exists mostly to set the role attribute, disabled state and styling.
 */
@Component({
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
        '(click)': '_checkDisabled($event)',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="nx-context-menu-item__content-wrapper" [class.has-submenu]="_triggersSubmenu">
            <ng-content></ng-content>
            <nx-icon *ngIf="_triggersSubmenu" class="nx-context-menu-item__expand" name="chevron-right-small"> </nx-icon>
        </div>
    `,
    styleUrls: ['./context-menu-item.component.scss'],
})
export class NxContextMenuItemComponent implements OnDestroy {
    /** Stream that emits when the context menu item is hovered. */
    readonly _hovered = new Subject<NxContextMenuItemComponent>();

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

    constructor(
        private readonly _elementRef: ElementRef<HTMLElement>,
        @Optional() @Inject(DOCUMENT) private readonly _document: Document | null,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _focusMonitor: FocusMonitor,
    ) {
        this._focusMonitor.monitor(this._elementRef);
    }

    /** Focuses this context menu item. */
    focus(origin?: FocusOrigin): void {
        if (origin) {
            this._focusMonitor.focusVia(this._getHostElement(), origin);
        } else {
            this._getHostElement().focus();
        }
    }

    ngOnDestroy(): void {
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
})
export class NxContextMenuItemWrapComponent {
    @ContentChildren(NxContextMenuItemComponent) _items!: QueryList<NxContextMenuItemComponent>;
}

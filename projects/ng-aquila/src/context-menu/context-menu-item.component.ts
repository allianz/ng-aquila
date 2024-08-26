import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ENTER } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    Directive,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    Optional,
    QueryList,
} from '@angular/core';
import { NxCheckboxComponent } from '@aposin/ng-aquila/checkbox';
import { NxIconModule } from '@aposin/ng-aquila/icon';
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
        tabindex: '0',
        '[class.is-highlighted]': '_highlighted',
        '[attr.disabled]': 'null',
        '[attr.aria-disabled]': 'disabled.toString()',
        '(mouseenter)': '_handleMouseEnter()',
        '(click)': '_checkDisabled($event)',
        '[class.is-selectable]': '_selectable',
        '[class.is-disabled]': 'disabled',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="nx-context-menu-item__content-wrapper" [class.has-submenu]="_triggersSubmenu">
            <ng-content></ng-content>
            @if (_triggersSubmenu) {
                <nx-icon class="nx-context-menu-item__expand" name="chevron-right-small"> </nx-icon>
            }
        </div>
    `,
    styleUrls: ['./context-menu-item.component.scss'],
    standalone: true,
    imports: [NxIconModule],
})
export class NxContextMenuItemComponent implements OnDestroy, AfterViewInit {
    /** Stream that emits when the context menu item is hovered. */
    readonly _hovered = new Subject<NxContextMenuItemComponent>();

    /** Whether the context menu item is selectable */
    @Input({ transform: booleanAttribute }) set selectable(value) {
        this._selectable = value;
    }
    get selectable(): boolean {
        return this._selectable;
    }
    private _selectable = false;

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
        // register a click event listener that can block if this element is disabled
        this._elementRef.nativeElement.addEventListener(
            'click',
            $event => {
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
})
export class NxContextMenuItemWrapComponent {
    @ContentChildren(NxContextMenuItemComponent) _items!: QueryList<NxContextMenuItemComponent>;
}

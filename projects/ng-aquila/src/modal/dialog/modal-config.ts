import { Direction } from '@angular/cdk/bidi';
import { ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

/** Valid ARIA roles for a modal element. */
export type NxModalRole = 'dialog' | 'alertdialog';

export type NxModalAppearance = 'expert' | 'default';

/** Possible overrides for a modal's position. */
export interface NxDialogPosition {
    /** Override for the modal's top position. */
    top?: string;

    /** Override for the modal's bottom position. */
    bottom?: string;

    /** Override for the modal's left position. */
    left?: string;

    /** Override for the modal's right position. */
    right?: string;
}

/**
 * Configuration for opening a modal  with the NxDialogService.
 */
export class NxModalConfig<D = any> {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the modal. This does not affect where the modal
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;

    /** ID for the modal. If omitted, a unique one will be generated. */
    id?: string;

    /** The ARIA role of the modal element. */
    role?: NxModalRole = 'dialog';

    /**
     * The appearance of the modal.
     *
     * Default: `'default'`.
     */
    appearance?: NxModalAppearance;

    /** Custom class for the overlay pane. */
    panelClass?: string | string[] = '';

    /** Whether the modal has a backdrop. */
    hasBackdrop?: boolean = true;

    /** Custom class for the backdrop. */
    backdropClass?: string = '';

    /** Whether the user can use escape or clicking on the backdrop to close the modal. */
    disableClose?: boolean = false;

    /** Whether the modal is to be shown in fullscreen. When set to true, the width, height, maxWidth and maxHeight are overwritten */
    fullscreen?: boolean = false;

    /** Width of the modal. */
    width?: string = '736px';

    /** Height of the modal. */
    height?: string = '';

    /** Min-width of the modal. If a number is provided, assumes pixel units. */
    minWidth?: number | string;

    /** Min-height of the modal. If a number is provided, assumes pixel units. */
    minHeight?: number | string;

    /** Max-width of the modal. If a number is provided, assumes pixel units. Defaults to '736px'. */
    maxWidth?: number | string = '736px';

    /** Max-height of the modal. If a number is provided, assumes pixel units. Defaults to '65vh'. */
    maxHeight?: number | string;

    /** Position overrides. */
    position?: NxDialogPosition;

    /** Data being injected into the child component. */
    data?: D | null = null;

    /** ID of the element that describes the modal. */
    ariaDescribedBy?: string | null = null;

    /** ID of the element that labels the modal. */
    ariaLabelledBy?: string | null = null;

    /** Aria label to assign to the modal element. */
    ariaLabel?: string | null = null;

    /** Whether the modal should focus the first focusable element on open. */
    autoFocus?: boolean = true;

    /**
     * Whether the modal should restore focus to the
     * previously-focused element, after it's closed.
     */
    restoreFocus?: boolean = true;

    /** Scroll strategy to be used for the modal. */
    scrollStrategy?: ScrollStrategy;

    /**
     * Whether the modal should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    closeOnNavigation?: boolean = true;

    /** Alternate `ComponentFactoryResolver` to use when resolving the associated component. */
    componentFactoryResolver?: ComponentFactoryResolver;

    /**
     * Whether a close button with icon should be displayed in the top right corner of the modal.
     *
     * Default: `false`.
     */
    showCloseIcon?: boolean = false;

    /**
     * Sets the 'aria-label' of the modal close button needed for accessibility.
     *
     * Default: `'Close dialog'`.
     */
    closeIconButtonLabel?: string = 'Close dialog';

    /**
     * Sets locale direction for the modal.
     *
     * Default: `'ltr'`.
     */
    direction?: Direction = 'ltr';

    /** Define custom function to determine whether a modal can be closed  */
    shouldClose?: (modalResult?: any) => boolean = () => true;
}

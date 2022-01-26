import { FlexibleConnectedPositionStrategy, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { NxTriggerButton } from './trigger-button';

/** The ARIA role of the overlay. */
export type NxOverlayRole = string;

export type NxOverlayDirection = NxOverlayVerticalDirection | NxOverlayHorizontalDirection;
export declare type NxOverlayVerticalDirection = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end';
export declare type NxOverlayHorizontalDirection = 'left' | 'right';

export type NxOverlayFallbackOrientation = 'vertical' | 'horizontal' | 'clockwise';

export const VERTICAL_DIRECTIONS: NxOverlayDirection[] = ['top', 'bottom'];
export const HORIZONTAL_DIRECTIONS: NxOverlayDirection[] = ['left', 'right'];
export const CLOCKWISE_DIRECTIONS: NxOverlayDirection[] = ['top', 'right', 'bottom', 'left'];

export const BASE_OFFSET = 0; // TODO should be 16 once we have a "showArrow" option

/**
 * Configuration for opening a overlay  with the NxDialogService.
 */
export class NxOverlayConfig<D = any> {
    /**
     * Where the attached component should live in Angular's *logical* component tree.
     * This affects what is available for injection and the change detection order for the
     * component instantiated inside of the overlay. This does not affect where the overlay
     * content will be rendered.
     */
    viewContainerRef?: ViewContainerRef;

    /** ID for the overlay. If omitted, a unique one will be generated. */
    id?: string;

    /** The ARIA role of the overlay element. */
    role?: NxOverlayRole | null = null;

    /** Custom class for the overlay pane. */
    panelClass?: string | string[] = '';

    /** Whether the overlay has a backdrop. */
    hasBackdrop?: boolean = false;

    /** Custom class for the backdrop. */
    backdropClass?: string = '';

    /** Whether the user can use escape or clicking on the backdrop to close the overlay. */
    closeOnClickOutside?: boolean = true;

    /** Width of the overlay. */
    width?: number | string = '';

    /** Height of the overlay. */
    height?: number | string = '';

    /** Min-width of the overlay. If a number is provided, assumes pixel units. */
    minWidth?: number | string;

    /** Min-height of the overlay. If a number is provided, assumes pixel units. */
    minHeight?: number | string;

    /** Max-width of the overlay. If a number is provided, assumes pixel units. Defaults to 100vw. */
    maxWidth?: number | string = '';

    /** Max-height of the overlay. If a number is provided, assumes pixel units. */
    maxHeight?: number | string;

    /** The distance from the trigger to the overlay in pixels. */
    offset?: number;

    /** Position overrides. */
    direction?: NxOverlayDirection = 'bottom';

    /** The fallbacks that are chosen. */
    fallbackOrientation?: NxOverlayFallbackOrientation = 'clockwise';

    /** ID of the element that describes the overlay. */
    ariaDescribedBy?: string | null = null;

    /** ID of the element that labels the overlay. */
    ariaLabelledBy?: string | null = null;

    /** Aria label to assign to the overlay element. */
    ariaLabel?: string | null = null;

    /** Whether the overlay should focus the first focusable element on open. */
    autoFocus?: boolean = true;

    /**
     * Whether the overlay should restore focus to the
     * previously-focused element, after it's closed.
     */
    restoreFocus?: boolean = true;

    /** Scroll strategy to be used for the overlay. */
    scrollStrategy?: ScrollStrategy;

    /** Scroll strategy to be used for the overlay. */
    positionStrategy?: FlexibleConnectedPositionStrategy;

    /**
     * Whether the overlay should close when the user goes backwards/forwards in history.
     * Note that this usually doesn't include clicking on links (unless the user is using
     * the `HashLocationStrategy`).
     */
    closeOnNavigation?: boolean = true;

    /** Alternate `ComponentFactoryResolver` to use when resolving the associated component. */
    componentFactoryResolver?: ComponentFactoryResolver;

    triggerButton?: NxTriggerButton;
}

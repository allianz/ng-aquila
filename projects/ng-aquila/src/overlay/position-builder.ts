import { Directionality } from '@angular/cdk/bidi';
import {
    ConnectionPositionPair,
    FlexibleConnectedPositionStrategyOrigin,
    HorizontalConnectionPos,
    OriginConnectionPosition,
    Overlay,
    OverlayConnectionPosition,
    VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Injectable, Optional } from '@angular/core';

import { BASE_OFFSET, CLOCKWISE_DIRECTIONS, HORIZONTAL_DIRECTIONS, NxOverlayConfig, NxOverlayDirection, VERTICAL_DIRECTIONS } from './overlay-config';

/**
 * Creates an error to be thrown if the user provided an invalid popover direction.
 * @docs-private
 */
export function getNxOverlayInvalidDirectionError(direction: string) {
    return Error(`Overlay direction "${direction}" is invalid.`);
}

export const OVERLAY_POSITIONS: { [key in NxOverlayDirection]: (isRtl: boolean) => OverlayConnectionPosition } = {
    top(isRtl) {
        return { overlayX: 'center', overlayY: 'bottom' };
    },
    'top-start': function (isRtl) {
        return { overlayX: isRtl ? 'end' : 'start', overlayY: 'bottom' };
    },
    'top-end': function (isRtl) {
        return { overlayX: isRtl ? 'start' : 'end', overlayY: 'bottom' };
    },
    bottom(isRtl) {
        return { overlayX: 'center', overlayY: 'top' };
    },
    'bottom-start': function (isRtl) {
        return { overlayX: isRtl ? 'end' : 'start', overlayY: 'top' };
    },
    'bottom-end': function (isRtl) {
        return { overlayX: isRtl ? 'start' : 'end', overlayY: 'top' };
    },
    left(isRtl) {
        return { overlayX: isRtl ? 'start' : 'end', overlayY: 'center' };
    },
    right(isRtl) {
        return { overlayX: isRtl ? 'end' : 'start', overlayY: 'center' };
    },
};
export const ORIGIN_POSITIONS: { [key in NxOverlayDirection]: (arg0: boolean) => OriginConnectionPosition } = {
    top(isRtl) {
        return { originX: 'center', originY: 'top' };
    },
    'top-start': function (isRtl) {
        return { originX: isRtl ? 'end' : 'start', originY: 'top' };
    },
    'top-end': function (isRtl) {
        return { originX: isRtl ? 'start' : 'end', originY: 'top' };
    },
    bottom(isRtl) {
        return { originX: 'center', originY: 'bottom' };
    },
    'bottom-start': function (isRtl) {
        return { originX: isRtl ? 'end' : 'start', originY: 'bottom' };
    },
    'bottom-end': function (isRtl) {
        return { originX: isRtl ? 'start' : 'end', originY: 'bottom' };
    },
    left(isRtl) {
        return { originX: isRtl ? 'end' : 'start', originY: 'center' };
    },
    right(isRtl) {
        return { originX: isRtl ? 'start' : 'end', originY: 'center' };
    },
};

@Injectable()
export class NxOverlayPositionBuilder {
    constructor(
        private readonly _overlay: Overlay,
        @Optional() private readonly _dir: Directionality | null,
    ) {}

    createPositionStrategy(element: FlexibleConnectedPositionStrategyOrigin, config: NxOverlayConfig) {
        const fallbacks = this._getFallbackPositions(config.direction!, config);
        const origin = this.getOrigin(config.direction);
        const overlay = this.getOverlayPosition(config.direction);
        const offset = this.getOffset(config.direction, config);
        return this._overlay
            .position()
            .flexibleConnectedTo(element)
            .withPush(false)
            .withFlexibleDimensions(true)
            .withLockedPosition()
            .withGrowAfterOpen()
            .withPositions([
                {
                    ...origin,
                    ...overlay,
                    ...offset,
                },
                ...fallbacks,
            ]);
    }

    /**
     * Returns the origin position based on the user's direction preference.
     */
    getOrigin(direction: NxOverlayDirection | undefined): OriginConnectionPosition {
        if (!direction || !(direction in ORIGIN_POSITIONS)) {
            throw getNxOverlayInvalidDirectionError(direction as string);
        }
        return ORIGIN_POSITIONS[direction](this.isRtl);
    }

    /** Returns the overlay position based on the user's direction preference */
    getOverlayPosition(direction: NxOverlayDirection | undefined): OverlayConnectionPosition {
        if (!direction || !(direction in OVERLAY_POSITIONS)) {
            throw getNxOverlayInvalidDirectionError(direction as string);
        }
        return OVERLAY_POSITIONS[direction](this.isRtl);
    }

    /** Returns the overlay offset required by the user's direction preference */
    getOffset(direction: NxOverlayDirection | undefined, config: NxOverlayConfig) {
        if (!direction || !(direction in OVERLAY_POSITIONS)) {
            throw getNxOverlayInvalidDirectionError(direction as string);
        }
        const offset = config.offset || BASE_OFFSET;
        const [genericDirection] = direction.split('-');
        switch (genericDirection) {
            case 'top': {
                return {
                    offsetY: offset * -1,
                };
            }
            case 'bottom': {
                return {
                    offsetY: offset,
                };
            }
            case 'left': {
                return {
                    offsetX: offset * -1,
                };
            }
            case 'right': {
                return {
                    offsetX: offset,
                };
            }
            default: {
                throw getNxOverlayInvalidDirectionError(direction);
            }
        }
    }

    /**
     * Returns an array of fallback positions for popover, following the algoritm:
     * 1) Slightly alternate preferred position if applicable. I.e. for 'top' try 'top-start' and 'top-end' positioning.
     * 2) Try the opposite position, i.e. for 'top' try 'bottom'.
     * 3) Slightly alternate opposite position, i.e. 'bottom-start', 'bottom-end'.
     * 4) All remaining positions from positions list.
     */
    private _getFallbackPositions(direction: NxOverlayDirection, config: NxOverlayConfig): ConnectionPositionPair[] {
        if (!direction) {
            return [];
        }

        // create order of fallbacks like: if top then bottom, left, right
        const fallbackOrder = this._getFallbackOrder(direction, config);
        // add positions like {direction}-start and filter the requested direction
        const resolvedDirections = this._resolveFallbacks(fallbackOrder, config).filter(d => d !== direction);

        const fallbackPositions: ConnectionPositionPair[] = [];

        resolvedDirections.forEach(fallbackDirection => {
            const origin = this.getOrigin(fallbackDirection);
            const overlay = this.getOverlayPosition(fallbackDirection);
            const offset = this.getOffset(fallbackDirection, config);
            fallbackPositions.push({
                ...origin,
                ...overlay,
                ...offset,
            });
        });

        return fallbackPositions;
    }

    /** Takes the defined fallback orders and adjusts it for the requested direction */
    private _getFallbackOrder(direction: NxOverlayDirection, config: NxOverlayConfig) {
        let order: NxOverlayDirection[];
        switch (config.fallbackOrientation) {
            case 'vertical':
                order = VERTICAL_DIRECTIONS;
                break;
            case 'horizontal':
                order = HORIZONTAL_DIRECTIONS;
                break;
            case 'clockwise':
                order = CLOCKWISE_DIRECTIONS;
                break;
            default:
                throw getNxOverlayInvalidDirectionError(config.fallbackOrientation || '');
        }
        // reorder the array to start from the requested position
        const [generalDirection] = this._splitDirection(direction);
        const directionIndex = order.indexOf(generalDirection as NxOverlayDirection);
        return [...order.slice(directionIndex), ...order.slice(0, directionIndex)];
    }

    // We often need the general direction like top or bottom if the requested direction
    // is like bottom-start
    private _splitDirection(direction: NxOverlayDirection) {
        return direction.split('-');
    }

    get isRtl(): boolean {
        return this._dir?.value === 'rtl';
    }

    /** Returns the opposite position, using angular position naming: top, bottom, start, end, center */
    private _getInversePosition(position: string): VerticalConnectionPos | HorizontalConnectionPos {
        const positionPairs: { [k: string]: VerticalConnectionPos | HorizontalConnectionPos } = {
            top: 'bottom',
            bottom: 'top',
            start: 'end',
            end: 'start',
            center: 'center',
        };
        return positionPairs[position];
    }

    /** Resolve the fallback order to all possible direction. For top and bottom we want to add the start and end positions. */
    private _resolveFallbacks(fallbacks: NxOverlayDirection[], config: NxOverlayConfig) {
        if (!config.direction) {
            throw getNxOverlayInvalidDirectionError('');
        }
        const [generalDirection, addition] = this._splitDirection(config.direction);
        return fallbacks.reduce((resolved: NxOverlayDirection[], direction) => {
            if (direction === 'top' || direction === 'bottom') {
                if (addition) {
                    // if we have something like bottom-start we want to do bottom-end first
                    resolved.push(
                        `${direction}-${addition}` as NxOverlayDirection,
                        `${direction}-${this._getInversePosition(addition)}` as NxOverlayDirection,
                        direction,
                    );
                } else {
                    resolved.push(direction, `${direction}-start` as NxOverlayDirection, `${direction}-end` as NxOverlayDirection);
                }
            } else {
                resolved.push(direction);
            }
            return resolved;
        }, []);
    }
}
